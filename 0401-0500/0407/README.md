#  [407. 接雨水 II](https://leetcode-cn.com/problems/trapping-rain-water-ii/)

## 题意



## 题解

考虑每个格子最终的高度，该高度减去初始高度就是本格子的水量。

该高度：从 `[i, j]` 到每个边界的所有路径的最大值的最小值。

显然无法通过 dp 来转移（状态间的环形依赖），**考虑类似图论的思想**。

-   首先考虑边界，其最终高度显然（为本身）。
-   向内部扩展时找【最低的，将周围点加入】

**注意正确性推导**

```c++
class Solution {
public:
    typedef tuple<int, int, int> tpi3;
    int trapRainWater(vector<vector<int>>& h) {
        if (h.empty() || h[0].empty()) return 0;
        int n = h.size(), m = h[0].size();
        priority_queue<tpi3, vector<tpi3>, greater<tpi3>> heap;
        vector<vector<bool>> st(n, vector<bool>(m));

        for (int i = 0; i < n; ++ i ) {
            st[i][0] = st[i][m - 1] = true;
            heap.push({h[i][0], i, 0});
            heap.push({h[i][m - 1], i, m - 1});
        }
        for (int i = 0; i < m; ++ i ) {
            st[0][i] = st[n - 1][i] = true;
            heap.push({h[0][i], 0, i});
            heap.push({h[n - 1][i], n - 1, i});
        }

        int res = 0;
        vector<int> dx = {-1, 0, 0, 1}, dy = {0, -1, 1, 0};
        while (!heap.empty()) {
            auto [nh, x, y] = heap.top();
            heap.pop();
            res += nh - h[x][y];
            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= n || ny < 0 || ny >= m || st[nx][ny]) continue;
                heap.push({max(h[nx][ny], nh), nx, ny});
                st[nx][ny] = true;
            }
        }
        return res;
    }
};
```

```c++
// yxc
class Solution {
public:
    struct Cell {
        int h, x, y;
        bool operator< (const Cell& t) const {
            return h > t.h;
        }
    };

    int trapRainWater(vector<vector<int>>& h) { 
        if (h.empty() || h[0].empty()) return 0;
        int n = h.size(), m = h[0].size();
        priority_queue<Cell> heap;
        vector<vector<bool>> st(n, vector<bool>(m));
        for (int i = 0; i < n; i ++ ) {
            st[i][0] = st[i][m - 1] = true;
            heap.push({h[i][0], i, 0});
            heap.push({h[i][m - 1], i, m - 1});
        }
        for (int i = 1; i + 1 < m; i ++ ) {
            st[0][i] = st[n - 1][i] = true;
            heap.push({h[0][i], 0, i});
            heap.push({h[n - 1][i], n - 1, i});
        }
        int res = 0;
        int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
        while (heap.size()) {
            auto t = heap.top();
            heap.pop();
            res += t.h - h[t.x][t.y];

            for (int i = 0; i < 4; i ++ ) {
                int x = t.x + dx[i], y = t.y + dy[i];
                if (x >= 0 && x < n && y >= 0 && y < m && !st[x][y]) {
                    heap.push({max(h[x][y], t.h), x, y});
                    st[x][y] = true;
                }
            }
        }

        return res;
    }
};
```



```python3

```

