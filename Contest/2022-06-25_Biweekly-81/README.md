## [比赛链接](https://leetcode.cn/contest/biweekly-contest-81/)

>   virtual rank: 227 / 3847


### [2315. 统计星号](https://leetcode.cn/problems/count-asterisks/)

略

```c++
class Solution {
public:
    int countAsterisks(string s) {
        int n = s.size(), res = 0;
        for (int i = 0, c = 0; i < n; ++ i )
            if (s[i] == '|')
                c ++ ;
            else {
                if (c % 2 == 0 && s[i] == '*')
                    res ++ ;
            }
        return res;
    }
};
```


### [2316. 统计无向图中无法互相到达点对数](https://leetcode.cn/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/)

连通性

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    int pa[N], sz[N];
    void init() {
        for (int i = 0; i < N; ++ i )
            pa[i] = i, sz[i] = 1;
    }
    int find(int x) {
        if (pa[x] != x)
            pa[x] = find(pa[x]);
        return pa[x];
    }
    
    long long countPairs(int n, vector<vector<int>>& edges) {
        init();
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            int fa = find(a), fb = find(b);
            if (fa != fb) {
                pa[fa] = fb;
                sz[fb] += sz[fa];
            }
        }
        vector<int> t;
        for (int i = 0; i < n; ++ i )
            if (find(i) == i)
                t.push_back(sz[i]);
        
        int m = t.size();
        LL res = 0, s = 0;
        // 这里需要优化一下
        for (int i = 0; i < m; ++ i ) {
            res += s * t[i];
            s += t[i];
        }
        // for (int i = 0; i < m; ++ i )
        //     for (int j = i + 1; j < m; ++ j )
        //         res += (LL)t[i] * t[j];
        
        return res;
    }
};
```

### [2317. 操作后的最大异或和](https://leetcode.cn/problems/maximum-xor-after-operations/)

略

```c++
class Solution {
public:
    int maximumXOR(vector<int>& nums) {
        int res = 0;
        for (int i = 0; i < 31; ++ i ) {
            bool f = false;
            for (auto x : nums)
                if (x >> i & 1) {
                    f = true;
                    break;
                }
            if (f)
                res |= 1 << i;
        }
        return res;
    }
};
```

### [2318. 不同骰子序列的数目](https://leetcode.cn/problems/number-of-distinct-roll-sequences/) [TAG]

半小时

一开始按照 `f[i][j] = f[i][j] + f[i-1][k] - f[i-2][j]` 来算得不到正确答案，其实应当考虑补回一个 `f[i-2][j]` 【本题题意下的合理推导】

>   补回操作参考 https://leetcode.cn/problems/number-of-distinct-roll-sequences/solution/by-endlesscheng-tgkn/

```c++
class Solution {
public:
    const static int N = 1e4 + 10, M = 7, MOD = 1e9 + 7;
    
    bool st[M][M];
    void init() {
        memset(st, false, sizeof st);
        for (int i = 1; i < M; ++ i )
            for (int j = 1; j < M; ++ j )
                if (i != j && __gcd(i, j) == 1)
                    st[i][j] = true;
    }
    
    int f[N][M];
    
    int distinctSequences(int n) {
        init();
        
        memset(f, 0, sizeof f);
        
        for (int j = 1; j < M; ++ j )
            f[1][j] = 1;
        
        for (int i = 2; i <= n; ++ i )
            for (int j = 1; j < M; ++ j ) {
                for (int k = 1; k < M; ++ k )
                    if (st[j][k])
                        // 1. 一开始就想到了这样的转移方程，直接这样写比答案数值大
                        f[i][j] = (f[i][j] + (f[i - 1][k] - f[i - 2][j] + MOD) % MOD) % MOD;
                // 2. ATTENTION 实际上，对于 i > 3 的情况需要补回一个 f[i-2][j]
                if (i > 3)
                    f[i][j] = (f[i][j] + f[i - 2][j]) % MOD;
            }
        
        int res = 0;
        for (int j = 1; j < M; ++ j )
            res = (res + f[n][j]) % MOD;
        return res;
    }
};
```

后面写的三维 dp 2A

```c++
class Solution {
public:
    const static int N = 1e4 + 10, M = 7, MOD = 1e9 + 7;
    
    bool st[M][M];
    void init() {
        memset(st, false, sizeof st);
        for (int i = 1; i < M; ++ i )
            for (int j = 1; j < M; ++ j )
                if (i != j && __gcd(i, j) == 1)
                    st[i][j] = true;
    }
    
    int f[N][M][M];
    
    int distinctSequences(int n) {
        init();
        
        // ATTENTION
        if (n == 1)
            return 6;
        
        memset(f, 0, sizeof f);
        
        for (int j = 1; j < M; ++ j )
            f[1][j][0] = 1;
        for (int j = 1; j < M; ++ j )
            for (int k = 1; k < M; ++ k )
                if (st[j][k])
                    f[2][j][k] += f[1][k][0];
        
        for (int i = 3; i <= n; ++ i )
            for (int j = 1; j < M; ++ j )
                for (int k = 1; k < M; ++ k )
                    if (st[j][k]) {
                        for (int z = 1; z < M; ++ z )
                            if (st[k][z] && z != j)
                                f[i][j][k] = (f[i][j][k] + f[i - 1][k][z]) % MOD;
                    }
        
        int res = 0;
        for (int j = 1; j < M; ++ j )
            for (int k = 1; k < M; ++ k )
            res = (res + f[n][j][k]) % MOD;
        return res;
    }
};
```
