## [比赛链接](https://leetcode.cn/contest/weekly-contest-369/)

>   virtual rank: 0:26:24  3/4  304/4121


### [2917. 找出数组中的 K-or 值](https://leetcode.cn/problems/find-the-k-or-of-an-array/)



```c++
class Solution {
public:
    const static int N = 32;
    
    int c[N];
    
    int findKOr(vector<int>& nums, int k) {
        memset(c, 0, sizeof c);
        for (auto x : nums)
            for (int i = 0; i < N; ++ i )
                if (x >> i & 1)
                    c[i] ++ ;
        
        int res = 0;
        for (int i = 0; i < N; ++ i )
            if (c[i] >= k)
                res ^= 1 << i;
        return res;
    }
};
```


### [2918. 数组的最小相等和](https://leetcode.cn/problems/minimum-equal-sum-of-two-arrays-after-replacing-zeros/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long minSum(vector<int>& nums1, vector<int>& nums2) {
        LL s1 = 0, c1 = 0, s2 = 0, c2 = 0;
        for (auto x : nums1)
            s1 += x, c1 += (x == 0);
        for (auto x : nums2)
            s2 += x, c2 += (x == 0);
        
        LL l1 = s1 + c1, r1 = (c1 ? 1e18 : s1);
        LL l2 = s2 + c2, r2 = (c2 ? 1e18 : s2);
        
        // 需要有交集
        bool f = (r1 - l1) + (r2 - l2) >= max(r1, r2) - min(l1, l2);
        if (f)
            return max(l1, l2);
        return -1;
    }
};
```

### [2919. 使数组变美的最小增量运算数](https://leetcode.cn/problems/minimum-increment-operations-to-make-array-beautiful/)



```c++
class Solution {
public:
    // 思维: 快速假定结论 mod3 的所有位置作为发挥作用的位置 求最少需要加多少 => WA
    // 考虑 dp f[i] 表示考虑前i个位置[且合法, 【第i个要放】] 的最小开销
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL f[N];    // ATTENTION 转移公式
    
    LL get_min(int a, int b, int c) {
        a = max(a, 0), b = max(b, 0), c = max(c, 0);
        return min(min(f[a], f[b]), f[c]);
    }
    
    long long minIncrementOperations(vector<int>& nums, int k) {
        memset(f, 0x3f, sizeof f);
        f[0] = 0;
        
        int n = nums.size();
        for (int i = 1; i <= n; ++ i ) {
            bool flag = nums[i - 1] >= k;
            if (flag)
                f[i] = get_min(i - 3, i - 2, i - 1);
            else
                f[i] = get_min(i - 3, i - 2, i - 1) + k - nums[i - 1];
        }
        
        return get_min(n - 2, n - 1, n);
    }
};
```

### [2920. 收集所有金币可获得的最大积分](https://leetcode.cn/problems/maximum-points-after-collecting-coins-from-all-nodes/) [TAG]

树形 dp + 根据数据范围求解

```c++
class Solution {
public:
    // 题意: 要想收集节点上的金币，必须先收集该节点的祖先节点上的金币,
    // => 则某一个节点的当前值计算应当与这条链上的选择方案相关
    // 注意值域 1e4 则可以缓存每个值被压多少次
    
    using PII = pair<int, int>;
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int k;
    vector<int> cs;
    // map<PII, int> hash;
    int hash[N][18];    // ATTENTION 追加 c<17 的判断条件后仍然超时，考虑将 map 转为静态树组 => AC
    
    int dfs(int u, int fa, int c) {
        // if (hash.count({u, c}))
        //     return hash[{u, c}];
        if (hash[u][c] != -1)
            return hash[u][c];
        
        int original = cs[u];
        // RE: Line 28: Char 32: runtime error: shift exponent 32 is too large for 32-bit type 'int' (solution.cpp)
        // => 把 c 缩小
        // c = min(c, 31);
        //
        // => TLE
        // 考虑数据范围，在 c > 17 时直接不进入后续递归
        int updated = original >> c;
        
        int a = updated - k, b = updated >> 1;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            a += dfs(j, u, c);
            
            // ATTENTION: 追加 c<17 的判断条件
            if (c < 17)
                b += dfs(j, u, c + 1);
        }
        // return hash[{u, c}] = max(a, b);
        return hash[u][c] = max(a, b);
    }
    
    int maximumPoints(vector<vector<int>>& edges, vector<int>& coins, int k) {
        init();
        this->k = k, this->cs = coins;
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        memset(hash, -1, sizeof hash);

        return dfs(0, -1, 0);
    }
};
```
