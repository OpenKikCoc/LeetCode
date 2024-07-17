#  [790. 多米诺和托米诺平铺](https://leetcode.cn/problems/domino-and-tromino-tiling/)

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



**思路**

经典线性 dp

1. 状态表示：

   $f(i, 0)$ 表示前$i-1$列已经铺满了，第$i$列还没有瓷砖的方案数；

   $f(i, 1)$ 表示前$i-1$列已经铺满了，第$i$列只有第一行有瓷砖的方案数；

   $f(i, 2)$ 表示前$i-1$列已经铺满了，第$i$列只有第二行有瓷砖的方案数；

   $f(i, 3)$ 表示前$i-1$列已经铺满了，第$i$列两行都有瓷砖的方案数；

2. 状态转移：

   对于$f(i, 0)$ ，只能从$f(i-1, 3)$ 转化过来，因为要保证前$i-1$列都是满的才可以转移；

   对于$f(i, 1)$ ，能从$f(i-1, 0)$ ，$f(i-1, 2)$转化过来；

   对于$f(i, 2)$ ，能从$f(i-1, 0)$ ，$f(i-1, 1)$转化过来；

   对于$f(i, 3)$ ，能从$f(i-1, 0)$ ，$f(i-1, 1)$，$f(i-1, 2)$， $f(i-1, 3)$转化过来；

3. 初始化

   $f(0, 0)=1$, $f(0, 3)=1$. 只有这两种状态各有一种铺法，其他的都是0

   最终返回的答案是：$f(n-1, 3)$

```python
class Solution:
    def numTilings(self, n: int) -> int:
        mod = 10 ** 9 + 7
        f = [[0] * 4 for _ in range(n + 1)]
        f[0][0] = 1
        f[0][3] = 1
        
        for i in range(1, n + 1):
            f[i][0] = f[i - 1][3]
            f[i][1] = (f[i - 1][0] + f[i - 1][2]) % mod
            f[i][2] = (f[i - 1][0] + f[i - 1][1]) % mod
            f[i][3] = (f[i - 1][0] + f[i - 1][1] + f[i - 1][2] + f[i - 1][3]) % mod 
        return f[n - 1][3]
```

