#  [154. 寻找旋转排序数组中的最小值 II](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int findMin(vector<int>& nums) {
        int n = nums.size();
        int l = 0, r = n - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] > nums[r])
                l = m + 1;
            else if (nums[m] < nums[r])
                r = m;
            else -- r ;
        }
        return nums[l];
    }
};
```



```python
class Solution:
    def findMin(self, nums: List[int]) -> int:
        n = len(nums)
        l, r = 0, n - 1
        while l < r:
            m = l + (r - l) // 2 
            if nums[m] > nums[r]:
                l = m + 1 
            elif nums[m] < nums[r]:
                r = m 
            else:
                r -= 1  # 当存在重复元素时
        return nums[l]
```

