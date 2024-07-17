#  [191. 位1的个数](https://leetcode.cn/problems/number-of-1-bits/)

## 题意



## 题解



```c++
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int res = 0;
        while (n) n &= (n - 1), res ++ ;
        return res;
    }
};

class Solution {
public:
    int hammingWeight(uint32_t n) {
        int res = 0;
        while (n) n -= n & -n, res ++ ;
        return res;
    }
};
```



```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        def lowbit(x):
            return x & (-x)

        cnt = 0
        if n < 0:
            n = n & (1 << 32 - 1)
        while n:
            n -= lowbit(n)
            cnt += 1
        return cnt
```

