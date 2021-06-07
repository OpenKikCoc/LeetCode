#  [69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)

## 题意



## 题解



```c++
// 牛顿迭代
class Solution {
public:
    int mySqrt(int x) {
        if (x == 0) return 0;
        double C = x, x0 = x;
        while (true) {
            double xi = 0.5 * (x0 + C / x0);
            if (fabs(x0 - xi) < 1e-7) {
                break;
            }
            x0 = xi;
        }
        return int(x0);
    }
};

// 二分略
```



```python
class Solution:
    def mySqrt(self, x: int) -> int:
      	if x == 0 or x == 1:return x   # 特殊case判断
        l, r = 0, x
        while l < r:
            m = l + (r - l)//2
            if m * m <= x:
                l = m + 1 
            else:
                r = m 
        return l - 1
```

