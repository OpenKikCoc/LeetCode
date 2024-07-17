#  [628. 三个数的最大乘积](https://leetcode.cn/problems/maximum-product-of-three-numbers/)

## 题意



## 题解



```c++
class Solution {
public:
    // - - +
    // + + +
    // - - -
    int maximumProduct(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        return max(nums[n - 2] * nums[n - 3] * nums[n - 1], nums[0] * nums[1] * nums[n - 1]);
    }
};
```



```python
# 原数组排序后共有两种情况：
# 1） 最小的两个数<0,乘上最大的数是最大值; 2） 最大的三个数乘积是最大值 ==> 所以两者取max即可。
class Solution:
    def maximumProduct(self, nums: List[int]) -> int:
        n = len(nums)
        nums.sort()    
        return max(nums[n-1] * nums[0] * nums[1], nums[n-1] * nums[n-2] * nums[n-3])
```

