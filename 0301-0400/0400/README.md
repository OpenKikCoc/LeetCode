#  [400. 第N个数字](https://leetcode-cn.com/problems/nth-digit/)

## 题意



## 题解



```c++
class Solution {
public:

    int findNthDigit(int n) {
        long long k = 1, t = 9, s = 1;
        while (n > k * t) {
            n -= k * t;
            k ++, t *= 10, s *= 10;
        }
        // s + [n/k] 向上取整
        s += (n + k - 1) / k - 1;
        n = n % k ? n % k : k;
        return to_string(s)[n - 1] - '0';
    }

    int findNthDigit_2(int n) {
        int base = 1;
        while (n > 9*pow(10, base - 1) * base) {
            n -= 9 * pow(10, base - 1) * base;
            ++ base ;
        }
        int value = pow(10, base - 1) + n / base;
        int mod = n % base;
        if (mod) return value / (int)pow(10, base - mod) % 10;
        return (value - 1) % 10;
    }
};
```



```python3

```

