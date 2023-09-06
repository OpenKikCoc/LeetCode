## [比赛链接](https://leetcode.cn/contest/weekly-contest-361/)


### [统计对称整数的数目](https://leetcode.cn/problems/count-symmetric-integers/)



```c++
class Solution {
public:
    bool check(int x) {
        auto s = to_string(x);
        if (s.size() & 1)
            return false;
        int a = 0, b = 0;
        for (int i = 0; i < s.size() / 2; ++ i )
            a += s[i] - '0', b += s[i + s.size() / 2] - '0';
        return a == b;
    }
    
    int countSymmetricIntegers(int low, int high) {
        int res = 0;
        for (int i = low; i <= high; ++ i )
            if (check(i))
                res ++ ;
        return res;
    }
};
```


### [生成特殊数字的最少操作](https://leetcode.cn/problems/minimum-operations-to-make-a-special-number/)



```c++
class Solution {
public:
    // 能被 25 整除，意味着最后两位 00/25/50/75
    // 即求: 使得末两位变成这两个数字的最小操作次数
    
    string ns;
    int n;
    
    int get(string & tar) {
        int p = n - 1;
        while (p >= 0 && ns[p] != tar[1])
            p -- ;
        if (p < 0)
            return 1e9;
        p -- ;
        
        while (p >= 0 && ns[p] != tar[0])
            p -- ;
        if (p < 0) {
            if (tar[0] == '0')
                return n - 1;
            return 1e9;
        }
        return n - 1 - p - 1;
    }
    
    int minimumOperations(string num) {
        this->ns = num, this->n = ns.size();
        int res = n;    // 删除全部
        vector<string> tars = {"00", "25", "50", "75"};
        for (auto & tar : tars)
            res = min(res, get(tar));
        return res;
    }
};
```

### [统计趣味子数组的数目](https://leetcode.cn/problems/count-of-interesting-subarrays/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    vector<int> ns;
    int n;
    
    long long countInterestingSubarrays(vector<int>& nums, int modulo, int k) {
        this->ns = nums, this->n = ns.size();
        
        unordered_map<int, int> h;
        h[0] = 1;
        
        LL res = 0;
        for (int i = 1, s = 0; i <= n; ++ i ) {
            if (nums[i - 1] % modulo == k)
                s = (s + 1) % modulo;
            
            // s - tar = k (mod)
            res += h[(s - k + modulo) % modulo];
            h[s] ++ ;
        }
        return res;
    }
};
```

### [边权重均等查询](https://leetcode.cn/problems/minimum-edge-weight-equilibrium-queries-in-a-tree/)

经典LCA 结合数据范围

```c++
const static int N = 1e4 + 10, M = 2e4 + 10, K = 27;

int n, m;
int h[N], e[M], w[M], ne[M], idx;
int depth[N], fa[N][16], cnt[N][K];
int q[N];

void init() {
    memset(h, -1, sizeof h);
    idx = 0;
}
void add(int a, int b, int c) {
    e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
}

void bfs(int root) {
    memset(depth, 0x3f, sizeof depth);
    depth[0] = 0, depth[root] = 1;  // ATTENTION 0 node
    int hh = 0, tt = 0;
    q[0] = root;
    
    memset(cnt, 0, sizeof cnt);
    
    while (hh <= tt) {
        int t = q[hh ++ ];
        for (int i = h[t]; ~i; i = ne[i]) {
            int j = e[i];
            if (depth[j] > depth[t] + 1) {
                depth[j] = depth[t] + 1;
                q[ ++ tt] = j;
                
                fa[j][0] = t;
                for (int k = 1; k <= 15; ++ k )
                    fa[j][k] = fa[fa[j][k - 1]][k - 1];
                
                // Special
                for (int k = 1; k <= 26; ++ k )
                    cnt[j][k] = cnt[t][k] + (k == w[i]);
            }
        }
    }
}

int lca(int a, int b) {
    if (depth[a] < depth[b])
        swap(a, b);
    for (int k = 15; k >= 0; -- k )
        if (depth[fa[a][k]] >= depth[b])
            a = fa[a][k];
    if (a == b)
        return a;
    for (int k = 15; k >= 0; -- k )
        if (fa[a][k] != fa[b][k])
            a = fa[a][k], b = fa[b][k];
    return fa[a][0];
}

class Solution {
public:
    // ATTENTION 1 <= w_i <= 26 数据范围较小 可以直接按照多维处理
    
    vector<int> minOperationsQueries(int n, vector<vector<int>>& edges, vector<vector<int>>& queries) {
        init();
        for (auto & e : edges) {
            int a = e[0] + 1, b = e[1] + 1, c = e[2];
            add(a, b, c), add(b, a, c);
        }
        bfs(1);
        
        vector<int> res;
        for (auto & q : queries) {
            int a = q[0] + 1, b = q[1] + 1;
            int p = lca(a, b);
            
            
            int mx = 0;
            for (int k = 1; k <= 26; ++ k )
                mx = max(mx, cnt[a][k] + cnt[b][k] - cnt[p][k] * 2);
            res.push_back(depth[a] + depth[b] - depth[p] * 2 - mx);
        }
        return res;
    }
};
```
