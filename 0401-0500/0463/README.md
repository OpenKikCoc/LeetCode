#  [463. 岛屿的周长](https://leetcode.cn/problems/island-perimeter/)

## 题意



## 题解

```c++
class Solution {
public:
    int islandPerimeter(vector<vector<int>>& grid) {
        int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
        int res = 0;
        for (int i = 0; i < grid.size(); i ++ )
            for (int j = 0; j < grid[i].size(); j ++ )
                if (grid[i][j] == 1) {
                    for (int k = 0; k < 4; k ++ ) {
                        int x = i + dx[k], y = j + dy[k];
                        if (x < 0 || x >= grid.size() || y < 0 || y >= grid[0].size())
                            res ++ ;
                        else if (grid[x][y] == 0) res ++ ;
                    }
                }
        return res;
    }
};
```

```c++
class Solution {
public:
    int n, m, res;
    vector<vector<int>> g;
    vector<vector<bool>> vis;
    vector<int> dx = {-1, 0, 0, 1}, dy = {0, -1, 1, 0};
    void dfs(int x, int y) {
        // cout << x << " " << y << endl;
        vis[x][y] = true;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m || !g[nx][ny]) {
                ++ res ;
                continue;
            }
            if (vis[nx][ny]) continue;
            dfs(nx, ny);
        }
    }
    int islandPerimeter(vector<vector<int>>& grid) {
        n = grid.size(), m = grid[0].size();
        res = 0;
        g = grid;
        vis = vector<vector<bool>>(n, vector<bool>(m));
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j] && !vis[i][j])
                    dfs(i, j);
        return res;
    }
};
```



```python
# 不需要BFS/DFS 直接暴力遍历整个矩阵 发现岛屿块 检测上下左右四个方向即可(只要直接数一下边界数)
# 当发现1时，枚举四个方向：1）当出界  or  2) 从1 变成 0的话，说明就是岛屿的边界

class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        n, m = len(grid), len(grid[0])
        res = 0
        dx, dy = [1, -1, 0, 0], [0, 0, 1, -1]
        for i in range(n):
            for j in range(m):
                if grid[i][j] == 1:
                    for k in range(4):
                        nx, ny = i + dx[k], j + dy[k]
                        if nx < 0 or nx >= n or ny < 0 or ny >= m:
                            res += 1
                        elif grid[nx][ny] == 0:
                            res += 1
        return res
```

