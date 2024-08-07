#  [200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)

## 题意



## 题解



```c++
class Solution {
public:
    int m, n;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    void dfs(int x, int y, vector<vector<char>>& grid) {
        grid[x][y] = '0';
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < m && nx >= 0 && ny < n && ny >= 0 && grid[nx][ny] == '1') {
                dfs(nx, ny, grid);
            }
        }
    }
    int numIslands(vector<vector<char>>& grid) {
        m = grid.size();
        if (!m) return 0;
        n = grid[0].size();
        int res = 0;
        for (int i = 0; i < m; ++ i ) {
            for (int j = 0;  j < n; ++ j ) {
                if (grid[i][j] == '1') {
                    dfs(i, j, grid);
                    res ++ ;
                }
            }
        }
        return res;
    }
};
```



```python
# Flood Fill算法-- DFS模版

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        n, m = len(grid), len(grid[0])
        res = 0

        def dfs(x, y):
            grid[x][y] = '0'
            dx, dy = [0, 0, 1, -1], [1, -1, 0, 0]
            for i in range(4):
                nx, ny = x + dx[i], y + dy[i]
                if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] == '1':
                    dfs(nx, ny)
        
        for i in range(n):
            for j in range(m):
                if grid[i][j] == '1':
                    dfs(i, j)
                    res += 1
        return res
```

