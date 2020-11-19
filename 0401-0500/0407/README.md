#  [407. 接雨水 II](https://leetcode-cn.com/problems/trapping-rain-water-ii/)

## 题意



## 题解



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



```python3

```

