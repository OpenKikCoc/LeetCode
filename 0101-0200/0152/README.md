#  [152. 乘积最大子数组](https://leetcode-cn.com/problems/maximum-product-subarray/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size();
        int fmin = 1, fmax = 1, res = INT_MIN;
        for(int i = 1; i <= n; ++i) {
            int a = fmax, b = fmin;
            fmax = max(nums[i-1], max(a*nums[i-1], b*nums[i-1]));
            fmin = min(nums[i-1], min(a*nums[i-1], b*nums[i-1]));
            res = max(res, fmax);
        }
        return res;
    }
};
```



```python3

```

