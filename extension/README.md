# LeetCode Contest Archiver - 油猴脚本

## 简介

这是一个油猴（Tampermonkey）脚本，可以在 LeetCode 比赛页面自动归档比赛信息并生成 README.md 文件。

## 功能

- ✅ 在真实的浏览器环境中运行，不会被识别为爬虫
- ✅ 自动提取比赛信息和题目
- ✅ 获取已 AC 的代码（优先选择 C++）
- ✅ 生成 README.md 并自动下载

## 安装步骤

### 1. 安装 Tampermonkey

#### Chrome/Edge
1. 访问 [Chrome 网上应用店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. 点击"添加至 Chrome"
3. 确认安装

#### Firefox
1. 访问 [Firefox 附加组件](https://addons.mozilla.org/firefox/addon/tampermonkey/)
2. 点击"添加到 Firefox"
3. 确认安装

#### Safari
1. 访问 [Safari 扩展](https://apps.apple.com/app/tampermonkey/id1482490089)
2. 在 App Store 中安装

### 2. 安装脚本

1. 打开 Tampermonkey 管理面板
   - Chrome/Edge: 点击浏览器工具栏的 Tampermonkey 图标 → "管理面板"
   - Firefox: 点击浏览器工具栏的 Tampermonkey 图标 → "管理面板"
   - Safari: 点击菜单栏的 Tampermonkey → "管理面板"

2. 点击"添加新脚本"

3. 删除默认代码，复制粘贴 `leetcode-contest-archiver.user.js` 文件的全部内容

4. 按 `Ctrl+S` (Windows) 或 `Cmd+S` (Mac) 保存

5. 关闭编辑器，脚本已自动启用

## 使用方法

1. **登录 LeetCode.cn**
   - 在浏览器中正常登录你的账户

2. **打开比赛页面**
   - 访问任意比赛页面，例如：`https://leetcode.cn/contest/weekly-contest-481/`

3. **点击归档按钮**
   - 页面右上角会出现"📦 归档比赛"按钮
   - 点击按钮开始归档

4. **等待完成**
   - 按钮会显示"⏳ 归档中..."
   - 控制台会显示进度信息
   - 完成后会自动下载 `README.md` 文件

5. **保存文件**
   - 将下载的 `README.md` 文件移动到对应的比赛目录
   - 例如：`Contest/2024-12-21_weekly-481/README.md`

## 注意事项

- 需要先登录 LeetCode.cn 账户
- 只能获取你已经 AC 的题目代码
- 如果没有 AC 的题目，代码部分会显示 `// 未找到 AC 代码`
- 下载的文件需要手动移动到正确的目录
- 如果遇到问题，可以打开浏览器控制台（F12）查看错误信息

## 更新脚本

1. 打开 Tampermonkey 管理面板
2. 找到 "LeetCode Contest Archiver" 脚本
3. 点击"编辑"
4. 替换为新版本的代码
5. 保存即可

## 故障排除

### 按钮没有出现
- 确认是否在比赛页面（URL 包含 `/contest/weekly-contest-` 或 `/contest/biweekly-contest-`）
- 检查 Tampermonkey 是否已启用脚本
- 刷新页面重试

### 归档失败
- 确认已登录 LeetCode.cn
- 打开浏览器控制台（F12）查看错误信息
- 检查网络连接是否正常

### 无法获取代码
- 确认该题目你已经 AC
- 检查是否有提交记录
- 某些题目可能需要重新提交一次

## 技术细节

- 使用 GraphQL API 获取数据
- 自动处理 CSRF Token
- 优先选择 C++ 代码，如果没有则选择任意 AC 代码
- 支持周赛和双周赛
