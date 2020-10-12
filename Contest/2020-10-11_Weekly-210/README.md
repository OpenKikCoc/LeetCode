## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-210/)


### [1614. 括号的最大嵌套深度](https://leetcode-cn.com/problems/maximum-nesting-depth-of-the-parentheses/)

略

```c++
    int maxDepth(string s) {
        int res = 0, cnt = 0;
        for(auto & c : s) {
            if(c == '(') ++cnt;
            else if(c == ')') --cnt;
            res = max(res, cnt);
        }
        return res;
    }
```


### [1615. 最大网络秩](https://leetcode-cn.com/problems/maximal-network-rank/)

统计即可

```c++
    int maximalNetworkRank(int n, vector<vector<int>>& roads) {
        // 每一对 统计所有边数量
        vector<vector<int>> es(n);
        vector<vector<bool>> has(n, vector<bool>(n));
        for(auto& r : roads) {
            int u = r[0], v = r[1];
            has[u][v] = has[v][u] = true;
            es[u].push_back(v); es[v].push_back(u);
        }
        int res = 0;
        for(int i = 0; i < n; ++i)
            for(int j = 0; j < n; ++j) if(j != i)
                res = max(res, int(es[i].size() + es[j].size()) - has[i][j]);
        return res;
    }
```

### [1616. 分割两个字符串得到回文串](https://leetcode-cn.com/problems/split-two-strings-to-make-palindrome/)

翻转 b 随后从前从后校验，如果遇到不相等且未过半则检查剩余未检查部分是否回文，是则返回 true 。

```c++
    bool checkP(string& s, int l, int r) {
        while(l < r) {if(s[l] != s[r]) return false; ++l, --r;}
        return true;
    }
    bool checkPalindromeFormation(string a, string b) {
        int n = a.size();
        if(n <= 1) return true;
        if(checkP(a, 0, n-1) || checkP(b, 0, n-1)) return true;
        reverse(b.begin(), b.end());
        int i = 0;
        for(i = 0; i < n/2; ++i) {
            if(a[i] != b[i]) break;
        }
        if(i <= n/2) {
            // 从 i 到 n-i 应该是个回文子串
            int l = i, r = n-1-l;
            if(checkP(a, l, r)) return true;
            if(checkP(b, l, r)) return true;
        } else return true;
        for(i = n-1; i > n/2; --i) {
            if(a[i] != b[i]) break;
        }
        if(i >= n/2) {
            int l = n-i-1, r = i;
            if(checkP(a, l, r)) return true;
            if(checkP(b, l, r)) return true;
        } else return true;
        return false;
    }
```

赛榜更优雅的写法（本质也是发现不同的校验中间部分是否回文）：

```c++
    bool pa(const string&a, int l, int r) {
        for (int i = l, j = r; i < j; ++i, --j) {
            if (a[i] != a[j]) {
                return false;
            }
        }
        return true;
    }
    
    bool check(const string& a, const string& b) {
        int n = a.size();
        for (int i = 0, j = n - 1; i < j; ++i, --j) {
            if (a[i] != b[j]) {
                return pa(a, i, j) || pa(b, i, j);
            }
        }
        return true;
    }
    
    bool checkPalindromeFormation(string a, string b) {
        return check(a, b) || check(b, a);
    }
```

### [1617. 统计子树中城市之间最大距离](https://leetcode-cn.com/problems/count-subtrees-with-max-distance-between-cities/) [TAG]

显然需要暴力遍历所有状态，对每个状态检查是否合法：

**子集所使用的边数 = 子集点数 - 1**

随后计算当前状态下的城市间最大距离：

1. 树 dp

2. floyd 预处理

注意写法

```c++
    const int inf = 0x3f3f3f3f;
    vector<int> countSubgraphsForEachDiameter(int n, vector<vector<int>>& edges) {
        // 预处理所有点的距离
        vector<vector<int>> dis(n+1, vector<int>(n+1, inf));
        for(int i = 0; i <= n; ++i) dis[i][i] = 0;
        for(auto & e : edges) dis[e[0]][e[1]] = dis[e[1]][e[0]] = 1;
        for(int k = 1; k <= n; ++k)
            for(int i = 1; i <= n; ++i)
                for(int j = 1; j <= n; ++j)
                    dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
        // 状压dp
        vector<int> res(n-1, 0);
        for(int i = 0; i < (1 << n); ++i) {
            vector<int> now;
            vector<bool> vis(n+1, 0);
            int cnt = 0;
            for(int j = 0; j < n; ++j) if(i & (1 << j)) {
                now.push_back(j+1);
                vis[j+1] = 1;
                ++cnt;
            }
            // 计算用的边数 为了判断子集是否合法（是否是连通的子树）
            int ss = 0;
            for(auto & e : edges) if(vis[e[0]] && vis[e[1]]) ++ss;
            if(ss != cnt-1) continue;
            // 计算该合法子树任意两点间距离最大值
            int cur = 0;
            for(int j = 0; j < now.size(); ++j)
                for(int k = j + 1; k < now.size(); ++k)
                    cur = max(cur, dis[now[j]][now[k]]);
            if(cur > 0 && cur < n) ++res[cur-1];
        }
        return res;
    }
```
