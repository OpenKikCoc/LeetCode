#  [29. 两数相除](https://leetcode-cn.com/problems/divide-two-integers/)

## 题意



## 题解



```c++
class Solution {
public:
    int divide(int dividend, int divisor) {
        if (divisor == 1) return dividend;
        else if (divisor == -1) {
            if (dividend == INT_MIN) return INT_MAX;
            else return -dividend;
        }
        int sign = 1;
        // 或使用异或判断符号
        if ((dividend > 0 && divisor < 0) || (dividend < 0 && divisor > 0)) sign = -1;
        // 都转成负数 处理溢出
        if (dividend > 0) dividend = -dividend;
        if (divisor > 0) divisor = -divisor;
        if (dividend > divisor) return 0;
        int cnt = 0;
        int a = dividend;
        // 此时是负数
        while (a <= divisor) {
            int b = divisor, p = 1;
            while (b > INT_MIN - b && a <= b + b) {
                b += b;
                p += p;
            }
            cnt += p;
            a -= b;
        }
        if (sign == -1) cnt = -cnt;
        return cnt;
    }
};
```



```c++
class Solution {
public:
    int divide(int x, int y) {
        typedef long long LL;
        vector<LL> exp;
        bool is_minus = false;
        if (x < 0 && y > 0 || x > 0 && y < 0) is_minus = true;

        LL a = abs((LL)x), b = abs((LL)y);
        for (LL i = b; i <= a; i = i + i) exp.push_back(i);

        LL res = 0;
        for (int i = exp.size() - 1; i >= 0; i -- )
            if (a >= exp[i]) {
                a -= exp[i];
                res += 1ll << i;
            }

        if (is_minus) res = -res;

        if (res > INT_MAX || res < INT_MIN) res = INT_MAX;

        return res;
    }
};
```



```python3

```

