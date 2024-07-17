#  [629. K个逆序对数组](https://leetcode.cn/problems/k-inverse-pairs-array/)

## 题意



## 题解



```c++
class Solution {
public:
    const int mod = 1e9 + 7;
    int kInversePairs(int n, int k) {
        // 用了前i个数字 产生了j个逆序对的方案数
        vector<vector<int>> f(n + 1, vector<int>(k + 1));
        f[1][0] = 1;
        // f[i][j] = f[i-1][j] + f[i-1][j-1] + ... + f[i-1][j-(i-1)]
        for (int i = 2; i <= n; ++ i ) {
            long long s = 0;
            for (int j = 0; j <= k; ++ j ) {
                s += f[i - 1][j];
                if (j - i >= 0) s -= f[i - 1][j - i];
                f[i][j] = s % mod;
            }
        }
        return (f[n][k] + mod) % mod;
    }
};
```



```python3

```

