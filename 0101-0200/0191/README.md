#  [191. 位1的个数](https://leetcode-cn.com/problems/number-of-1-bits/)

## 题意



## 题解



```c++
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int res = 0;
        while(n) ++res, n &= (n-1);
        return res;
    }
};
```



```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        def lowbit(n):
            return n & (-n)
        cnt = 0
        if n < 0:
            n = n & 0xffffffff
        while n:
            n -= lowbit(n)
            cnt += 1
        return cnt
```

