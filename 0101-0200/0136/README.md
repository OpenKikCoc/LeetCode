#  [136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for(auto v : nums) res ^= v;
        return res;
    }
};
```



```python3

```

