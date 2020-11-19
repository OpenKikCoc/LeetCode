#  [435. 无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)

## 题意



## 题解



```c++
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        int len = intervals.size();
        if (len <= 1) return 0;
        sort(intervals.begin(), intervals.end(), [](vector<int> a, vector<int> b) {
            return a[1] < b[1];
        });
        int ans = 0, last = intervals[0][1];
        for(int i = 1; i < len; ++i)
            if (intervals[i][0] < last) ans++;
            else last = intervals[i][1];
        return ans;
    }
};
```



```python3

```

