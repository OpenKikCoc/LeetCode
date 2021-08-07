#  [461. 汉明距离](https://leetcode-cn.com/problems/hamming-distance/)

## 题意



## 题解



```c++
class Solution {
public:
    int hammingDistance(int x, int y) {
        int v = x ^ y, res = 0;
        while (v) v = v & (v - 1), ++ res;
        return res;
    }
};


// yxc
class Solution {
public:
    int hammingDistance(int x, int y) {
        int res = 0;
        while (x || y) {
            res += (x & 1) ^ (y & 1);
            x >>= 1, y >>= 1;
        }
        return res;
    }
};
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

