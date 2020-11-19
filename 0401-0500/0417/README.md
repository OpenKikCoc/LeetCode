#  [417. 太平洋大西洋水流问题](https://leetcode-cn.com/problems/pacific-atlantic-water-flow/)

## 题意



## 题解



```c++
class Solution {
public:
    int m, n;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    void dfs(int x, int y, vector<vector<int>>& matrix, vector<vector<bool>>& vis) {
        vis[x][y] = true;
        int nx, ny;
        for(int i = 0; i < 4; ++i) {
            nx = x + dx[i], ny = y + dy[i];
            if(nx >= 0 && nx < m && ny >= 0 && ny < n && !vis[nx][ny] && matrix[x][y] <= matrix[nx][ny])
                dfs(nx, ny, matrix, vis);
        }
    }
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& matrix) {
        vector<vector<int>> res;
        if (matrix.empty()) return res;
        m = matrix.size();
        n = matrix[0].size();
        vector<vector<bool>> canp(m, vector<bool>(n)), cana(m, vector<bool>(n));
        for(int i = 0; i < n; ++i) dfs(0, i, matrix, canp);
        for(int i = 0; i < m; ++i) dfs(i, 0, matrix, canp);
        for(int i = 0; i < n; ++i) dfs(m-1, i, matrix, cana);
        for(int i = 0; i < m; ++i) dfs(i, n-1, matrix, cana);
        for(int i = 0; i < m; ++i) {
            for(int j = 0; j < n; ++j) {
                if (cana[i][j] && canp[i][j]) res.push_back({i,j});
            }
        }
        return res;
    }
};
```



```python3

```

