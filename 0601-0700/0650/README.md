#  [650. 只有两个键的键盘](https://leetcode.cn/problems/2-keys-keyboard/)

## 题意



## 题解



```c++
class Solution {
public:
    // 约数做法
    // [122...22] [122....22] ... 操作分解
    // n = p1 * p2 * ... * pn 
    // res = p1 + p2 + ... + pn
    int minSteps_2(int n) {
        int res = 0;
        for (int i = 2; i <= n / i; ++ i )
            while (n % i == 0)
                res += i, n /= i;
        if (n > 1) res += n;
        return res;
    }

    int minSteps(int n) {
        vector<int> f(n + 1, INT_MAX);
        f[1] = 0;
        for (int i = 2; i <= n; ++ i )
            if (n % i == 0)
                // 枚举约数
                for (int j = 1; j * j <= n; ++ j )
                    if (i % j == 0) {
                        f[i] = min(f[i], f[j] + i / j);
                        f[i] = min(f[i], f[i / j] + j);
                    }
        return f[n];
    }
};
```



```python3

```

