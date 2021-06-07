#  [81. 搜索旋转排序数组 II](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int n = nums.size();
        if(!n) return false;
        int l = 0, r = n-1;
        while(l < r) {
            while(l < r && nums[l] == nums[r]) --r;
            int mid = l + (r-l)/2;
            if(nums[l] <= nums[mid] && (target < nums[l] || target > nums[mid])) l = mid+1;
            else if(nums[l] > nums[mid] && (target > nums[mid] && target < nums[l])) l = mid+1;
            else r = mid;
        }
        return nums[l] == target;
    }
};
```



```python
class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        l, r = 0, len(nums) - 1
        while l < r:
            m = l + (r - l) // 2
            if nums[m] < nums[r]:
                if nums[m] < target <= nums[r]:
                    l = m + 1
                else:r = m
            elif nums[m] > nums[r]:
                if target > nums[m] or target <= nums[r]:
                    l = m + 1
                else:r = m 
            else:r -= 1
        return nums[l] == target
```

