#  [675. 为高尔夫比赛砍树](https://leetcode-cn.com/problems/cut-off-trees-for-golf-event/)

## 题意



## 题解



```c++
class Solution {
public:
    using PII = pair<int, int>;
    using TIII = tuple<int, int, int>;
    int n, m;
    vector<vector<int>> g;
    int dx[4] = {1, 0, 0, -1}, dy[4] = {0, -1, 1, 0};

    int bfs(int sx, int sy, int tx, int ty) {
        if (sx == tx && sy == ty)
            return 0;
        vector<vector<int>> dist(n, vector<int>(m, 1e9));
        dist[sx][sy] = 0;
        queue<PII> q;
        q.push({sx, sy});
        while (q.size()) {
            auto [x, y] = q.front(); q.pop();
            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
                if (!g[nx][ny]) continue;
                if (dist[nx][ny] > dist[x][y] + 1) {
                    dist[nx][ny] = dist[x][y] + 1;
                    if (nx == tx && ny == ty)
                        return dist[nx][ny];
                    q.push({nx, ny});
                }
            }
        }
        return -1;
    }

    int cutOffTree(vector<vector<int>>& forest) {
        g = forest;
        n = g.size(), m = g[0].size();
        vector<TIII> trs;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j] > 1)
                    trs.push_back({g[i][j], i, j});
        sort(trs.begin(), trs.end());

        int x = 0, y = 0, res = 0;
        for (auto [tmp, nx, ny] : trs) {
            int t = bfs(x, y, nx, ny);
            if (t == -1)
                return -1;
            res += t;
            x = nx, y = ny;
        }
        return res;
    }
};
```



```python3

```

