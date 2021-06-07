#  [238. 除自身以外数组的乘积](https://leetcode-cn.com/problems/product-of-array-except-self/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        int l = 1, r = 1;
        for(int i = 0; i < n; ++i) {
            res[i] *= l;
            l *= nums[i];
            res[n-i-1] *= r;
            r *= nums[n-i-1];
        }
        return res;
    }
};
```



```python
# 前后缀分离的思想: 预处理一个前缀的乘积，再预处理一个后缀的乘积
# 
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        p = [1] * n
        for i in range(1, n):
            p[i] = p[i - 1] * nums[i - 1]
        s = 1
        for i in range(n - 1, -1, -1):
            p[i] *= s 
            s *= nums[i]
        return p
```

