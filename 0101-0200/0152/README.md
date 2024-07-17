#  [152. 乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size();
        int fmin = 1, fmax = 1, res = INT_MIN;
        for (int i = 1; i <= n; ++ i ) {
            int a = fmax, b = fmin;
            fmax = max(nums[i - 1], max(a * nums[i - 1], b * nums[i - 1]));
            fmin = min(nums[i - 1], min(a * nums[i - 1], b * nums[i - 1]));
            res = max(res, fmax);
        }
        return res;
    }
};

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int res = nums[0];
        int f = nums[0], g = nums[0];
        for (int i = 1; i < nums.size(); i ++ ) {
            int a = nums[i], fa = f * a, ga = g * a;
            f = max(a, max(fa, ga));
            g = min(a, min(fa, ga));
            res = max(res, f);
        }
        return res;
    }
};
```



```python
# 核心思想：记录当前的最大值 和 最小值
# 如果遇到负数，当前的最大值会变成最小值，最小值会变成最大值。
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        n = len(nums)
        if not nums:return 0
        maxv, minv, res = nums[0], nums[0], nums[0]
        for i in range(1, n):
            mx, mn = maxv, minv
            maxv = max(nums[i], max(nums[i] * mx, nums[i] * mn))  # 如果mx和mn为0，那么此时最大值为nums[i] 
            minv = min(nums[i], min(nums[i] * mx, nums[i] * mn))
            res = max(maxv, res)
        return res
```

