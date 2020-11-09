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



```python3

```

