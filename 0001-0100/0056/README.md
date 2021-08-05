#  [56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& a) {
        vector<vector<int>> res;
        if (a.empty()) return res;

        sort(a.begin(), a.end());
        int l = a[0][0], r = a[0][1];
        for (int i = 1; i < a.size(); i ++ ) {
            if (a[i][0] > r) {
                res.push_back({l, r});
                l = a[i][0], r = a[i][1];
            } else r = max(r, a[i][1]);
        }

        res.push_back({l, r});
        return res;
    }
};
```



```python
#绝大多数涉及到区间的题目的第一步要做的都是按照左端点或者右端点进行排序，排好序后找到其中的递推关系。

#按照区间的左端点合并。

class Solution:
    def merge(self, nums: List[List[int]]) -> List[List[int]]:
        n = len(nums)
        nums.sort()
        res = []
        left, right = nums[0][0], nums[0][1]
        for i in range(1, n):
            if nums[i][0] <= right:
                right = max(right, nums[i][1])
            else:
                res.append([left, right])
                left = nums[i][0]
                right = nums[i][1]
        res.append([left, right])  # 踩坑，记得把最后一个区间放进来
        return res
```

