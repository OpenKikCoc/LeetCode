#  [329. 矩阵中的最长递增路径](https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/)

## 题意



## 题解

更标准的写法

```c++
class Solution {
public:
    int n, m;
    vector<vector<int>> f, w;
    int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};

    int dp(int x, int y) {
        auto& v = f[x][y];
        if (v != -1) return v;
        v = 1;
        for (int i = 0; i < 4; i ++ ) {
            int a = x + dx[i], b = y + dy[i];
            if (a >= 0 && a < n && b >= 0 && b < m && w[x][y] < w[a][b])
                v = max(v, dp(a, b) + 1);
        }
        return v;
    }

    int longestIncreasingPath(vector<vector<int>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        w = matrix;
        n = w.size(), m = w[0].size();
        f = vector<vector<int>>(n, vector<int>(m, -1));

        int res = 0;
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ )
                res = max(res, dp(i, j));
        return res;
    }
};
```



```c++
class Solution {
public:
    int m, n;
    int dx[4] = {0, -1, 1, 0}, dy[4] = {-1, 0, 0, 1};
    int dp(int x, int y, vector<vector<int>>& matrix, vector<vector<int>>& f) {
        if(f[x][y]) return f[x][y];
        f[x][y] = 1;
        for(int i = 0; i < 4; ++i) {
            int nx = x + dx[i], ny = y + dy[i];
            if(nx >= 0 && nx < m && ny >= 0 && ny < n && matrix[x][y] < matrix[nx][ny]) {
                f[x][y] = max(f[x][y], dp(nx, ny, matrix, f) + 1);
            }
        }
        return f[x][y];
    }
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        m = matrix.size();
        if(!m) return 0;
        n = matrix[0].size();
        vector<vector<int>> f(m+1, vector<int>(n+1));
        int res = 0;
        for(int i = 0; i < m; ++i) {
            for(int j = 0; j < n; ++j) {
                if(f[i][j] == 0) res = max(res, dp(i, j, matrix, f));
                else res = max(res, f[i][j]);
            }
        }
        return res;
    }
};
```



```python3

```

