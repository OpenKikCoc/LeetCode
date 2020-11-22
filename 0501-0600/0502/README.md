#  [502. IPO](https://leetcode-cn.com/problems/ipo/)

## 题意



## 题解



```c++
class Solution {
public:
    // 优先选择当前资本下可选 且利润最大的项目
    // 细化：
    //    首先将项目按照资本从小到大排序。
    //    维护一个大根堆，根据当前资本 W，将可以开展的项目的利润放到堆中。
    //    每开始一个新项目时，从堆中取最大利润的项目，做完后增加 W，接着维护堆。
    int findMaximizedCapital(int k, int W, vector<int>& Profits, vector<int>& Capital) {
        vector<pair<int, int>> q;
        int n = Profits.size();
        for (int i = 0; i < n; ++ i ) q.push_back({Capital[i], Profits[i]});
        sort(q.begin(), q.end());

        priority_queue<int> heap;
        int res = 0, i = 0;
        while (k -- ) {
            while (i < n && q[i].first <= W) heap.push(q[i].second), ++ i ;
            if (heap.empty()) break;
            auto t = heap.top(); heap.pop();
            W += t;
        }
        return W;
    }
};
```



```python3

```

