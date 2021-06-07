#  [461. 汉明距离](https://leetcode-cn.com/problems/hamming-distance/)

## 题意



## 题解



```c++

```



```python
# 简单的位运算
class Solution:
    def hammingDistance(self, x: int, y: int) -> int:
        res = 0
        while x or y:
            res += (x & 1) ^ (y & 1)
            x >>= 1
            y >>= 1
        return res 
```

