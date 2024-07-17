#  [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/)

## 题意



## 题解



```c++
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int n = nums.size();
        int l = 0, r = n;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] < target) l = mid + 1;
            else r = mid;
        }
        return l;
    }
};
```



```python
#这道题是要找到第一个大于或者等于目标值的整数的位置
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        n = len(nums)
        l, r = 0, n
        while l < r:
            m = l + (r - l) // 2
            if nums[m] < target:
                l = m + 1 
            else:r = m 
        return l 
```

