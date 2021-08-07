#  [483. 最小好进制](https://leetcode-cn.com/problems/smallest-good-base/)

## 题意



## 题解

1.  假设进制为 k ，所有数位都是 1 且共有 t 位时，表示的数在十进制下为 `k^0 + k^1 + k^2 + … + k^t−1`。

2.  显然 t 越大，可能的 k 就会越小。由于 n 最大为 10^18，所以我们可以从 1+⌈logn⌉ 开始向下枚举 t。最坏情况下，t==2 时必定存在k=n−1 满足条件，故枚举的下界为 3。

3.  定 t 后，计算一个待验证的 k=⌊t-1√n⌋。

4.  验证这一对 k 和 t 是否合法。

```c++
class Solution {
public:
    typedef long long LL;
    string smallestGoodBase(string ns) {
        LL n = stoll(ns);
        for (int t = log2(n) + 1; t >= 3; -- t ) {
            LL k = pow(n, 1.0 / (t - 1));
            LL r = 0;
            for (int i = 0; i < t; ++ i ) r = r * k + 1;
            if (r == n) return to_string(k);
        }
        return to_string(n - 1);
    }
};
```



```python3

```

