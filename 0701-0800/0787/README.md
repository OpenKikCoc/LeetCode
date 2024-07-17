#  [787. K 站中转内最便宜的航班](https://leetcode.cn/problems/cheapest-flights-within-k-stops/)

## 题意



## 题解



```c++
class Solution {
public:
    const int INF = 1e8;

    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> d(n, INF);
        d[src] = 0;
        k ++ ;
        while (k -- ) {
            auto cur = d;
            for (auto & e : flights) {
                int a = e[0], b = e[1], c = e[2];
                cur[b] = min(cur[b], d[a] + c);
            }
            d = cur;
        }
        return d[dst] == INF ? -1 : d[dst];
    }
};
```



```python3

```

