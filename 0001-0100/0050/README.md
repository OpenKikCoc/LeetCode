#  [50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)

## 题意



## 题解



```c++
class Solution {
public:
    double myPow(double x, int N) {
        long n = N;
        if(n < 0) {
            n = -n;
            x = 1/x;
        }
        double res = 1;
        while(n) {
            if(n&1) res = res * x;
            x *= x;
            n >>= 1;
        }
        return res;
    }
};
```



```python
# 快速幂算法
class Solution:
    def myPow(self, x: float, n: int) -> float:
        if x == 0:return 0
        res = 1
        if n < 0:
            x, n = 1 / x, -n
        while n:
            if n & 1:res *= x
            x *= x
            n >>= 1
        return res
```

