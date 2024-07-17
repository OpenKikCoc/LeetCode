#  [733. 图像渲染](https://leetcode.cn/problems/flood-fill/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> g;
    vector<vector<bool>> st;
    int n, m;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};

    void dfs(int x, int y, int c, int nc) {
        g[x][y] = nc;
        st[x][y] = true;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m || g[nx][ny] != c || st[nx][ny])
                continue;
            dfs(nx, ny, c, nc);
        }
    }

    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        g = image;
        n = g.size(), m = g[0].size();
        st = vector<vector<bool>>(n, vector<bool>(m));

        dfs(sr, sc, g[sr][sc], newColor);

        return g;
    }
};
```

也可以不用 st 只需判断新颜色是否和原本的相同

```c++
class Solution {
public:
    vector<vector<int>> g;
    int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};

    void dfs(int x, int y, int color, int newColor) {
        g[x][y] = newColor;
        for (int i = 0; i < 4; i ++ ) {
            int a = x + dx[i], b = y + dy[i];
            if (a >= 0 && a < g.size() && b >= 0 && b < g[0].size() && g[a][b] == color)
                dfs(a, b, color, newColor);
        }
    }

    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        g = image;
        int color = g[sr][sc];
        if (color == newColor) return g;
        dfs(sr, sc, color, newColor);
        return g;
    }
};
```







```python3

```

