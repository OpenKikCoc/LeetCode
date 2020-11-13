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



```python3

```

