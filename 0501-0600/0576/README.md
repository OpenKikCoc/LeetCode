#  [576. 出界的路径数](https://leetcode.cn/problems/out-of-boundary-paths/)

## 题意



## 题解



```c++
class Solution {
public:
    int m, n, N, mod = 1e9 + 7;
    int dx[4] = {0, -1, 1, 0}, dy[4] = {-1, 0, 0, 1};

    int findPaths(int m, int n, int N, int i, int j) {
        if (!N) return 0;
        vector<vector<int>> pre(m + 2, vector<int>(n + 2)), cur(m + 2, vector<int>(n + 2));
        for (int i = 1; i <= m; ++ i ) ++ pre[i][1], ++ pre[i][n];    // 向左右
        for (int i = 1; i <= n; ++ i ) ++ pre[1][i], ++ pre[m][i];    // 向上下
        int res = pre[i + 1][j + 1];
        for (int k = 2; k <= N; ++ k ) {
            for (int x = 1; x <= m; ++ x )
                for (int y = 1; y <= n; ++ y ) {
                    cur[x][y] = 0;
                    cur[x][y] += pre[x - 1][y]; cur[x][y] %= mod;
                    cur[x][y] += pre[x + 1][y]; cur[x][y] %= mod;
                    cur[x][y] += pre[x][y - 1]; cur[x][y] %= mod;
                    cur[x][y] += pre[x][y + 1]; cur[x][y] %= mod;
                }
            res = res + cur[i + 1][j + 1];
            res %= mod;
            pre = cur;
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    int findPaths(int m, int n, int N, int x, int y) {
        if (!N) return 0;
        const int MOD = 1e9 + 7;
        vector<vector<vector<int>>> f(m, vector<vector<int>>(n, vector<int>(N + 1)));
        for (int i = 0; i < n; i ++ ) {
            f[0][i][1] ++ ;
            f[m - 1][i][1] ++ ;
        }
        for (int i = 0; i < m; i ++ ) {
            f[i][0][1] ++ ;
            f[i][n - 1][1] ++ ;
        }

        int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
        for (int k = 1; k <= N; k ++ )
            for (int i = 0; i < m; i ++ )
                for (int j = 0; j < n; j ++ )
                    for (int u = 0; u < 4; u ++ ) {
                        int a = i + dx[u], b = j + dy[u];
                        if (a >= 0 && a < m && b >= 0 && b < n)
                            (f[i][j][k] += f[a][b][k - 1]) %= MOD;
                    }

        int res = 0;
        for (int k = 1; k <= N; k ++ )
            (res += f[x][y][k]) %= MOD;

        return res;
    }
};
```



```python3

```

