## [比赛链接](https://leetcode.cn/contest/weekly-contest-410/)

> virtual rank: 63 / 2987
>
> 20  0:33:09  0:02:19  0:06:18  0:21:17  0:28:09 1


###  [3248. 矩阵中的蛇](https://leetcode.cn/problems/snake-in-matrix/) 



```c++
class Solution {
public:
    int finalPositionOfSnake(int n, vector<string>& commands) {
        int x = 0, y = 0;
        for (auto & c : commands)
            if (c == "UP")
                x -- ;
            else if (c == "DOWN")
                x ++ ;
            else if (c == "LEFT")
                y -- ;
            else
                y ++ ;
        return x * n + y;
    }
};
```


###  [3249. 统计好节点的数目](https://leetcode.cn/problems/count-the-number-of-good-nodes/) 



```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int res;
    
    int dfs(int u, int pa) {
        unordered_set<int> S;
        int tot = 1;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            
            int t = dfs(j, u);
            S.insert(t);
            tot += t;
        }
        if (S.size() <= 1)
            res ++ ;
        return tot;
    }
    
    int countGoodNodes(vector<vector<int>>& edges) {
        init();
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            add(a, b), add(b, a);
        }
        
        this->res = 0;
        dfs(0, -1);
        return res;
    }
};
```

###  [3250. 单调数组对的数目 I](https://leetcode.cn/problems/find-the-count-of-monotonic-pairs-i/) 



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 2010, M = 55, MOD = 1e9 + 7;
    
    int f[N][M];
    // 假设对于第i个位置 分配给第一个数组的数值大小为j 则第二个数组为 s_i - j
    // f[i][j] = sum{f[i - 1][k]}  j>=k && (s_i-1 - k >= s_i - j)
    //                      => k <= j && k <= s_i-1 - s_i + j
    //                      伴随着j的枚举 和是单调递增的...
    
    void mod_add(int & a, int b) {
        a = ((LL)a + b) % MOD;
    }
    
    int countOfPairs(vector<int>& nums) {
        int n = nums.size();
        
        memset(f, 0, sizeof f);
        for (int j = 0; j <= nums[0]; ++ j )
            f[1][j] = 1;
        
        for (int i = 2; i <= n; ++ i ) {
            int s = nums[i - 1], s_last = nums[i - 2];
            
            // 枚举当前选择的 j
            for (int j = 0; j <= s; ++ j ) {
                // 求和过程可优化
                for (int k = 0; k <= j && k <= s_last - s + j; ++ k )
                    mod_add(f[i][j], f[i - 1][k]);
            }
        }
        
        int res = 0;
        for (int j = 0; j < M; ++ j )
            mod_add(res, f[n][j]);
        return res;
    }
};
```

###  [3251. 单调数组对的数目 II](https://leetcode.cn/problems/find-the-count-of-monotonic-pairs-ii/) 

标准的前缀和优化

M范围忘了改大 WA1

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 2010, M = 1010, MOD = 1e9 + 7;
    
    int f[N][M];
    // 假设对于第i个位置 分配给第一个数组的数值大小为j 则第二个数组为 s_i - j
    // f[i][j] = sum{f[i - 1][k]}  j>=k && (s_i-1 - k >= s_i - j)
    //                      => k <= j && k <= s_i-1 - s_i + j
    //                      伴随着j的枚举 和是单调递增的...
    
    void mod_add(int & a, int b) {
        a = ((LL)a + b) % MOD;
    }
    
    int countOfPairs(vector<int>& nums) {
        int n = nums.size();
        
        memset(f, 0, sizeof f);
        for (int j = 0; j <= nums[0]; ++ j )
            f[1][j] = 1;
        
        for (int i = 2; i <= n; ++ i ) {
            int s = nums[i - 1], s_last = nums[i - 2];
            
            // 枚举当前选择的 j
            int sum = 0, gap = max(0, s - s_last);
            for (int j = 0; j <= s; ++ j ) {
                // k <= j && k <= s_last - s + j
                // 那么对于一个具体的 j 来说，可以取的范围是 [0, min(j, j+s_last-s)]
                // 差值的 gap 是 s-s_last
                if (j - gap >= 0)
                    mod_add(sum, f[i - 1][j - gap]);
                f[i][j] = sum;
            }
        }
        
        int res = 0;
        for (int j = 0; j < M; ++ j )
            mod_add(res, f[n][j]);
        return res;
    }
};
```

TODO: revisit 整理组合数学做法

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 3010, MOD = 1e9 + 7;
    
    LL f[N], g[N];
    
    LL qpow(LL x, int y) {
        LL ret = 1;
        while (y) {
            if (y & 1)
                ret = ret * x % MOD;
            x = x * x % MOD;
            y >>= 1;
        }
        return ret;
    }
    
    void init() {
        f[0] = g[0] = 1;
        for (int i = 1; i < N; ++ i ) {
            f[i] = f[i - 1] * i % MOD;
            g[i] = g[i - 1] * qpow(i, MOD - 2) % MOD;
        }
    }
    LL C(int n, int m) {
        return f[n] * g[m] % MOD * g[n - m] % MOD;
    }
    
    int countOfPairs(vector<int>& nums) {
        init();
        
        int n = nums.size(), m = nums.back();   // ATTENTION m
        for (int i = 1; i < n; ++ i ) {
            m -= max(0, nums[i] - nums[i - 1]); // 减掉必须往上走的强制约束
            if (m < 0)
                return 0;
        }
        return C(n + m, n); // 总共可以自由走 n+m 步
    }
};
```

