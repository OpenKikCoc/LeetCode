#  [790. 多米诺和托米诺平铺](https://leetcode-cn.com/problems/domino-and-tromino-tiling/)

## 题意



## 题解



```c++
// 递推
class Solution {
public:
    const int MOD = 1e9 + 7;

    int numTilings(int n) {
        vector<vector<int>> f(n, vector<int>(4, 0));
        f[0][0] = 1;
        f[0][3] = 1;

        for (int i = 1; i < n; ++ i ) {
            f[i][0] = f[i - 1][3];
            f[i][1] = (f[i - 1][0] + f[i - 1][2]) % MOD;
            f[i][2] = (f[i - 1][0] + f[i - 1][1]) % MOD;
            f[i][3] = ((( f[i - 1][0]
                        + f[i - 1][1]) % MOD
                        + f[i - 1][2]) % MOD
                        + f[i - 1][3]) % MOD;
        }
        return f[n - 1][3];
    }
};

// 快速幂
class Solution {
public:
    int numTilings(int n) {
        const int MOD = 1e9 + 7;
        int w[4][4] = {
            {1, 1, 1, 1},
            {0, 0, 1, 1},
            {0, 1, 0, 1},
            {1, 0, 0, 0}
        };
        vector<vector<int>> f(n + 1, vector<int>(4));
        f[0][0] = 1;
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < 4; j ++ )
                for (int k = 0; k < 4; k ++ )
                    f[i + 1][k] = (f[i + 1][k] + f[i][j] * w[j][k]) % MOD;
        return f[n][0];
    }
};
```



```python3

```

