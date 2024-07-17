## [比赛链接](https://leetcode.cn/contest/weekly-contest-157/)

virtual rating: 93 / 1216

### [1217. 玩筹码](https://leetcode.cn/problems/minimum-cost-to-move-chips-to-the-same-position/)



```c++
class Solution {
public:
    int minCostToMoveChips(vector<int>& position) {
        int odd = 0, even = 0;
        for (auto v : position)
            if (v & 1) ++ odd;
            else ++ even;
        return min(odd, even);
    }
};
```


### [1218. 最长定差子序列](https://leetcode.cn/problems/longest-arithmetic-subsequence-of-given-difference/)



```c++
class Solution {
public:
    int longestSubsequence(vector<int>& arr, int difference) {
        unordered_map<int, int> hash;
        int res = 1, n = arr.size();
        vector<int> f(n);
        for (int i = 0; i < n; ++ i ) {
            int last = arr[i] - difference;
            f[i] = 1;
            if (hash.count(last))
                f[i] = max(f[i], f[hash[last]] + 1);
            hash[arr[i]] = i;
        }
        for (int i = 0; i < n; ++ i ) res = max(res, f[i]);
        return res;
    }
};
```

### [1219. 黄金矿工](https://leetcode.cn/problems/path-with-maximum-gold/) [TAG]

一开始想复杂了，直接 tmp 记录 g 随后恢复即可

```c++
class Solution {
public:
    int n, m;
    vector<vector<int>> gs, g;
    
    vector<int> dx = {-1, 0, 0, 1}, dy = {0, -1, 1, 0};
    int dfs(int x, int y) {
        int ret = g[x][y], t = 0;
        int tmp = g[x][y];
        g[x][y] = 0;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m || !g[nx][ny]) continue;
            t = max(t, dfs(nx, ny));
        }
        g[x][y] = tmp;
        return ret + t;
    }
    
    int getMaximumGold(vector<vector<int>>& grid) {
        gs = grid;
        n = gs.size(), m = gs[0].size();
        
        int res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) if (gs[i][j]) {
                g = gs;
                res = max(res, dfs(i, j));
            }
        return res;
    }
};
```

### [1220. 统计元音字母序列的数目](https://leetcode.cn/problems/count-vowels-permutation/)

线性dp 略

```c++
class Solution {
public:
    const int mod = 1e9 + 7;
    int countVowelPermutation(int n) {
        vector<vector<long long>> f(n + 1, vector<long long>(5));
        f[1][0] = f[1][1] = f[1][2] = f[1][3] = f[1][4] = 1;
        for (int i = 2; i <= n; ++ i ) {
            f[i][0] = (f[i - 1][1] + f[i - 1][2] + f[i - 1][4]) % mod;
            f[i][1] = (f[i - 1][0] + f[i - 1][2]) % mod;
            f[i][2] = (f[i - 1][1] + f[i - 1][3]) % mod;
            f[i][3] = (f[i - 1][2]) % mod;
            f[i][4] = (f[i - 1][2] + f[i - 1][3]) % mod;
        }
        long long res = 0;
        for (int i = 0; i < 5; ++ i ) res = (res + f[n][i]) % mod;
        return res;
    }
};

```
