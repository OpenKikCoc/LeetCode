#  [793. 阶乘函数后 K 个零](https://leetcode-cn.com/problems/preimage-size-of-factorial-zeroes-function/)

## 题意



## 题解



```c++
class Solution {
public:
    using LL = long long;

    LL f(LL x) {
        LL tot = 0;
        while (x)
            tot += x / 5, x /= 5;
        return tot;
    }

    int calc(int k) {
        if (k < 0)
            return 0;
        LL l = 0, r = 1e18;
        while (l < r) {
            LL m = (l + r) >> 1;
            // 求第一个大于k的
            if (f(m) <= k)
                l = m + 1;
            else
                r = m;
        }
        return (int)l;
    }

    int preimageSizeFZF(int k) {
        return calc(k) - calc(k - 1);
    }
};
```



```python3

```

