## [比赛链接](https://leetcode.cn/contest/weekly-contest-393/)


### [3114. 替换字符可以得到的最晚时间](https://leetcode.cn/problems/latest-time-you-can-obtain-after-replacing-characters/)

枚举校验的方式实现会更简单 略

```c++
class Solution {
public:
    string findLatestTime(string s) {
        {
            if (s[0] == '?' && s[1] == '?')
                s[0] = '1', s[1] = '1';
            else if (s[0] == '?') {
                if (s[1] >= '2')
                    s[0] = '0';
                else
                    s[0] = '1';
            } else if (s[1] == '?') {
                if (s[0] == '1')
                    s[1] = '1';
                else
                    s[1] = '9';
            }
        }
        {
            if (s[3] == '?')
                s[3] = '5';
            if (s[4] == '?')
                s[4] = '9';
        }
        return s;
    }
};
```


### [3115. 质数的最大距离](https://leetcode.cn/problems/maximum-prime-difference/)

也可以直接记录坐标最值 略

```c++
class Solution {
public:
    unordered_set<int> S = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97};
    
    int maximumPrimeDifference(vector<int>& nums) {
        int n = nums.size();
        vector<int> xs;
        for (int i = 0; i < n; ++ i )
            if (S.count(nums[i]))
                xs.push_back(i);
        
        if (xs.empty())
            return 0;
        
        return xs.back() - xs[0];
    }
};
```

### [3116. 单面值组合的第 K 小金额](https://leetcode.cn/problems/kth-smallest-amount-with-single-denomination-combination/)

数据范围下模拟显然不现实

考虑枚举具体的值 => 引入问题: 需要去重 => 结合 **容斥原理** 去重 => 结合数据范围**二进制枚举**所有集合 (子集枚举)

```c++
class Solution {
public:
    // k 太大了  显然没办法模拟枚举
    //
    // 考虑数据范围：
    // - 币种类不超过15 且两两不同
    // - 每个coin的币值不超过25
    //
    // => 二分答案 校验函数里子集枚举去重
    
    using LL = long long;
    const static int N = (1 << 15) + 10;
    
    vector<int> coins;
    int n;
    
    LL v[N];
    
    LL check(LL m) {
        LL ret = 0;
        for (int i = 1; i < 1 << n; ++ i ) {
            int c = __builtin_popcount(i);
            if (c & 1)
                ret += m / v[i];
            else
                ret -= m / v[i];
        }
        return ret;
    }
    
    long long findKthSmallest(vector<int>& coins, int k) {
        this->coins = coins;
        this->n = coins.size();
        
        {
            v[0] = 0;
            for (int i = 1; i < 1 << n; ++ i ) {
                LL t = 1;
                vector<int> xs;
                for (int j = 0; j < n; ++ j )
                    if (i >> j & 1) {
                        t = t / __gcd(t, (LL)coins[j]) * coins[j];
                        xs.push_back(coins[j]);
                    }
                v[i] = t;
            }
        }
        
        LL l = 0, r = 1e15;
        while (l < r) {
            LL m = l + (r - l) / 2;
            if (check(m) < k)
                l = m + 1;
            else
                r = m;
        }
        return l;
    }
};
```

### [3117. 划分数组得到最小的值之和](https://leetcode.cn/problems/minimum-sum-of-values-by-dividing-array/) [TAG]

-   prefix_sum + BIT

