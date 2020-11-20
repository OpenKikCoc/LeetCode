#  [463. 岛屿的周长](https://leetcode-cn.com/problems/island-perimeter/)

## 题意



## 题解



```c++
class Solution {
public:
    int n, m, res;
    vector<vector<int>> g;
    vector<vector<bool>> vis;
    vector<int> dx = {-1, 0, 0, 1}, dy = {0, -1, 1, 0};
    void dfs(int x, int y) {
        //cout << x << " " << y << endl;
        vis[x][y] = true;
        for(int i = 0; i < 4; ++i) {
            int nx = x + dx[i], ny = y + dy[i];
            if(nx < 0 || nx >= n || ny < 0 || ny >= m || !g[nx][ny]) {
                ++res;
                continue;
            }
            if(vis[nx][ny]) continue;
            dfs(nx, ny);
        }
    }
    int islandPerimeter(vector<vector<int>>& grid) {
        n = grid.size(), m = grid[0].size();
        res = 0;
        g = grid;
        vis = vector<vector<bool>>(n, vector<bool>(m));
        for(int i = 0; i < n; ++i)
            for(int j = 0; j < m; ++j)
                if(g[i][j] && !vis[i][j]) dfs(i, j);
        //cout << endl;
        return res;
    }
};
```



```python3

```

