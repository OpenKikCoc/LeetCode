#  [375. 猜数字大小 II](https://leetcode-cn.com/problems/guess-number-higher-or-lower-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    const int inf = 1e9;
    int getMoneyAmount(int n) {
        int res = 0;
        vector<vector<int>> f(n + 1, vector<int>(n + 1, inf));
        for (int i = 0; i <= n; ++i) f[i][i] = 0;
        for (int len = 2; len <= n; ++ len ) {
            for (int l = 1; l + len - 1 <= n; ++ l ) {
                int r = l + len - 1;
                // 使用这种写法而非：
                // f[i][j] = INT_MAX;
                // for (int k = i; k <= j; k ++ )
                //     f[i][j] = min(f[i][j], max(f[i][k - 1], f[k + 1][j]) + k);
                // 的好处：不需要数组开到n+2 且 也还算清晰
                f[l][r] = min(l + f[l + 1][r], r + f[l][r - 1]);
                for (int k = l + 1; k < r; ++ k )
                    f[l][r] = min(f[l][r], k + max(f[l][k - 1], f[k + 1][r]));
            }
        }
        return f[1][n];
    }
};
```

```c++
class Solution {
public:
    int getMoneyAmount(int n) {
        vector<vector<int>> f(n + 2, vector<int>(n + 2));
        for (int len = 2; len <= n; len ++ )
            for (int i = 1; i + len - 1 <= n; i ++ ) {
                int j = i + len - 1;
                f[i][j] = INT_MAX;
                for (int k = i; k <= j; k ++ )
                    f[i][j] = min(f[i][j], max(f[i][k - 1], f[k + 1][j]) + k);
            }
        return f[1][n];
    }
};
```


```python3

```