```c++
class Solution {
public:
    // 搜索TLE (TODO: revisit 剪枝策略)
    //
    // 考虑 dp
    //  f[i][j] 表示考虑前i个元素切分成j段的最小值和
    //  => f[i][j] = min(f[x][j-1]) + nums[i]
    //     其中x需满足一定条件: and[x+1,j] = andVlues[j]
    //  由与操作性质容易推导 x必然锁定到一个连续区间 接下来就是查询这个区间的最小值
    // 
    // 拆解子问题:
    // 1. 如何计算得到x的区间 => 二分 => 需能快速获取特定区间的 and 值 => 前缀和/rmq
    // 2. 如何维护区间最小值 => BIT/单调队列(更优)
    //
    // 【数据结构优化DP】

    const static int N = 1e4 + 10, M = 11, K = 18, INF = 0x3f3f3f3f;

    // prefix sum
    int sum[N][K];
    int get_by_sum(int l, int r) {
        int ret = 0;
        for (int j = 0; j < K; ++ j )
            if (sum[r][j] - sum[l - 1][j] == r - l + 1)
                ret += 1 << j;
        return ret;
    }
    
    // BIT
    // - 区间最值
    // - 需要nxt数组记录对于第j段下次应当加入bit的位置
    int w[M][N], tr[M][N], nxt[M];
    int lowbit(int x) {
        return x & -x;
    }
    void bit_modify(int tr[], int w[], int x, int y) {
        w[x] = y;
        for (int i = x; i < N; i += lowbit(i))
            tr[i] = min(tr[i], y);  // min
    }
    int bit_query(int tr[], int w[], int l, int r) {
        int ret = INF;  // ATTENTION debug
        for (; l <= r; ) {
            ret = min(ret, w[r]);
            for ( -- r ; r >= l + lowbit(r); r -= lowbit(r))
                ret = min(ret, tr[r]);
        }
        return ret;
    }

    void init() {
        {
            memset(sum, 0, sizeof sum);
            for (int i = 1; i <= n; ++ i )
                for (int j = 0; j < K; ++ j )
                    sum[i][j] = sum[i - 1][j] + (nums[i - 1] >> j & 1);
        }
        {
            memset(w, 0x3f, sizeof w);
            memset(tr, 0x3f, sizeof tr);
            for (int i = 0; i < M; ++ i )
                nxt[i] = 1;
        }
    }

    int search(int L, int R, int x) {
        int l = L, r = R + 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (get_by_sum(mid, R) >= x)
                r = mid;
            else
                l = mid + 1;
        }
        return l;
    }

    int f[N][M];

    vector<int> nums;
    vector<int> avs;
    int n, m;

    int minimumValueSum(vector<int>& nums, vector<int>& andValues) {
        this->nums = nums, this->avs = andValues;
        this->n = nums.size(), this->m = avs.size();

        init();

        memset(f, 0x3f, sizeof f);
        f[0][0] = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                int target = andValues[j - 1];

                // ATTENTION 减少无效计算
                if (get_by_sum(1, i) > target)
                    continue;
                
                // ATTENTION: 思考
                // 找到 第一个 >= target 的位置  &  第一个 > target 的位置
                //  l,r 本质都是上一个轮次的下标
                int l = search(1, i, target), r = search(1, i, target + 1);
                if (l == i + 1 || get_by_sum(l, i) != target)
                    continue;

                r -- ;  // 实际上 r 的位置刚好比最右侧的分界点大 1
                
                auto & local_w = w[j - 1];      // 上一个轮次的
                auto & local_tr = tr[j - 1];
                for (; nxt[j - 1] < r; ++ nxt[j - 1]) {
                    int x = nxt[j - 1], y = f[x][j - 1];
                    bit_modify(local_tr, local_w, x, y);
                }

                // ATTENTION l-1: 思考 上一个区间的结束位置自l左侧一个位置开始
                int min_val = bit_query(local_tr, local_w, max(l - 1, 1), r);
                if (j == 1 && get_by_sum(1, i) == avs[j - 1])
                    min_val = 0;

                f[i][j] = min_val + nums[i - 1];
            }
        
        return f[n][m] < INF / 2 ? f[n][m] : -1;
    }
};
```

-   RMQ(学习记录&的方法) + BIT

