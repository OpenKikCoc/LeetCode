#  [695. 岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/)

## 题意



## 题解



```c++
class Solution {
public:
    int n, m;
    vector<vector<int>> g;
    int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};

    int dfs(int x, int y) {
        int res = 1;
        g[x][y] = 0;
        for (int i = 0; i < 4; ++ i ) {
            int a = x + dx[i], b = y + dy[i];
            if (a >= 0 && a < n && b >= 0 && b < m && g[a][b])
                res += dfs(a, b);
        }
        return res;
    }

    int maxAreaOfIsland(vector<vector<int>>& grid) {
        g = grid;
        n = g.size(), m = g[0].size();
        int res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j]) {
                    res = max(res, dfs(i, j));
                }
        return res;
    }
};
```



```python
# dfs， Flood Fill的裸算法
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        if not grid:return 0
        n, m = len(grid), len(grid[0])
        res = 0

        def dfs(x, y):
            grid[x][y] = 0
            ans = 1
            dx, dy = [1, -1, 0, 0], [0, 0, 1, -1]
            for i in range(4):
                nx, ny = x + dx[i], y + dy[i]
                if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] == 1:
                    ans += dfs(nx, ny)
            return ans 

        for i in range(n):
            for j in range(m):
                if grid[i][j] == 1:
                    res = max(res, dfs(i, j))
        return res
```

