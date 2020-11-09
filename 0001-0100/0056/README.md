#  [56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        vector<vector<int>> res;
        int n = intervals.size();
        if(!n) return res;
        sort(intervals.begin(), intervals.end());
        int s = intervals[0][0], t = intervals[0][1];
        for(int i = 1; i < n; ++i) {
            if(intervals[i][0] <= t) {
                t = max(t, intervals[i][1]);
            } else {
                res.push_back(vector<int>{s, t});
                s = intervals[i][0], t = intervals[i][1];
            }
        }
        res.push_back(vector<int>{s, t});
        return res;
    }
};
```



```python3

```

