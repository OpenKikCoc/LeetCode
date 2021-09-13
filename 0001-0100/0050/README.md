#  [50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)

## 题意



## 题解

```c++
class Solution {
public:
    double myPow(double x, int n) {
        typedef long long LL;
        bool is_minus = n < 0;
        double res = 1;
        for (LL k = abs(LL(n)); k; k >>= 1) {
            if (k & 1) res *= x;
            x *= x;
        }
        if (is_minus) res = 1 / res;
        return res;
    }
};
```



```c++
class Solution {
public:
    double myPow(double x, int N) {
        long n = N;
        if (n < 0) {
            n = -n;
            x = 1 / x;
        }
        double res = 1;
        while (n) {
            if (n & 1) res = res * x;
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
        def fastPow(a, b):
            res = 1
            while b:
                if b & 1:
                    res *= a
                b >>= 1
                a *= a
            return res

        if x == 0:return 0
        if n < 0:
            x, n = 1/x, -n
        return fastPow(x, n)
```

