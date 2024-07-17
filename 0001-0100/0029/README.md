#  [29. 两数相除](https://leetcode.cn/problems/divide-two-integers/)

## 题意



## 题解


```c++
class Solution {
public:
    int divide(int x, int y) {
        // ATTENTION 最小剪枝
        if (x == INT_MIN && y == -1)
            return INT_MAX;

        bool is_minus = false;
        if (x < 0 && y > 0 || x > 0 && y < 0) is_minus = true;
        int a = x < 0 ? x : -x, b = y < 0 ? y : -y;

        vector<int> exp;
        // for (int i = b; i >= a; i = i + i) exp.push_back(i);
        for (int i = b; i >= a; i = i + i) {
            exp.push_back(i);
            if (i < a / 2)  // ATTENTION: pre check to void runtime error
                break;
        }

        int res = 0;
        for (int i = exp.size() - 1; i >= 0; i -- )
            if (a <= exp[i]) {
                a -= exp[i];    // 负数 所以同样要减
                res += 1ll << i;
            }

        if (is_minus) {
            if (res == INT_MIN)
                return INT_MIN; // ATTENTION 细节 意味着 INT_MIN/1
            return -res;
        }
        return res;
    }
};
```


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



```python
"""
这道题：除数能减去多少个被除数。
1. 采用倍增的思想
2. 先确定商的符号，然后把被除数和除数通通转为正数
3. 然后用被除数不停的减除数，直到小于除数的时候，用一个计数遍历记录总共减了多少次，即为商了。
"""
class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        sign = (dividend < 0) != (divisor < 0) 
        dividend, divisor = abs(dividend), abs(divisor)
        res = 0
        tmp = divisor
        i = 1
        while dividend >= divisor:
            i = 1
            tmp = divisor
            while dividend >= tmp:
                dividend -= tmp
                tmp += tmp
                res += i
                # 代表有几个 dividend 
                i += i   
           
"""
           while divd >= tmp:
                divd -= tmp
                res += i
                i <<= 1
                tmp <<= 1
"""

        return min(2**31-1, max(-res if sign else res, -2**31))
```

