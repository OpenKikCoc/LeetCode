#  [417. 太平洋大西洋水流问题](https://leetcode.cn/problems/pacific-atlantic-water-flow/)

## 题意



## 题解

```c++
class Solution {
public:
    int n, m;
    vector<vector<int>> w;
    vector<vector<int>> st;

    int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};

    void dfs(int x, int y, int t) {
        if (st[x][y] & t) return;
        st[x][y] |= t;
        for (int i = 0; i < 4; i ++ ) {
            int a = x + dx[i], b = y + dy[i];
            if (a >= 0 && a < n && b >= 0 && b < m && w[a][b] >= w[x][y])
                dfs(a, b, t);
        }
    }

    vector<vector<int>> pacificAtlantic(vector<vector<int>>& matrix) {
        w = matrix;
        if (w.empty() || w[0].empty()) return {};
        n = w.size(), m = w[0].size();
        st = vector<vector<int>>(n, vector<int>(m));

        for (int i = 0; i < n; i ++ ) dfs(i, 0, 1);
        for (int i = 0; i < m; i ++ ) dfs(0, i, 1);
        for (int i = 0; i < n; i ++ ) dfs(i, m - 1, 2);
        for (int i = 0; i < m; i ++ ) dfs(n - 1, i, 2);

        vector<vector<int>> res;
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ )
                if (st[i][j] == 3)
                    res.push_back({i, j});
        return res;
    }
};
```

```c++
class Solution {
public:
    int m, n;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    void dfs(int x, int y, vector<vector<int>>& matrix, vector<vector<bool>>& vis) {
        vis[x][y] = true;
        int nx, ny;
        for (int i = 0; i < 4; ++ i ) {
            nx = x + dx[i], ny = y + dy[i];
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && !vis[nx][ny] && matrix[x][y] <= matrix[nx][ny])
                dfs(nx, ny, matrix, vis);
        }
    }
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& matrix) {
        vector<vector<int>> res;
        if (matrix.empty()) return res;
        m = matrix.size();
        n = matrix[0].size();
        vector<vector<bool>> canp(m, vector<bool>(n)), cana(m, vector<bool>(n));
        for (int i = 0; i < n; ++ i ) dfs(0, i, matrix, canp);
        for (int i = 0; i < m; ++ i ) dfs(i, 0, matrix, canp);
        for (int i = 0; i < n; ++ i ) dfs(m - 1, i, matrix, cana);
        for (int i = 0; i < m; ++ i ) dfs(i, n - 1, matrix, cana);
        for (int i = 0; i < m; ++ i ) {
            for (int j = 0; j < n; ++ j ) {
                if (cana[i][j] && canp[i][j]) res.push_back({i, j});
            }
        }
        return res;
    }
};
```



```python
# 1. 分别从太平洋和大西洋边界位置出发遍历，能同时被他们遍历到的 就是满足条件的
# 2. 用二进制为表示是否合法。第一位表示太平洋 为1合法，第二位表示大西洋 为1合法；所以加起来当 当前格子的值为3时 就是满足条件的

class Solution:
    def pacificAtlantic(self, arr: List[List[int]]) -> List[List[int]]:
        n, m = len(arr), len(arr[0])
        st = [[0] * m for _ in range(n)]
        
        def dfs(x, y, t):
            if st[x][y] & t:return # 如果被遍历过，就return（不是continue!!!)
            st[x][y] |= t   # 如果没有被遍历过，又符合条件，就改变当前格子的st的值
            dx, dy = [1, -1, 0, 0], [0, 0, 1, -1]
            for i in range(4):
                nx, ny = x + dx[i], y + dy[i]
                if 0 <= nx < n and 0 <= ny < m and arr[x][y] <= arr[nx][ny]:
                    dfs(nx, ny, t)
        
        for i in range(m):dfs(0, i, 1)
        for i in range(n):dfs(i, 0, 1)
        for i in range(m):dfs(n - 1, i, 2)
        for i in range(n):dfs(i, m - 1, 2)

        res = []
        for i in range(n):
            for j in range(m):
                if st[i][j] == 3:
                    res.append([i, j])
        return res
```

