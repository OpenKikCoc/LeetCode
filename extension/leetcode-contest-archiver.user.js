// ==UserScript==
// @name         LeetCode Contest Archiver
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  自动归档 LeetCode 比赛信息并生成 README.md
// @author       You
// @match        https://leetcode.cn/contest/*
// @grant        none
// @run-at       document-idle
// @icon         https://raw.githubusercontent.com/OpenKikCoc/cp-wiki/main/logo.png
// ==/UserScript==

(function() {
  'use strict';

  // 检查是否在比赛页面
  if (!window.location.pathname.match(/\/contest\/(weekly|biweekly)-contest-\d+/)) {
    return;
  }

  // 创建归档按钮
  function createArchiveButton() {
    if (document.getElementById('lc-archive-btn')) {
      return; // 按钮已存在
    }

    const btn = document.createElement('button');
    btn.id = 'lc-archive-btn';
    btn.textContent = '📦 归档比赛';
    btn.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 10000;
      padding: 10px 20px;
      background: #ffa116;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
    `;

    // 添加悬停效果
    btn.addEventListener('mouseenter', () => {
      btn.style.background = '#ff8c00';
      btn.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = '#ffa116';
      btn.style.transform = 'scale(1)';
    });

    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = '⏳ 归档中...';
      btn.style.cursor = 'not-allowed';
      
      try {
        await archiveContest();
        btn.textContent = '✅ 归档完成';
        btn.style.background = '#28a745';
        setTimeout(() => {
          btn.textContent = '📦 归档比赛';
          btn.style.background = '#ffa116';
          btn.disabled = false;
          btn.style.cursor = 'pointer';
        }, 2000);
      } catch (error) {
        console.error('归档失败:', error);
        btn.textContent = '❌ 归档失败';
        btn.style.background = '#dc3545';
        alert('归档失败: ' + error.message);
        setTimeout(() => {
          btn.textContent = '📦 归档比赛';
          btn.style.background = '#ffa116';
          btn.disabled = false;
          btn.style.cursor = 'pointer';
        }, 3000);
      }
    });

    document.body.appendChild(btn);
  }

  // 归档比赛主函数
  async function archiveContest() {
    const contestSlug = window.location.pathname.match(/contest\/([^/]+)/)?.[1];
    if (!contestSlug) {
      throw new Error('无法识别比赛页面');
    }

    // 1. 获取比赛基本信息
    const contestInfo = await getContestInfo(contestSlug);
    
    // 2. 获取所有题目信息
    const questions = await getQuestions(contestSlug);
    
    // 3. 获取每道题的 AC 代码
    console.log(`开始获取 ${questions.length} 道题的代码...`);
    const questionsWithCode = [];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      console.log(`[${i + 1}/${questions.length}] 正在获取: ${q.title}`);
      const code = await getACCode(q.titleSlug);
      questionsWithCode.push({ ...q, code });
    }

    // 4. 生成 README.md
    const readme = generateReadme(contestInfo, questionsWithCode, window.location.href);
    
    // 5. 生成文件夹名（格式：YYYY-MM-DD_weekly-XXX 或 YYYY-MM-DD_biweekly-XXX）
    const fileName = `${contestInfo.date}_${contestSlug.replace('-contest', '')}`;
    
    // 6. 下载文件（文件名包含完整路径信息）
    downloadFile(readme, `${fileName}.md`);
  }

  // 获取比赛信息
  async function getContestInfo(slug) {
    const query = `
      query($s: String!) {
        contest(titleSlug: $s) {
          title
          startTime
        }
      }
    `;
    
    const data = await graphqlRequest(query, { s: slug });
    const contest = data?.contest;
    
    if (!contest) {
      throw new Error('无法获取比赛信息');
    }

    const date = new Date(contest.startTime * 1000);
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

    return {
      title: contest.title,
      date: dateStr,
      slug: slug
    };
  }

  // 获取题目列表
  async function getQuestions(slug) {
    const query = `
      query($s: String!) {
        contest(titleSlug: $s) {
          questions {
            title
            titleSlug
          }
        }
      }
    `;
    
    const data = await graphqlRequest(query, { s: slug });
    const questions = data?.contest?.questions || [];
    
    // 为每道题获取题目编号
    const questionsWithId = await Promise.all(
      questions.map(async (q) => {
        const idQuery = `
          query($s: String!) {
            question(titleSlug: $s) {
              questionFrontendId
            }
          }
        `;
        const idData = await graphqlRequest(idQuery, { s: q.titleSlug });
        return {
          ...q,
          questionFrontendId: idData?.question?.questionFrontendId || '?'
        };
      })
    );
    
    return questionsWithId;
  }

  // 获取 AC 代码
  async function getACCode(questionSlug) {
    // 1. 获取提交列表
    const submissionsQuery = `
      query($s: String!, $o: Int!, $l: Int!) {
        submissionList(questionSlug: $s, offset: $o, limit: $l) {
          submissions {
            id
            status
            lang
          }
        }
      }
    `;
    
    const subsData = await graphqlRequest(submissionsQuery, {
      s: questionSlug,
      o: 0,
      l: 10
    });
    
    const submissions = subsData?.submissionList?.submissions || [];
    // 优先选择 C++ 的 AC 提交
    let acSubmission = submissions.find(s => 
      (s.status === 'Accepted' || s.status === 'AC' || s.status === 10) && 
      (s.lang === 'cpp' || s.lang === 'c++' || s.lang === 'cpp17')
    );
    
    // 如果没有 C++，选择任意 AC 提交
    if (!acSubmission) {
      acSubmission = submissions.find(s => 
        s.status === 'Accepted' || s.status === 'AC' || s.status === 10
      );
    }
    
    if (!acSubmission) {
      return null;
    }

    // 2. 获取代码详情
    const detailQuery = `
      query($id: ID!) {
        submissionDetail(submissionId: $id) {
          code
        }
      }
    `;
    
    const detailData = await graphqlRequest(detailQuery, { id: acSubmission.id });
    return detailData?.submissionDetail?.code || null;
  }

  // GraphQL 请求
  async function graphqlRequest(query, variables) {
    const csrfToken = getCookie('csrftoken');
    
    const response = await fetch('https://leetcode.cn/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
        'Referer': window.location.href
      },
      credentials: 'include',
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      throw new Error(`GraphQL 请求失败: ${response.status}`);
    }

    const result = await response.json();
    if (result.errors) {
      throw new Error('GraphQL 错误: ' + result.errors.map(e => e.message).join(', '));
    }

    return result.data;
  }

  // 获取 Cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  }

  // 生成 README.md
  function generateReadme(contestInfo, questions, url) {
    const lines = [
      `# ${contestInfo.title}`,
      '',
      `链接: ${url}`,
      '',
      '---',
      ''
    ];

    for (const q of questions) {
      const link = `https://leetcode.cn/problems/${q.titleSlug}/`;
      const id = q.questionFrontendId || '?';
      lines.push(`### [${id}. ${q.title}](${link})`);
      lines.push('');
      lines.push('```c++');
      lines.push(q.code || '// 未找到 AC 代码');
      lines.push('```');
      lines.push('');
    }

    return lines.join('\n');
  }

  // 下载文件
  function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // 将路径转换为文件名：Contest/2024-12-21_weekly-481/README.md -> Contest_2024-12-21_weekly-481_README.md
    // 这样下载的文件名包含完整的文件夹路径信息
    const downloadName = filename.replace(/\//g, '_');
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // 页面加载完成后创建按钮
  function init() {
    // 等待页面完全加载
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createArchiveButton);
    } else {
      // 延迟一点确保页面元素已渲染
      setTimeout(createArchiveButton, 500);
    }
  }

  init();
})();

