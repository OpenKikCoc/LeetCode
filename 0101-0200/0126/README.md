#  [126. 单词接龙 II](https://leetcode-cn.com/problems/word-ladder-ii/)

## 题意



## 题解

```c++
class Solution {
public:
    vector<vector<string>> ans;
    vector<string> path;
    unordered_set<string> S;
    unordered_map<string, int> dist;

    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        for (auto& word: wordList) S.insert(word);
        queue<string> q;
        q.push(beginWord);
        dist[beginWord] = 0;
        while (q.size()) {
            auto t = q.front();
            q.pop();
            string r = t;
            for (int i = 0; i < t.size(); i ++ ) {
                t = r;
                for (char j = 'a'; j <= 'z'; j ++ )
                    if (j != r[i]) {
                        t[i] = j;
                        if (S.count(t) && dist.count(t) == 0) {
                            dist[t] = dist[r] + 1;
                            if (t == endWord) break;
                            q.push(t);
                        }
                    }
            }
        }

        if (dist.count(endWord)) {
            path.push_back(beginWord);
            dfs(beginWord, endWord);
        }

        return ans;
    }

    void dfs(string st, string ed) {
        if (st == ed) {
            ans.push_back(path);
            return;
        }

        string r = st;
        for (int i = 0; i < st.size(); i ++ ) {
            st = r;
            for (char j = 'a'; j <= 'z'; j ++ )
                if (j != r[i]) {
                    st[i] = j;
                    if (S.count(st) && dist[r] + 1 == dist[st]) {
                        path.push_back(st);
                        dfs(st, ed);
                        path.pop_back();
                    }
                }
        }
    }
};
```

```c++
class Solution {
public:
    // 1. 双端bfs
    vector<vector<string>> res;
    unordered_map<string, vector<string>> hash;
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dirc(wordList.begin(), wordList.end());
        if (dirc.find(endWord) == dirc.end()) return res;
        unordered_set<string> beginw{beginWord};
        unordered_set<string> endw{endWord};
        // 第一个是否找到最短序列标志 第二个是否反转标志
        bool f1 = false, f2 = false;
        while(!beginw.empty()) {
            unordered_set<string> next;
            for(auto str : beginw) dirc.erase(str);
            for(auto str : beginw) {
                for(int i = 0; i < str.size(); ++i) {
                    string s = str;
                    for(char j = 'a'; j <= 'z'; ++j) {
                        s[i] = j;
                        if (!dirc.count(s)) continue;
                        // 两个set相遇 f1 true
                        if (endw.count(s)) f1 = true;
                        else next.insert(s);
                        //反转，始终保证hash里key是原string，
                        // value是被替换后的string 
                        // (保证之后树dfs遍历的时候是从beginWord到endWord的顺序)
                        f2 ? hash[s].push_back(str) : hash[str].push_back(s);
                    }
                }
            }
            if(f1) break;
            beginw = next;
            if(beginw.size() > endw.size()) {
                swap(beginw, endw);
                f2 = !f2;   // 反转
            }
        }
        vector<string> ans = {beginWord};
        dfs(ans, beginWord, endWord);
        return res;
    }
    void dfs(vector<string>& ans, string& begin, string& end) {
        if(begin == end) {
            res.emplace_back(ans);
            return;
        }
        if(!hash.count(begin)) return;
        for(auto str : hash[begin]) {
            ans.emplace_back(str);
            dfs(ans, str, end);
            ans.pop_back();
        }
    }
    // 2.预处理 + bfs找最短路 + dfs获取方案
    int n;
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        wordList.push_back(beginWord);
        n = wordList.size();
        vector<vector<int>> g(n);
        int endi = -1, u, v;
        queue<int> q;
        for(int i = 0; i < n; ++i) {
            if (wordList[i] == endWord) endi = i;
            for(int j = i + 1; j < n; ++j) {
                if (canTrans(i, j, wordList)) {
                    g[i].push_back(j);
                    g[j].push_back(i);
                }
            }
        }
        if(endi == -1) return {};

        // 层级编号 n-1对应beginWord
        vector<int> dfn(n, -1);
        q.push(n-1);
        dfn[n-1] = 0;
        while(!q.empty()) {
            u = q.front();
            q.pop();
            int len = g[u].size();
            for(int i = 0; i < len; ++i) {
                v = g[u][i];
                if(dfn[v] == -1) {
                    dfn[v] = dfn[u] + 1;
                    q.push(v);
                }
            }
        }
        if(dfn[endi] == -1) return {};
        // 回溯路径
        vector<string> path{endWord};
        vector<vector<string>> paths;
        dfs(g, dfn, wordList, endi, path, paths);
        return paths;
    }
    bool canTrans(int a, int b, vector<string>& ws) {
        string s1 = ws[a], s2 = ws[b];
        int len = s1.size(), cnt = 0;
        for(int i = 0; i < len; ++i) {
            if (s1[i] != s2[i]) ++cnt;
            if (cnt > 1) return false;
        }
        return true;
    }
    void dfs(vector<vector<int>>& g, vector<int>& dfn, vector<string>& wordList, int i, vector<string>& path, vector<vector<string> >& paths) {
        if(dfn[i] == 0) {
            vector<string> v(path);
            reverse(v.begin(), v.end());
            paths.push_back(v);
            return;
        }
        int v, len = g[i].size();
        for(int j = 0; j < len; ++j) {
            v = g[i][j];
            if(dfn[v] == dfn[i] - 1) {
                path.push_back(wordList[v]);
                dfs(g, dfn, wordList, v, path, paths);
                path.pop_back();
            }
        }
    }
*/
};
```



```python3

```

