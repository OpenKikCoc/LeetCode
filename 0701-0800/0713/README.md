#  [713. 乘积小于K的子数组](https://leetcode.cn/problems/subarray-product-less-than-k/)

## 题意



## 题解



```c++
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        int n = nums.size();
        int res = 0, s = 1;
        for (int l = 0, r = 0; r < n; ++ r ) {
            s *= nums[r];
            while (l <= r && s >= k)
                s /= nums[l ++ ];
            res += r - l + 1;
        }
        return res;
    }
};
```



```python3

```

