#  [343. 整数拆分](https://leetcode.cn/problems/integer-break/)

## 题意



## 题解



```c++
class Solution {
public:
    int integerBreak(int n) {
        if (n < 3) return 1;
        else if (n == 3) return 2;
        int res = 1;
        if (n % 3 == 1) n -= 4, res *= 4;
        while (n >= 3) n -= 3, res *= 3;
        if (n) res *= n;
        return res;
    }
};
```

```c++
class Solution {
public:
    int integerBreak(int n) {
        if (n <= 3) return 1 * (n - 1);
        int p = 1;
        while (n >= 5) n -= 3, p *= 3;
        return p * n;
    }
};
```


```python3

```

