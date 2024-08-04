## [比赛链接](https://leetcode.cn/contest/biweekly-contest-129/)


### [3127. 构造相同颜色的正方形](https://leetcode.cn/problems/make-a-square-with-the-same-color/)



```c++
class Solution {
public:
    int dx[4] = {-1, -1, 0, 0}, dy[4] = {-1, 0, -1, 0};
    
    bool canMakeSquare(vector<vector<char>>& grid) {
        int n = grid.size(), m = grid[0].size();
        for (int i = 1; i < n; ++ i )
            for (int j = 1; j < m; ++ j ) {
                int w = 0, b = 0;
                for (int k = 0; k < 4; ++ k )
                    if (grid[i + dx[k]][j + dy[k]] == 'B')
                        b ++ ;
                    else
                        w ++ ;
                if (w >= 3 || b >= 3)
                    return true;
            }
        return false;
    }
};
```


### [3128. 直角三角形](https://leetcode.cn/problems/right-triangles/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1010;
    
    vector<int> xs[N], ys[N];
    
    long long numberOfRightTriangles(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (grid[i][j])
                    xs[i].push_back(j), ys[j].push_back(i);
        
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            int sz = xs[i].size();
            for (int j = 0; j < sz; ++ j ) {
                int y = xs[i][j];
                res += LL(sz - 1) * (ys[y].size() - 1);
            }
        }
        return res;
    }
};
```

### [3129. 找出所有稳定的二进制数组 I](https://leetcode.cn/problems/find-all-possible-stable-binary-arrays-i/)

DP 状态定义与转移

关于状态定义: 合理压掉无用的一个维度

```c++
const static int N = 410, M = 210, MOD = 1e9 + 7;

// int f[N][M][M][2]; // f[i][j][k] 长度为i 使用0总数为j 最后一段连续长度为k 最后一段为0/1 的方案总数
// => 没有必要记录最后一段的长度 因为是整段整段考虑 不需要关心上一次用了多少
int f[N][M][2]; // f[i][j][k] 长度为i 使用0总数为j 最后一段为0/1 的方案总数

class Solution {
public:
    // 题意转换: 长度不超过limit的不包含连续 1/0
    //          求方案数 显然dp
    
    int numberOfStableArrays(int zero, int one, int limit) {
        int n = zero + one;
        
        memset(f, 0, sizeof f);
        f[0][0][0] = f[0][0][1] = 1;
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 0; j <= zero; ++ j )
                for (int k = 1; k <= limit; ++ k ) {
                    // 0
                    {
                        if (i >= k && j >= k)
                            f[i][j][0] = (f[i][j][0] + f[i - k][j - k][1]) % MOD;
                    }
                    // 1
                    {
                        if (i >= k)
                            f[i][j][1] = (f[i][j][1] + f[i - k][j][0]) % MOD;
                    }
                }
        
        int res = (f[n][zero][0] + f[n][zero][1]) % MOD;
        return res;
    }
};
```

### [3130. 找出所有稳定的二进制数组 II](https://leetcode.cn/problems/find-all-possible-stable-binary-arrays-ii/)

暴力优化 DP

前缀和思想维护 f 数组

加快速度

```c++
// ATTENTION 数组放全局避免 stack-overflow
const static int N = 2010, M = 1010, MOD = 1e9 + 7;

int f[N][M][2]; // f[i][j] 表示长度为i zero共有j个 最后一个是0/1的方案总数
// 考虑状态转移:
//  f[i][j][0] = sum(f[i - k][j - k][1])
//  f[i][j][1] = sum(f[i - k][j][0])
//  其中 1<=k<=limit
//
// 考虑针对 f[i-k][j-k], f[i-k][j] 做前缀和维护

int s0[N + M][M], s1[N + M][M];  // ATTENTION WA: 第一维设置为 N+M 避免i-j+M越界

class Solution {
public:
    int numberOfStableArrays(int zero, int one, int limit) {
        int n = zero + one;
        
        memset(f, 0, sizeof f);
        f[0][0][0] = f[0][0][1] = 1;
        s0[0][0] = 1, s1[0 - 0 + M][0] = 1;
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 0; j <= zero; ++ j ) {
                s0[i][j] = s0[i - 1][j];
                s1[i - j + M][j] = j ? s1[i - j + M][j - 1] : 0;
                // 0
                {
                    int d = i - j + M;
                    f[i][j][0] = ((s1[d][j] - ((j - limit - 1) >= 0 ? s1[d][j - limit - 1] : 0)) % MOD + MOD) % MOD;
                }
                // 1
                {
                    f[i][j][1] = ((s0[i][j] - ((i - limit - 1) >= 0 ? s0[i - limit - 1][j] : 0)) % MOD + MOD) % MOD;
                }
                
                s0[i][j] = (s0[i][j] + f[i][j][0]) % MOD;
                s1[i - j + M][j] = (s1[i - j + M][j] + f[i][j][1]) % MOD;
            }
        
        return (f[n][zero][0] + f[n][zero][1]) % MOD;
    }
};
```

另一种更好维护的状态定义: zero/one 分别使用了多少

```c++
const static int N = 2010, M = 1010, MOD = 1e9 + 7;

int f[M][M][2]; // f[i][j] 表示 zero/one 分别有 i,j 个
// f[i][j][0] = sum(f[i - k][j][1])
// f[i][j][1] = sum(f[i][j - k][0])

int s0[M][M], s1[M][M];

class Solution {
public:
    int numberOfStableArrays(int zero, int one, int limit) {
        memset(f, 0, sizeof f);

        for (int i = 0; i <= zero; ++ i )
            for (int j = 0; j <= one; ++ j ) {
                if (!i && !j) {
                    f[0][0][0] = f[0][0][1] = 1;
                    s0[0][0] = s1[0][0] = 1;
                    continue;
                }
                s0[i][j] = j ? s0[i][j - 1] : 0;
                s1[i][j] = i ? s1[i - 1][j] : 0;

                f[i][j][0] = ((s1[i][j] - (i - limit - 1 >= 0 ? s1[i - limit - 1][j] : 0)) % MOD + MOD) % MOD;
                f[i][j][1] = ((s0[i][j] - (j - limit - 1 >= 0 ? s0[i][j - limit - 1] : 0)) % MOD + MOD) % MOD;

                s0[i][j] = (s0[i][j] + f[i][j][0]) % MOD;
                s1[i][j] = (s1[i][j] + f[i][j][1]) % MOD;
            }
        
        return (f[zero][one][0] + f[zero][one][1]) % MOD;
    }
};
```