```c++
class Solution {
public:
    // 搜索TLE (TODO: revisit 剪枝策略)
    //
    // 考虑 dp
    //  f[i][j] 表示考虑前i个元素切分成j段的最小值和
    //  => f[i][j] = min(f[x][j-1]) + nums[i]
    //     其中x需满足一定条件: and[x+1,j] = andVlues[j]
    //  由与操作性质容易推导 x必然锁定到一个连续区间 接下来就是查询这个区间的最小值
    // 
    // 拆解子问题:
    // 1. 如何计算得到x的区间 => 二分 => 需能快速获取特定区间的 and 值 => 前缀和/rmq
    // 2. 如何维护区间最小值 => BIT/单调队列(更优)
    //
    // 【数据结构优化DP】

    const static int N = 1e4 + 10, M = 11, K = 18, INF = 0x3f3f3f3f;

    // [no] prefix sum => RMQ
    int sum[N][K];
    int get_by_sum(int l, int r) {
        int len = r - l + 1;
        int k = log(len) / log(2);
        return sum[l][k] & sum[r - (1 << k) + 1][k];
    }
    
    // BIT
    // - 区间最值
    // - 需要nxt数组记录对于第j段下次应当加入bit的位置
    int w[M][N], tr[M][N], nxt[M];
    int lowbit(int x) {
        return x & -x;
    }
    void bit_modify(int tr[], int w[], int x, int y) {
        w[x] = y;
        for (int i = x; i < N; i += lowbit(i))
            tr[i] = min(tr[i], y);  // min
    }
    int bit_query(int tr[], int w[], int l, int r) {
        int ret = INF;  // ATTENTION debug
        for (; l <= r; ) {
            ret = min(ret, w[r]);
            for ( -- r ; r >= l + lowbit(r); r -= lowbit(r))
                ret = min(ret, tr[r]);
        }
        return ret;
    }

    void init() {
        {
            memset(sum, 0, sizeof sum);
            // 倍增RMQ
            for (int j = 0; j < K; ++ j )
                for (int i = 1; i + (1 << j) - 1 <= n; ++ i )
                    if (!j)
                        sum[i][j] = nums[i - 1];
                    else
                        // ATTENTION RMQ 维护性质变种
                        //  下标非常容易写疵...
                        sum[i][j] = sum[i][j - 1] & sum[i + (1 << j - 1)][j - 1];
        }
        {
            memset(w, 0x3f, sizeof w);
            memset(tr, 0x3f, sizeof tr);
            for (int i = 0; i < M; ++ i )
                nxt[i] = 1;
        }
    }

    int search(int L, int R, int x) {
        int l = L, r = R + 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (get_by_sum(mid, R) >= x)
                r = mid;
            else
                l = mid + 1;
        }
        return l;
    }

    int f[N][M];

    vector<int> nums;
    vector<int> avs;
    int n, m;

    int minimumValueSum(vector<int>& nums, vector<int>& andValues) {
        this->nums = nums, this->avs = andValues;
        this->n = nums.size(), this->m = avs.size();

        init();

        memset(f, 0x3f, sizeof f);
        f[0][0] = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                int target = andValues[j - 1];

                // ATTENTION 减少无效计算
                if (get_by_sum(1, i) > target)
                    continue;
                
                // ATTENTION: 思考
                // 找到 第一个 >= target 的位置  &  第一个 > target 的位置
                //  l,r 本质都是上一个轮次的下标
                int l = search(1, i, target), r = search(1, i, target + 1);
                if (l == i + 1 || get_by_sum(l, i) != target)
                    continue;

                r -- ;  // 实际上 r 的位置刚好比最右侧的分界点大 1
                
                auto & local_w = w[j - 1];      // 上一个轮次的
                auto & local_tr = tr[j - 1];
                for (; nxt[j - 1] < r; ++ nxt[j - 1]) {
                    int x = nxt[j - 1], y = f[x][j - 1];
                    bit_modify(local_tr, local_w, x, y);
                }

                // ATTENTION l-1: 思考 上一个区间的结束位置自l左侧一个位置开始
                int min_val = bit_query(local_tr, local_w, max(l - 1, 1), r);
                if (j == 1 && get_by_sum(1, i) == avs[j - 1])
                    min_val = 0;

                f[i][j] = min_val + nums[i - 1];
            }
        
        return f[n][m] < INF / 2 ? f[n][m] : -1;
    }
};
```

-   RMQ(前缀和写法略) + 单调队列

```c++
class Solution {
public:
    // 搜索TLE (TODO: revisit 剪枝策略)
    //
    // 考虑 dp
    //  f[i][j] 表示考虑前i个元素切分成j段的最小值和
    //  => f[i][j] = min(f[x][j-1]) + nums[i]
    //     其中x需满足一定条件: and[x+1,j] = andVlues[j]
    //  由与操作性质容易推导 x必然锁定到一个连续区间 接下来就是查询这个区间的最小值
    // 
    // 拆解子问题:
    // 1. 如何计算得到x的区间 => 二分 => 需能快速获取特定区间的 and 值 => 前缀和/rmq
    // 2. 如何维护区间最小值 => BIT/单调队列(更优)
    //
    // 【数据结构优化DP】

    const static int N = 1e4 + 10, M = 11, K = 18, INF = 0x3f3f3f3f;

    // [no] prefix sum => RMQ
    int sum[N][K];
    int get_by_sum(int l, int r) {
        int len = r - l + 1;
        int k = log(len) / log(2);
        return sum[l][k] & sum[r - (1 << k) + 1][k];
    }
    
    // [no] BIT => deque
    // - 区间最值
    // - 需要nxt数组记录对于第j段下次应当加入bit的位置
    deque<int> q[M];
    int nxt[M];

    void init() {
        {
            memset(sum, 0, sizeof sum);
            // 倍增RMQ
            for (int j = 0; j < K; ++ j )
                for (int i = 1; i + (1 << j) - 1 <= n; ++ i )
                    if (!j)
                        sum[i][j] = nums[i - 1];
                    else
                        // ATTENTION RMQ 维护性质变种
                        //  下标非常容易写疵...
                        sum[i][j] = sum[i][j - 1] & sum[i + (1 << j - 1)][j - 1];
        }
        {
            for (int i = 0; i < M; ++ i )
                nxt[i] = 1, q[i].clear();
        }
    }

    int search(int L, int R, int x) {
        int l = L, r = R + 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (get_by_sum(mid, R) >= x)
                r = mid;
            else
                l = mid + 1;
        }
        return l;
    }

    int f[N][M];

    vector<int> nums;
    vector<int> avs;
    int n, m;

    int minimumValueSum(vector<int>& nums, vector<int>& andValues) {
        this->nums = nums, this->avs = andValues;
        this->n = nums.size(), this->m = avs.size();

        init();

        memset(f, 0x3f, sizeof f);
        f[0][0] = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                int target = andValues[j - 1];

                // ATTENTION 减少无效计算
                if (get_by_sum(1, i) > target)
                    continue;
                
                // ATTENTION: 思考
                // 找到 第一个 >= target 的位置  &  第一个 > target 的位置
                //  l,r 本质都是上一个轮次的下标
                int l = search(1, i, target), r = search(1, i, target + 1);
                if (l == i + 1 || get_by_sum(l, i) != target)
                    continue;

                r -- ;  // 实际上 r 的位置刚好比最右侧的分界点大 1
                
                auto & local_q = q[j - 1];      // 上一个轮次的

                for (; nxt[j - 1] < r; ++ nxt[j - 1]) {
                    while (!local_q.empty() && f[local_q.back()][j -1] >= f[nxt[j - 1]][j - 1])
                        local_q.pop_back();
                    local_q.push_back(nxt[j - 1]);
                }
                // ATTENTION: 因为前面可能会加进去小于l-1的，所以pop_front要放在后面
                // ATTENTION l-1: 思考 上一个区间的结束位置自l左侧一个位置开始
                while (!local_q.empty() && local_q.front() < l - 1)
                    local_q.pop_front();

                int min_val = INF;
                if (!local_q.empty())
                    min_val = f[local_q.front()][j - 1];
                if (j == 1 && get_by_sum(1, i) == avs[j - 1])
                    min_val = 0;

                f[i][j] = min_val + nums[i - 1];
            }
        
        return f[n][m] < INF / 2 ? f[n][m] : -1;
    }
};
```

