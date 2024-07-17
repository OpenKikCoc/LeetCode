#  [397. 整数替换](https://leetcode.cn/problems/integer-replacement/)

## 题意



## 题解



```c++
class Solution {
public:
    typedef long long LL;
    unordered_map<LL, int> f;
    int dp(LL x) {
        if (f.count(x)) return f[x];
        if (x % 2 == 0) return f[x] = dp(x / 2) + 1;
        return f[x] = min(dp(x + 1), dp(x - 1)) + 1;
    }

    int integerReplacement(int n) {
        f[1] = 0;
        return dp(n);
    }
};
```



```python3

```

