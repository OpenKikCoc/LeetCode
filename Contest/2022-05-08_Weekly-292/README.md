## [比赛链接](https://leetcode.cn/contest/weekly-contest-292/)


### [2264. 字符串中最大的 3 位相同数字](https://leetcode.cn/problems/largest-3-same-digit-number-in-string/)

略

```c++
class Solution {
public:
    bool check(string sa, string sb) {
        return sa < sb;
    }
    
    string largestGoodInteger(string num) {
        string res;
        int n = num.size();
        for (int i = 0; i + 3 <= n; ++ i ) {
            string t = num.substr(i, 3);
            // cout << " i = " << i << ' ' << t << endl;
            if (t[0] != t[1] || t[0] != t[2] || t[1] != t[2])
                continue;
            if (res.empty() || check(res, t))
                res = t;
        }
        return res;
    }
};
```

### [2265. 统计值等于子树平均值的节点数](https://leetcode.cn/problems/count-nodes-equal-to-average-of-subtree/)

略

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    using PII = pair<int, int>;
    int res;
    
    PII dfs(TreeNode * u) {
        if (!u)
            return {0, 0};
        auto [lv, lc] = dfs(u->left);
        auto [rv, rc] = dfs(u->right);
        int v = lv + rv + u->val;
        int c = lc + rc + 1;
        if (v / c == u->val) {
            // cout << " u->val = " << u->val << endl;
            res ++ ;
        }
        return {v, c};
    }
    
    int averageOfSubtree(TreeNode* root) {
        res = 0;
        dfs(root);
        return res;
    }
};
```

### [2266. 统计打字方案数](https://leetcode.cn/problems/count-number-of-texts/)

略

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10, MOD = 1e9 + 7;
    
    int c[10] = {0, 0, 3, 3, 3, 3, 3, 4, 3, 4};
    
    LL f3[N], f4[N];
    
    void init() {
        {
            memset(f3, 0, sizeof f3);
            f3[0] = 1;
            for (int i = 1; i < N; ++ i )
                for (int j = 1; j <= 3; ++ j )
                    if (i - j >= 0)
                        f3[i] = (f3[i] + f3[i - j]) % MOD;
        }
        {
            memset(f4, 0, sizeof f4);
            f4[0] = 1;
            for (int i = 1; i < N; ++ i )
                for (int j = 1; j <= 4; ++ j )
                    if (i - j >= 0)
                        f4[i] = (f4[i] + f4[i - j]) % MOD;
        }
    }
    
    LL get(int w, int d) {
        if (d == 3)
            return f3[w];
        return f4[w];
    }
    
    int countTexts(string s) {
        init();
        int n = s.size();
        LL res = 1;
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            while (j < n && s[j] == s[i])
                j ++ ;
            int w = j - i;
            {
                LL t = get(w, c[s[i] - '0']);
                res = (res * t) % MOD;
            }
            i = j - 1;
        }
        return res;
    }
};
```

### [2267. 检查是否有合法括号字符串路径](https://leetcode.cn/problems/check-if-there-is-a-valid-parentheses-string-path/) [TAG]

理清思路，显然不需要维护区间，只需要关注是否合法

有一个维度是左括号比右括号多多少个

```c++
class Solution {
public:
    const static int N = 110, K = 210, INF = 1e9;
    vector<vector<char>> g;
    int n, m;
    
    bool f[N][N][K];    // 到 [i, j] 的位置，此时左括号比右括号多 k 的可能
    
    bool hasValidPath(vector<vector<char>>& grid) {
        this->g = grid, this->n = g.size(), this->m = g[0].size();
        if ((n + m - 1) & 1)
            return false;
        memset(f, 0, sizeof f);
        f[0][1][0] = f[1][0][0] = true;
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                int t = (g[i - 1][j - 1] == '(' ? 1 : -1);
                for (int k = 0; k <= n + m; ++ k )
                    if (k - t >= 0 && k - t <= n + m) {
                        f[i][j][k] |= f[i - 1][j][k - t];
                        f[i][j][k] |= f[i][j - 1][k - t];
                    }
            }
        
        return f[n][m][0];
    }
};
```

```c++
class Solution {
public:
    const static int N = 110, K = 210, INF = 1e9;
    vector<vector<char>> g;
    int n, m;
    
    // 可以再空间压缩
    // 二进制比特位代表 左括号比右括号多的可能性
    __uint128_t f[N][N];
    
    bool hasValidPath(vector<vector<char>>& grid) {
        this->g = grid, this->n = g.size(), this->m = g[0].size();
        if ((n + m - 1) & 1)
            return false;
        memset(f, 0, sizeof f);
        
        f[0][1] = f[1][0] = 1;
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                f[i][j] = f[i][j - 1] | f[i - 1][j];
                // 如果是左括号，所有可能性true的统一加一，即左移
                if (g[i - 1][j - 1] == '(')
                    f[i][j] <<= 1;
                else
                    f[i][j] >>= 1;
            }
        
        // 取最后一位 即差为0
        return f[n][m] & 1;
    }
};
```

```c++
class Solution {
public:
    const static int N = 110, K = 210, INF = 1e9;
    vector<vector<char>> g;
    int n, m;
    
    // 空间压缩
    // 二进制比特位代表 左括号比右括号多的可能性
    __uint128_t f[N];
    
    bool hasValidPath(vector<vector<char>>& grid) {
        this->g = grid, this->n = g.size(), this->m = g[0].size();
        if ((n + m - 1) & 1)
            return false;
        memset(f, 0, sizeof f);
        
        f[1] = 1;
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                f[j] |= f[j - 1];
                // 如果是左括号，所有可能性true的统一加一，即左移
                if (g[i - 1][j - 1] == '(')
                    f[j] <<= 1;
                else
                    f[j] >>= 1;
            }
        
        // 取最后一位 即差为0
        return f[m] & 1;
    }
};
```

