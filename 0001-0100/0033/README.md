#  [33. 搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)

## 题意



## 题解

更好的写法

```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int n = nums.size();
        // 统一风格 和右端点比较
        int l = 0, r = n - 1;
        while (l < r) {
            int m = l + r >> 1;
            if (nums[m] < nums[r]) {
                if (target > nums[m] && target <= nums[r])
                    l = m + 1;
                else
                    r = m;
            } else if (nums[m] > nums[r]) {
                if (target > nums[m] || target <= nums[r])
                    l = m + 1;
                else
                    r = m;
            }
            // else
        }
        return target == nums[l] ? l : -1;
    }
};
```

```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int n = nums.size();
        int l = 0, r = n;
        while (l < r) {
            int m = l + r >> 1;
            if (nums[m] >= nums[l] && (target < nums[l] || target > nums[m]))
                l = m + 1;
            else if (nums[m] <= nums[l] && (target < nums[l] && target > nums[m]))
                l = m + 1;
            else
                r = m;
        }
        return l < n && nums[l] == target ? l : -1;
    }
};
```

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



```python
# 遇到旋转数组的题目（依旧用二分）
# 1. 右端点r == n - 1(普通的二分r == n)
# 2. 中点既可以和左端点对比，也可以和右端点对比。但是推荐所有旋转有序数组的题 都用mid 和 r 进行对比

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        n = len(nums)
        if not n:return -1
        l, r = 0, n - 1
        while l < r:
            m = l + (r - l) // 2
            if nums[m] > nums[r] and (target > nums[m] or target <= nums[r]):
                l = m + 1
            elif nums[m] < nums[r] and nums[m] < target <= num[r]:
                l = m + 1
            else:
                r = m 
        return l if nums[l] == target else -1
```

