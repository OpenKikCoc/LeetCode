#  [190. 颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)

## 题意



## 题解



```c++
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        int res = 0;
        for (int i = 0; i < 32; ++ i )
            res = (res << 1) + (n >> i & 1);
        return res;
    }
};
```



```python
# 使用位运算 n >> i & 1 可以取出 n 的第 i 位二进制数。我们从小到大依次取出 n 的所有二进制位，然后逆序累加到另一个无符号整数中。
class Solution:
    def reverseBits(self, n: int) -> int:
        res = 0
        for i in range(32):
            res = (res << 1) + (n >> i & 1)
            # res = (res * 2) + (n >> i & 1)
        return res
```

