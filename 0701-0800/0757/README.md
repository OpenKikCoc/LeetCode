#   [757. 设置交集大小至少为2](https://leetcode-cn.com/problems/set-intersection-size-at-least-two/)

## 题意



## 题解



```c++
class Solution {
public:
    // 区间选点变种
    int intersectionSizeTwo(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](vector<int> & a, vector<int> & b) {
            if (a[1] != b[1])
                return a[1] < b[1];
            // 优先考虑比较短的区间 避免重复统计
            return a[0] > b[0];
        
        });
        
        vector<int> q(1, -1);
        int cnt = 0;
        for (auto & r : intervals)
            // 考虑最后两个元素
            if (r[0] > q[cnt]) {
                q.push_back(r[1] - 1);
                q.push_back(r[1]);
                cnt += 2;
            } else if (r[0] > q[cnt- 1]) {
                q.push_back(r[1]);
                cnt += 1;
            }
        return cnt;
    }
};
```



```python3

```

