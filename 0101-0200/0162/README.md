#  [162. 寻找峰值](https://leetcode-cn.com/problems/find-peak-element/)

## 题意



## 题解



```c++
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int n = nums.size();
        int l = 0, r = n-1;
        while(l < r) {
            int mid = l + (r-l)/2;
            if(nums[mid] < nums[mid+1]) l = mid+1;
            else r = mid;
        }
        return l;
    }
};
```



```python
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        n = len(nums)
        l, r = 0, n
        while l < r:
            m = l + (r - l) // 2 
            if m + 1 < len(nums) and nums[m] < nums[m+1]:
                l = m + 1 
            else:
                r = m 
        return l 
      
      
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        n = len(nums)
        l, r = 0, n - 1 
        while l < r:
            m = l + (r - l) // 2 
            if nums[m] < nums[m+1]:
                l = m + 1 
            else:
                r = m 
        return l       
```

