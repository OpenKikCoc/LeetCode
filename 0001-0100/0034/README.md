#  [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int n = nums.size();
        vector<int> res(2);
        res[0] = res[1] = -1;
        int l = 0, r = n;
        while(l < r) {
            int mid = l + (r-l)/2;
            if(nums[mid] < target) l = mid+1;
            else r = mid;
        }
        res[0] = l < n && nums[l] == target ? l : -1;
        l = 0, r = n;
        while(l < r) {
            int mid = l + (r-l)/2;
            if(nums[mid] <= target) l = mid+1;
            else r = mid;
        }
        res[1] = l > 0 && nums[l-1] == target ? l-1 : -1;
        return res; 
    }
};
```



```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)
        l, r = 0, n
        p1 = 0
        while l < r:  #找到等于target的目标值的位置;
            m = l + (r - l) // 2
            if nums[m] < target:
                l = m + 1
            else:r = m
        if 0 <= l < n and nums[l] == target:
            p1 = l 
        else:return [-1, -1]

        l, r = 0, n 
        while l < r:   #找到第一个比target大的整数
            m = l + (r - l) // 2
            if nums[m] <= target:
                l = m + 1
            else:r = m
        p2 = l - 1  #不用再做判断了，因为如果不存在target，第一步已经返回了[-1,-1]
        return [p1, p2]
```

