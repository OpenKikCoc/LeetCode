#  [542. 01 矩阵](https://leetcode.cn/problems/01-matrix/)

## 题意



## 题解



```c++
class Solution {
public:
    using PII = pair<int, int>;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    vector<vector<int>> updateMatrix(vector<vector<int>> & matrix) {
        if (matrix.empty() || matrix[0].empty()) return matrix;
        int n = matrix.size(), m = matrix[0].size();
        vector<vector<int>> dist(n, vector<int>(m, -1));
        queue<PII> q;

        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (matrix[i][j] == 0)
                    dist[i][j] = 0, q.push({i, j});
        while (!q.empty()) {
            auto [x, y] = q.front(); q.pop();
            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= n || ny < 0 || ny >= m || dist[nx][ny] != -1) continue;
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
        return dist;
    }
};
```



```python3

```

