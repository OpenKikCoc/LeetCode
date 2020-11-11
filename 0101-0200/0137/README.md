#  [137. 只出现一次的数字 II](https://leetcode-cn.com/problems/single-number-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for(int i = 0; i < 32; ++i) {
            int p = 1 << i;
            int c = 0;
            for(auto v : nums) if(v & p) ++c;
            if(c % 3) res |= p;
        }
        return res;
    }
};
```



```python3

```