-   LogTrick (打掉一个log) + 单调队列(BIT略)

    >   LogTrick: **给定一个数组，以某个右端点为结尾的所有子数组，其中不同的 或/与/lcm/gcd 值至多只有 logU 个**

```c++
class Solution {
public:
    using PII = pair<int, int>;

    template <typename T, typename F = function<T(const T &, const T &)>>
    struct SparseTable {
        int n;
        vector<vector<T>> mat;
        F func;

        SparseTable() {}    // For vector
        SparseTable(const vector<T> & a, const F & f) : func(f) {
            n = a.size();
            if (n == 0)
                return;
            int maxLog = 32 - __builtin_clz(n);
            mat.resize(maxLog);
            mat[0] = a;
            mat[0].insert(mat[0].begin(), 0);
            for (int j = 1; j < maxLog; ++ j ) {
                mat[j].resize(n - (1 << j) + 1 + 1);
                // i = n - (1 << j) + 1, 故申请内存需要再+1
                for (int i = 1; i + (1 << j) - 1 <= n; ++ i )
                    mat[j][i] = func(mat[j - 1][i], mat[j - 1][i + (1 << j - 1)]);
            }
        }
        T query(int l, int r) const {
            assert(0 <= l && l <= r && r <= n - 1);
            int lg = 31 - __builtin_clz(r - l + 1);
            return func(mat[lg][l], mat[lg][r - (1 << lg) + 1]);
        }
    };

    vector<int> nums;
    vector<int> avs;
    int n, m;

    int minimumValueSum(vector<int>& nums, vector<int>& andValues) {
        this->nums = nums, this->avs = andValues;
        this->n = nums.size(), this->m = avs.size();
        
        const int INF = 0x3f3f3f3f;
        vector<int> dp(n + 1, INF);
        dp[0] = 0;
        for (int parts = 1; parts <= m; ++ parts ) {
            SparseTable st(dp, [&](int i, int j) {return min(i, j);});
            vector<int> ndp(n + 1, INF);

            vector<PII> G;  // (and, left endpoint)
            for (int i = 1; i <= n; ++ i ) {
                int x = nums[i - 1];
                G.push_back({x, i});
                for (auto & g : G)
                    g.first &= x;
                G.erase(unique(G.begin(), G.end(), [](const PII & g1, const PII & g2) {
                    // ATTENTION trick: 对于相同的保留第一个
                    return g1.first == g2.first;
                }), G.end());

                // ATTENTION: G.size() <= log(bit_width)
                for (int j = 0; j < G.size(); ++ j ) {
                    int l = G[j].second, r = (j == G.size() - 1 ? i : G[j + 1].second - 1);
                    if (G[j].first == avs[parts - 1])
                        ndp[i] = min(ndp[i], x + st.query(l, r));
                }
            }

            swap(dp, ndp);
        }
        
        return dp[n] >= INF / 2 ? -1 : dp[n];
    }
};
```

