#  [276. 栅栏涂色](https://leetcode.cn/problems/paint-fence/)

## 题意



## 题解



```c++
// 对于本题条件较简单，可以优化滚动数组至常量 略
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

-   优化1: 无需讨论某个具体的颜色 直接标识与上一个是否相同

    ```c++
    class Solution {
    public:
        const static int N = 55, M = 1e5 + 10;
    
        // f[i][0] 和前一个不一样 f[i][1] 和前一个一样
        int f[N][2];
    
        int numWays(int n, int k) {
            memset(f, 0, sizeof f);
    
            f[1][0] = k, f[1][1] = 0;
            for (int i = 2; i <= n; ++ i ) {
                f[i][0] = (f[i - 1][0] + f[i - 1][1]) * (k - 1);
                f[i][1] = f[i - 1][0];
            }
            
            return f[n][0] + f[n][1];
        }
    };
    ```

    做法可优化常量

-   优化2: 更进一步

    -   第 n 个栅栏如果和上一个不同颜色，则有 `f[i-1] * (k-1)` 个方案数
    -   第 n 个栅栏如果和上一个同颜色，那么上一个和前一个就不能同颜色，则有 `f[i-2] * (k-1)`
    -   第 n 个栅栏上色方案数合计：`f[i-1] * (k-1) + f[i-2] * (k-1)`

    ```c++
    class Solution {
    public:
        const static int N = 55, M = 1e5 + 10;
    
        int f[N];
    
        int numWays(int n, int k) {
            memset(f, 0, sizeof f);
    
            f[1] = k, f[2] = k * k;
            for (int i = 3; i <= n; ++ i )
                //          颜色不同       +       颜色相同
                f[i] = f[i - 1] * (k - 1) + f[i - 2] * (k - 1);
            return f[n];
        }
    };
    ```

    该做法显然也可以常量优化 略



```python3

```





## 拓展 环形涂色问题

![环形结构](https://pic4.zhimg.com/80/v2-5966a5d3aabeb2c1e7e9ba2c3a82de40_1440w.jpg)



相应的，有 `f[n] = k * (k- 1) ^ (n - 1) - f[n - 1]`  因此直接递推即可求得结果
