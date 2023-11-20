## [比赛链接](https://leetcode.cn/contest/weekly-contest-370/)

>   virtual rank: 144 / 3983
>   1:05:27 0:01:29 0:06:06 0:24:47 1:05:27


### [2923. 找到冠军 I](https://leetcode.cn/problems/find-champion-i/)



```c++
class Solution {
public:
    int findChampion(vector<vector<int>>& grid) {
        int n = grid.size();
        for (int i = 0; i < n; ++ i ) {
            auto & g = grid[i];
            int c = 0;
            for (auto x : g)
                if (x)
                    c ++ ;
            if (c == n - 1)
                return i;
        }
        return -1;
    }
};
```


### [2924. 找到冠军 II](https://leetcode.cn/problems/find-champion-ii/)

同 1 计算入度即可

```c++
class Solution {
public:
    const static int N = 110;
    
    int n;
    int din[N];
    
    int findChampion(int n, vector<vector<int>>& edges) {
        this->n = n;
        
        memset(din, 0, sizeof din);
        for (auto & e : edges)
            din[e[1]] ++ ;
        
        int p = -1;
        for (int i = 0; i < n; ++ i )
            if (din[i] == 0) {
                if (p == -1)
                    p = i;
                else
                    return -1;
            }
        return p;
    }
};
```

### [2925. 在树上执行操作以后得到的最大分数](https://leetcode.cn/problems/maximum-score-after-applying-operations-on-a-tree/)

两个 dfs 其实可以合并，实现略

```c++
class Solution {
public:
    using LL = long long;
    
    const static int N = 2e4 + 10, M = 4e4 + 10;
    const static LL INF = 1e15;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    vector<int> vs;
    
    LL s[N];
    bool leaf[N];
    
    void dfs_sum(int u, int pa) {
        s[u] = vs[u];
        
        int c = 0;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            dfs_sum(j, u);
            s[u] += s[j];
            c ++ ;
        }
        if (c == 0)
            leaf[u] = true;
    }
    
    LL f[N][2];
    // 以当前节点为根，到达当前节点的所有叶子节点全部健康，且 不选/选 当前节点的最小开销【总和-开销=得分】
    
    void dfs(int u, int pa) {
        f[u][1] = vs[u];
        
        // 考虑不选的情况
        if (leaf[u]) {
            f[u][0] = INF;
        } else {
            f[u][0] = 0;
            for (int i = h[u]; ~i; i = ne[i]) {
                int j = e[i];
                if (j == pa)
                    continue;
                dfs(j, u);
                f[u][0] += min(f[j][0], f[j][1]);
            }
        }
    }
    
    
    long long maximumScoreAfterOperations(vector<vector<int>>& edges, vector<int>& values) {
        this->vs = values; this->n = vs.size();
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        memset(s, 0, sizeof s);
        memset(leaf, 0, sizeof leaf);
        dfs_sum(0, -1);
        
        // ATTENTION: +INF
        memset(f, 0x3f, sizeof f);
        dfs(0, -1);
        
        return max(s[0] - f[0][0], s[0] - f[0][1]);
    }
};
```

### [2926. 平衡子序列的最大和](https://leetcode.cn/problems/maximum-balanced-subsequence-sum/)

暴力优化 + BIT 维护区间最值

```c++
class Solution {
public:
    // 原题转换: nums[i_j] - i_j >= nums[i_j-1] - i_j-1
    //          nums[y]-y >= nums[x]-x => 这样 y 才能接在 x 后面
    //    则 可以直接计算偏移量
    
    using LL = long long;
    using PII = pair<int, int>;
    
    const static int N = 1e5 + 10;
    
    // -------------------------- begin --------------------------
    vector<int> t;
    int find(int x) {
        return lower_bound(t.begin(), t.end(), x) - t.begin();
    }
    
    LL tr[N], w[N];
    int lowbit(int x) {
        return x & -x;
    }
    void modify(int x, LL y) {
        w[x] = max(w[x], y);
        for (int i = x; i < N; i += lowbit(i)) {
            tr[i] = max(tr[i], y);
        }
    }
    LL query(int l, int r) {
        LL ret = 0;
        for (; l <= r; ) {
            ret = max(ret, w[r]);
            for ( -- r ; r >= l + lowbit(r); r -= lowbit(r))
                ret = max(ret, tr[r]);
        }
        return ret;
    }
    
    // --------------------------- end ---------------------------
    
    LL f[N];
    
    long long maxBalancedSubsequenceSum(vector<int>& nums) {
        int n = nums.size();
        
        {
            // 离散化
            this->t.clear();
            for (int i = 0; i < n; ++ i )
                t.push_back(nums[i] - i);
            
            sort(t.begin(), t.end());
            t.erase(unique(t.begin(), t.end()), t.end());
        }
        
        vector<PII> xs;     // 计算偏移量
        for (int i = 0; i < n; ++ i )
            // xs.push_back({nums[i] - i, nums[i]});
            xs.push_back({find(nums[i] - i) + 1, nums[i]}); // +1 方便 BIT 维护
        
        LL res = -1e15;
        // 状态转移
        /*
        for (int i = 0; i < n; ++ i ) {
            f[i] = 0;
            for (int j = 0; j < i; ++ j ) {
                if (xs[j].first <= xs[i].first) {
                    f[i] = max(f[i], f[j]);
                }
            }
            f[i] += nums[i];
            res = max(res, f[i]);
        }
        */
        // 前面本质上是从已有的一堆里面，找到一个符合条件的最大的
        // 显然可以 bit，但是需要将 xs[i].first = nums[i]-i 进行离散化操作   #L34
        memset(tr, 0xcf, sizeof tr), memset(w, 0xcf, sizeof w);    // ATTENTION: -INF
        for (int i = 0; i < n; ++ i ) {
            auto [x, y] = xs[i];
            LL v = query(1, x);
            res = max(res, v + y);
            modify(x, v + y);
        }
        
        return res;
    }
};
```
