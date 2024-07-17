#  [743. 网络延迟时间](https://leetcode.cn/problems/network-delay-time/)

## 题意



## 题解



```c++
class Solution {
public:
    const static int N = 110, M = 6010;
    const int INF = 2e9;
    using PII = pair<int, int>;
    int n;
    int h[N], e[M], w[M], ne[M], idx;
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }

    int dijkstra(int s) {
        vector<int> d(n + 1, INF);
        vector<bool> st(n + 1);
        d[s] = 0;
        priority_queue<PII, vector<PII>, greater<PII>> heap;
        heap.push({0, s});
        while (heap.size()) {
            auto [dis, ver] = heap.top();
            heap.pop();
            if (st[ver])
                continue;
            st[ver] = true;

            for (int i = h[ver]; ~i; i = ne[i] ) {
                int j = e[i], v = w[i];
                if (d[j] > dis + v) {
                    d[j] = dis + v;
                    heap.push({dis + v, j});
                }
            }
        }

        int maxv = 0;
        for (int i = 1; i <= n; ++ i )
            maxv = max(maxv, d[i]);
        return maxv > INF / 2 ? -1 : maxv;
    }

    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        memset(h, -1, sizeof h);
        for (auto & e : times)
            add(e[0], e[1], e[2]);
        this->n = n;
        return dijkstra(k);
    }
};
```



```python3

```

