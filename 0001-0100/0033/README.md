#  [33. 搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)

## 题意



## 题解



```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int n = nums.size();
        if(!n) return -1;
        int l = 0, r = n-1;
        while(l < r) {
            int mid = l + (r-l)/2;
            if(nums[l] <= nums[mid] && (target > nums[mid] || target < nums[l])) l = mid + 1;
            else if(nums[l] > nums[mid] && (target < nums[l] && target > nums[mid])) l = mid + 1;
            else r = mid;
        }
        return nums[l] == target ? l : -1;
    }
};
```



```python3

```

