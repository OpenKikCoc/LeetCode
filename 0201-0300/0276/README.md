#  [276. 栅栏涂色](https://leetcode-cn.com/problems/paint-fence/)

## 题意



## 题解



```c++
class Solution {
public:
    const static int N = 55, M = 1e5 + 10;

    int f[N][M][2];

    int numWays(int n, int k) {
        memset(f, 0, sizeof f);
        
        f[0][0][1] = 1;
        int s = 1;        
        for (int i = 1; i <= n; ++ i ) {
            int t = 0;
            for (int j = 1; j <= k; ++ j ) {
                // 颜色不同的所有
                f[i][j][0] = s - f[i - 1][j][0] - f[i - 1][j][1];
                // 上一个和本个颜色相同
                f[i][j][1] = f[i - 1][j][0];

                t += f[i][j][0] + f[i][j][1];
            }
            s = t;
        }
        return s;
    }
};
```

对于本题条件较简单，可以优化滚动数组至常量 略



```python3

```

