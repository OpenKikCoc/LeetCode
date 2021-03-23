#  [749. 隔离病毒](https://leetcode-cn.com/problems/contain-virus/)

## 题意



## 题解



```c++
class Solution {
public:
    // 本质是模拟题
    using PII = pair<int, int>;
    #define x first
    #define y second

    vector<vector<int>> g;
    vector<vector<bool>> st;
    vector<PII> path;
    int n, m;
    set<PII> S;
    int dx[4] = {0, -1, 1, 0}, dy[4] = {1, 0, 0, -1};

    int dfs(int x, int y) {
        st[x][y] = true;
        path.push_back({x, y});
        int res = 0;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                continue;
            if (!g[nx][ny])
                S.insert({nx, ny}), res ++ ;
            else if (g[nx][ny] == 1 && !st[nx][ny])
                res += dfs(nx, ny);
        }
        return res;
    }

    // 找到即将扩散最多的那个区域
    int find() {
        st = vector<vector<bool>>(n, vector<bool>(m));
        int cnt = 0, res = 0;
        // 保存该连通块内所有的点 方便后面标记
        vector<set<PII>> ss;
        vector<PII> ps;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j] == 1 && !st[i][j]) {
                    path.clear(), S.clear();
                    int t = dfs(i, j);
                    if (S.size() > cnt) {
                        cnt = S.size();
                        res = t;
                        ps = path;
                    }
                    ss.push_back(S);
                }
        // 设置
        for (auto & p : ps)
            g[p.x][p.y] = -1;
        // 恢复其他
        for (auto & s : ss)
            if (s.size() != cnt)
                for (auto & p : s)
                    g[p.x][p.y] = 1;
        return res;
    }

    int containVirus(vector<vector<int>>& grid) {
        g = grid;
        n = g.size(), m = g[0].size();
        int res = 0;
        for (;;) {
            auto cnt = find();
            if (!cnt)
                break;
            res += cnt;
        }
        return res;
    }
};
```



```python3

```

