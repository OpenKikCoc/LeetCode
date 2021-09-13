#  [136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for (auto v : nums) res ^= v;
        return res;
    }
};
```



```python
# 1 ^ 1 = 0; 0 ^ 0 = 0; 1 ^ 0 = 1; 0 ^ 1 = 1
# 两个相同的数字异或值为0 所以res初始化为0 对结果不会产生影响

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        res = 0
        for x in nums:
            res ^= x 
        return res
```

