#  [190. 颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)

## 题意



## 题解



```c++
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        int res = 0;
        for(int i = 0; i < 32; ++i)
            res = (res << 1) + (n >> i & 1);
        return res;
    }
};
```



```python3

```

