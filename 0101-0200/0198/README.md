#  [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)

## 题意



## 题解



```c++
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        int st = 0, no = 0;
        for(int i = 0; i < n; ++i) {
            int a = st, b = no;
            st = b + nums[i];
            no = max(a, b);
        }
        return max(st, no);
    }
};
```



```python
# 正常dp思维：f[i]: 前i天 可以最多赚到多少钱；
# 1. 第i天不偷，那就是f[i-1] ；2. 第i天偷，那就只能i-2天偷！

class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        f = [0] * (n + 1)
        for i in range(1, n + 1):
            f[i] = max(f[i-1], f[i-2] + nums[i-1])
        return f[n]
      
# 状态机dp解法
#  f(i) 表示考虑了前 ii 个房间，且盗窃了第 i 个房间所能得到的最大收益，g(i) 表示不盗窃第 i 个房间所能得到的最大收益
# f[i]：表示在第i家偷，那i-1家就不能偷，f[i] = g[i-1] + nums[i-1]
# g[i]: 表示不偷第i家，那i-1家也是可偷可不偷, g[i] = max(g[i-1], f[i-1])
class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        f = [0] * (n + 1); g = [0] * (n + 1)
        # f[1] = nums[0]  
        for i in range(1, n + 1): # 由于没有直接初始化特判别f[1] = nums[0] 所以 这里需要从1开始计算
            f[i] = g[i-1] + nums[i-1]
            g[i] = max(f[i-1], g[i-1])
        return max(f[n], g[n])

      
# 状态机dp解法      
class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        f = [0] * (n + 1); g =[0] * (n + 1)
        f[1] = nums[0]
        for i in range(2, n + 1): 
            f[i] = g[i - 1] + nums[i - 1]
            g[i] = max(f[i - 1], g[i -1])
        return max(f[n], g[n])

```

