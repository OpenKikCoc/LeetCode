#  [628. 三个数的最大乘积](https://leetcode-cn.com/problems/maximum-product-of-three-numbers/)

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



```python3

```

