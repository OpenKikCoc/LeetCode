#  [64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum/)

## 题意



## 题解

```c++
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int n = grid.size();
        if (!n) return 0;
        int m = grid[0].size();

        vector<vector<int>> f(n, vector<int>(m, INT_MAX));
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ ) {
                if (!i && !j) f[i][j] = grid[i][j];
                else {
                    if (i) f[i][j] = min(f[i][j], f[i - 1][j] + grid[i][j]);
                    if (j) f[i][j] = min(f[i][j], f[i][j - 1] + grid[i][j]);
                }
            }

        return f[n - 1][m - 1];
    }
};
```



```c++
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        if (!m) return 0;
        int n = grid[0].size();
        vector<int> f(n + 1);
        for (int i = 1; i <= n; ++ i ) f[i] = grid[0][i - 1] + f[i - 1];
        for (int i = 2; i <= m; ++ i )
            for (int j = 1; j <= n; ++ j )
                f[j] = min(f[j], j > 1 ? f[j-1] : INT_MAX) + grid[i - 1][j - 1];
        return f[n];
    }
};
```

```c++
class Solution {
public:
    const static int N = 210;
    int f[N][N];

    int minPathSum(vector<vector<int>>& grid) {
        memset(f, 0x3f, sizeof f);
        int n = grid.size(), m = grid[0].size();
        f[0][1] = f[1][0] = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                f[i][j] = min(f[i - 1][j], f[i][j - 1]) + grid[i - 1][j - 1];
        return f[n][m];
    }
};
```



```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        n, m = len(grid), len(grid[0])
        N = 210
        f = [[float('inf')] * N for _ in range(N)] # 求最小，初始化为最大值
        f[0][1], f[1][0] = 0, 0  # 特别的 要初始化为0
        for i in range(1, n + 1):
            for j in range(1, m +1):
                f[i][j] = min(f[i - 1][j], f[i][j - 1]) + grid[i-1][j-1]
        return f[n][m]
```

