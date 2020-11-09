#  [57. 插入区间](https://leetcode-cn.com/problems/insert-interval/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        int n = intervals.size();
        vector<vector<int>> res;
        int p = 0;
        while(p < n && intervals[p][1] < newInterval[0]) res.push_back(intervals[p++]);
        while(p < n && intervals[p][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[p][0]);
            newInterval[1] = max(newInterval[1], intervals[p][1]);
            ++p;
        }
        res.push_back(newInterval);
        while(p < n) res.push_back(intervals[p++]);
        return res;
    }
};
```



```python3

```

