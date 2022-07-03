## [比赛链接](https://leetcode.cn/contest/weekly-contest-300)

>   36 / 6592


### [6108. 解密消息](https://leetcode.cn/problems/decode-the-message/)

略

```c++
class Solution {
public:
    const static int N = 26;
    
    unordered_map<char, char> hash;
    
    string decodeMessage(string key, string message) {
        for (auto c : key) {
            if (c == ' ')
                continue;
            if (hash.count(c))
                continue;
            int t = hash.size();
            hash[c] = t + 'a';
        }
        
        string res;
        for (auto c : message)
            if (c == ' ')
                res.push_back(c);
            else
                res.push_back(hash[c]);
        return res;
    }
};
```


### [6111. 螺旋矩阵 IV](https://leetcode.cn/problems/spiral-matrix-iv/)

略

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    vector<vector<int>> g;
    vector<vector<int>> spiralMatrix(int m, int n, ListNode* head) {
        this->g = vector<vector<int>>(m, vector<int>(n, -1));
        int u = 0, d = m - 1, l = 0, r = n - 1;
        for (;;) {
            for (int i = l; i <= r && head; ++ i )
                g[u][i] = head->val, head = head->next;
            if (head == nullptr || ++ u > d)
                break;
            for (int i = u; i <= d && head; ++ i )
                g[i][r] = head->val, head = head->next;
            if (head == nullptr || -- r < l)
                break;
            for (int i = r; i >= l && head; -- i )
                g[d][i] = head->val, head = head->next;
            if (head == nullptr || -- d < u)
                break;
            for (int i = d; i >= u && head; -- i )
                g[i][l] = head->val, head = head->next;
            if (head == nullptr || ++ l > r)
                break;
        }
        return g;
    }
};
```

### [6109. 知道秘密的人数](https://leetcode.cn/problems/number-of-people-aware-of-a-secret/)

略

```c++
class Solution {
public:
    const static int N = 1010, MOD = 1e9 + 7;
    
    int f[N];   // 第 i 天新增的知道秘密的人数, 由 (i-forget, i-delay] 知道的人数总和决定
    
    int peopleAwareOfSecret(int n, int delay, int forget) {
        memset(f, 0, sizeof f);
        f[1] = 1;
        for (int i = 2; i <= n; ++ i ) {
            for (int j = max(1, i - forget + 1); j <= i - delay; ++ j )
                f[i] = (f[i] + f[j]) % MOD;
            // cout << " i = " << i << " f = " << f[i] << endl;
        }
        int res = 0;
        for (int i = max(1, n - forget + 1); i <= n; ++ i )
            res = (res + f[i]) % MOD;
        return res;
    }
};
```

### [6110. 网格图中递增路径的数目](https://leetcode.cn/problems/number-of-increasing-paths-in-a-grid/)

略

```c++
class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;
    
    vector<vector<int>> g;
    int n, m;
    vector<vector<LL>> f;
    
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    LL dp(int x, int y) {
        if (f[x][y] != -1)
            return f[x][y];
        f[x][y] = 1;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m || g[nx][ny] >= g[x][y])
                continue;
            f[x][y] = (f[x][y] + dp(nx, ny)) % MOD;
        }
        return f[x][y] % MOD;
    }
    
    int countPaths(vector<vector<int>>& grid) {
        this->g = grid, this->n = g.size(), this->m = g[0].size();
        this->f = vector<vector<LL>>(n, vector<LL>(m, -1));
        LL res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                res = (res + dp(i, j)) % MOD;
        // for (int i = 0; i < n; ++ i )
        //     for (int j = 0; j < m; ++ j )
        //         cout << " x = " << i << " y = " << j << " f = " << f[i][j] << endl;
        return res;
    }
};
```
