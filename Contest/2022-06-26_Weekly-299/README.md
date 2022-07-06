## [比赛链接](https://leetcode.cn/contest/weekly-contest-299/)

>   virtual rank: 182 / 6108


### [2319. 判断矩阵是否是一个 X 矩阵](https://leetcode.cn/problems/check-if-matrix-is-x-matrix/)

略

```c++
class Solution {
public:
    bool checkXMatrix(vector<vector<int>>& g) {
        int n = g.size();
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < n; ++ j )
                if (i == j || i + j == n - 1) {
                    if (g[i][j] == 0)
                        return false;
                } else {
                    if (g[i][j] != 0)
                        return false;
                }
        return true;
    }
};
```


### [2320. 统计放置房子的方式数](https://leetcode.cn/problems/count-number-of-ways-to-place-houses/)

略

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e4 + 10, MOD = 1e9 + 7;
    
    LL f[N][2];
    
    int countHousePlacements(int n) {
        memset(f, 0, sizeof f);
        f[1][0] = f[1][1] = 1;
        for (int i = 2; i <= n; ++ i ) {
            f[i][0] = (f[i - 1][1] + f[i - 1][0]) % MOD;
            f[i][1] = f[i - 1][0];
        }
        
        LL t = (f[n][0] + f[n][1]) % MOD;
        return t * t % MOD;
    }
};
```

### [2321. 拼接数组的最大分数](https://leetcode.cn/problems/maximum-score-of-spliced-array/)

思考必然是其中一个数组的一个连续子段发生变化

两数组做差来获取变化的量，随后求最大子段和即可

```c++
class Solution {
public:
    int get(vector<int> & n1, vector<int> & n2) {
        int n = n1.size();
        vector<int> t(n);
        int sum = 0, diff = 0, pre = 0;
        for (int i = 0; i < n; ++ i ) {
            t[i] = n2[i] - n1[i];
            sum += n1[i];
            pre = max(0, pre) + t[i];
            diff = max(diff, pre);
        }
        return sum + diff;
    }
    
    int maximumsSplicedArray(vector<int>& nums1, vector<int>& nums2) {
        return max(get(nums1, nums2), get(nums2, nums1));
    }
};
```

### [2322. 从树中删除边的最小分数](https://leetcode.cn/problems/minimum-score-after-removals-on-a-tree/)

显然可以固定根并处理每个子树的异或值

1e3 数据量接受枚举三部分的根，考虑计算三个部分的数值加个 LCA 即可

```c++
class Solution {
public:
    const static int N = 1010, M = 2010;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    vector<int> vals;
    int x[N];
    void dfs(int u, int pa) {
        x[u] = vals[u - 1];
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            dfs(j, u);
            x[u] ^= x[j];
        }
    }
    int depth[N], fa[N][11], q[N];
    void bfs(int root) {
        memset(depth, 0x3f, sizeof depth);
        depth[0] = 0, depth[root] = 1;
        int hh = 0, tt = -1;
        q[ ++ tt] = root;
        while (hh <= tt) {
            int t = q[hh ++ ];
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                if (depth[j] > depth[t] + 1) {
                    depth[j] = depth[t] + 1;
                    q[ ++ tt] = j;
                    
                    fa[j][0] = t;
                    for (int k = 1; k <= 10; ++ k )
                        fa[j][k] = fa[fa[j][k - 1]][k - 1];
                }
            }
        }
    }
    int lca(int a, int b) {
        if (depth[a] < depth[b])
            swap(a, b);
        for (int k = 10; k >= 0; -- k )
            if (depth[fa[a][k]] >= depth[b])
                a = fa[a][k];
        if (a == b)
            return a;
        for (int k = 10; k >= 0; -- k )
            if (fa[a][k] != fa[b][k])
                a = fa[a][k], b = fa[b][k];
        return fa[a][0];
    }
    
    pair<int, int> get(int a, int b) {
        if (fa[a][0] == b)
            return {b, a};
        return {a, b};
    }
    
    int minimumScore(vector<int>& nums, vector<vector<int>>& edges) {
        this->vals = nums, this->n = vals.size();
        init();
        for (auto & e : edges)
            add(e[0] + 1, e[1] + 1), add(e[1] + 1, e[0] + 1);
        memset(fa, 0, sizeof fa);
        memset(x, 0, sizeof x);
        
        // 0->1 映射 方便LCA的fa数组哨兵节点
        dfs(1, 0);
        bfs(1);
        
        int res = INT_MAX;
        for (auto & e1 : edges)
            for (auto & e2 : edges) {
                auto [u1, v1] = get(e1[0] + 1, e1[1] + 1);
                auto [u2, v2] = get(e2[0] + 1, e2[1] + 1);
                if (u1 == u2 && v1 == v2)
                    continue;
                int a = x[v1], b = x[v2], c = 0;
                int t = lca(v1, v2);
                if (t == v1 || t == v2) {
                    if (t == v1)
                        c = x[1] ^ a, a ^= b;
                    else
                        c = x[1] ^ b, b ^= a;
                } else {
                    c = x[1] ^ a ^ b;
                }
                
                // cout << " v1 = " << v1-1 << " a = " << a << " v2 = " << v2-1 << " b = " << b << " c = " << c << endl;
                res = min(res, max({a, b, c}) - min({a, b, c}));
            }
        
        return res;
    }
};
```

优化：可以直接用 DFS 序替代 LCA 实现同样的子树判断功能

```c++
class Solution {
public:
    const static int N = 1010, M = 2010;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    vector<int> vals;
    int x[N], fa[N], tsl[N], tsr[N], timestamp;
    void dfs(int u, int pa) {
        fa[u] = pa, tsl[u] = ++ timestamp;
        x[u] = vals[u];
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            dfs(j, u);
            x[u] ^= x[j];
        }
        tsr[u] = timestamp;
    }
    
    pair<int, int> get(int a, int b) {
        if (fa[a] == b)
            return {b, a};
        return {a, b};
    }
    
    bool is_subtree(int a, int b) {
        return tsl[a] >= tsl[b] && tsr[a] <= tsr[b];
    }
    
    int minimumScore(vector<int>& nums, vector<vector<int>>& edges) {
        this->vals = nums, this->n = vals.size();
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        memset(fa, 0, sizeof fa);
        memset(x, 0, sizeof x);
        this->timestamp = 0;
        dfs(0, -1);
        
        int res = INT_MAX;
        for (auto & e1 : edges)
            for (auto & e2 : edges) {
                auto [u1, v1] = get(e1[0], e1[1]);
                auto [u2, v2] = get(e2[0], e2[1]);
                if (u1 == u2 && v1 == v2)
                    continue;
                int a = x[v1], b = x[v2], c = 0;
                
                if (is_subtree(v1, v2) || is_subtree(v2, v1)) {
                    if (is_subtree(v2, v1))
                        c = x[0] ^ a, a ^= b;
                    else
                        c = x[0] ^ b, b ^= a;
                } else {
                    c = x[0] ^ a ^ b;
                }
                
                res = min(res, max({a, b, c}) - min({a, b, c}));
            }
        
        return res;
    }
};
```

