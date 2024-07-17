#  [53. 最大子序和](https://leetcode.cn/problems/maximum-subarray/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int sum = 0, res = INT_MIN;
        for (auto & v : nums) {
            sum = max(sum, 0) + v;
            res = max(res, sum);
        }
        return res;
    }
};
```



```python
# dp常规写法
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        n = len(nums)
        f = [float("-inf")] * (n + 1)
        f[1] = nums[0]  # 初始值 
        for i in range(2, n + 1):
            f[i] = max(f[i-1] + nums[i-1], nums[i-1])
        return max(f)
      
# 简单写法
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        sumn = 0   # sumn表示前 i-1 个数的和
        res = float('-inf')   # res表示列表中最大的子序和
        for c in nums: 
            sumn = max(sumn, 0) + c
            res = max(res, sumn)
        return res 
      	
```

