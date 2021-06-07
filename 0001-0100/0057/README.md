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



```python
class Solution:
    def insert(self, nums1: List[List[int]], nums2: List[int]) -> List[List[int]]:
        nums1.append(nums2)
        nums1.sort()
        left, right = nums1[0][0], nums1[0][1]
        res = []
        for i in range(1, len(nums1)):
            if nums1[i][0] <= right:
                right = max(right, nums1[i][1])
            else:
                res.append([left,right])
                left, right = nums1[i][0], nums1[i][1]
        res.append([left, right])
        return res
```

