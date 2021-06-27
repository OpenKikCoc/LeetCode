## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-247)

rank: 147 / 3980


### [5797. 两个数对之间的最大乘积差](https://leetcode-cn.com/problems/maximum-product-difference-between-two-pairs/)

排序即可 略

```c++
class Solution {
public:
    int maxProductDifference(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int a = nums[n - 1], b = nums[n - 2], c = nums[0], d = nums[1];
        return a * b - c * d;
    }
};
```


### [5798. 循环轮转矩阵](https://leetcode-cn.com/problems/cyclically-rotating-a-grid/)

模拟即可

```c++
class Solution {
public:
    vector<vector<int>> g;
    int n, m;
    
    vector<vector<int>> rotateGrid(vector<vector<int>>& grid, int k) {
        this->g = grid;
        this->n = grid.size(), m = grid[0].size();
        
        int l = 0, r = m - 1, u = 0, d = n - 1;
        vector<vector<int>> all;
        for (;;) {
            vector<int> t;
            for (int i = l; i <= r; ++ i )
                t.push_back(g[u][i]);
            if ( ++ u > d) {
                all.push_back(t);
                break;
            }
            for (int i = u; i <= d; ++ i )
                t.push_back(g[i][r]);
            if ( -- r < l) {
                all.push_back(t);
                break;
            }
            for (int i = r; i >= l; -- i )
                t.push_back(g[d][i]);
            if ( -- d < u) {
                all.push_back(t);
                break;
            }
            for (int i = d; i >= u; -- i )
                t.push_back(g[i][l]);
            if ( ++ l > r) {
                all.push_back(t);
                break;
            }
            all.push_back(t);
        }
        
        vector<vector<int>> res = g;
        int p = 0, asz = all.size();
        l = 0, r = m - 1, u = 0, d = n - 1;
        while (p < asz) {
            auto t = all[p ++ ];
            int sz = t.size(), id = 0;
            int tk = k;
            tk %= sz;
            
            for (int i = l; i <= r; ++ i , ++ id )
                res[u][i] = t[(id + tk) % sz];
            if ( ++ u > d)
                break;
            
            for (int i = u; i <= d; ++ i , ++ id )
                res[i][r] = t[(id + tk) % sz];
            if ( -- r < l)
                break;
            
            for (int i = r; i >= l; -- i , ++ id )
                res[d][i] = t[(id + tk) % sz];
            if ( -- d < u)
                break;
            
            for (int i = d; i >= u; -- i , ++ id )
                res[i][l] = t[(id + tk) % sz];
            if ( ++ l > r)
                break;
        }
        return res;
    }
};
```

### [5799. 最美子字符串的数目](https://leetcode-cn.com/problems/number-of-wonderful-substrings/)

边累计边统计即可 

```c++
class Solution {
public:
    using LL = long long;
    const static int M = 10;
    unordered_map<int, int> hash;
    
    long long wonderfulSubstrings(string word) {
        int n = word.size();
        int s = 0;
        hash[0] = 1;
        LL res = 0;
        for (int i = 1; i <= n; ++ i ) {
            int x = word[i - 1] - 'a';
            s ^= (1 << x);
            res += hash[s];
            for (int j = 0; j < M; ++ j ) {
                int ps = s ^ (1 << j);
                res += hash[ps];
            }
            // cout << " i = " << i << " res = " << res << endl;
            hash[s] ++ ;
        }
        return res;
    }
};
```

### [5204. 统计为蚁群构筑房间的不同顺序](https://leetcode-cn.com/problems/count-ways-to-build-rooms-in-an-ant-colony/) [TAG]

计数类问题：**求有多少种不同的拓扑排序数量（可重集排列问题）**

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10, MOD = 1e9 + 7;
    int h[N], e[N], ne[N], idx;
    int f[N], g[N];
    int s[N], sz[N];
    int n;
    
    int qmi(int a, int k) {
        int ret = 1;
        while (k) {
            if (k & 1)
                ret = (LL)ret * a % MOD;
            a = (LL)a * a % MOD;
            k >>= 1;
        }
        return ret;
    }
    
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
        f[0] = g[0] = 1;
        for (int i = 1; i <= n; ++ i ) {
            f[i] = f[i - 1] * (LL)i % MOD;
            g[i] = g[i - 1] * (LL)qmi(i, MOD - 2) % MOD;
        }
    }
    
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    // 单向边 不需要记录fa
    int dfs(int u) {
        sz[u] = 0;  // 初始时不包括跟节点
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            dfs(j);
            sz[u] += sz[j];
        }
        // 所有子树的和的阶乘
        s[u] = f[sz[u]];
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            // 子树数量逆元 子树方案数
            s[u] = (LL)s[u] * g[sz[j]] % MOD;
            s[u] = (LL)s[u] * s[j] % MOD;
        }
        sz[u] ++ ;
        return s[u];
    }
    
    int waysToBuildRooms(vector<int>& prevRoom) {
        this->n = prevRoom.size();
        init();
        for (int i = 1; i < n; ++ i )
            add(prevRoom[i], i);
        return dfs(0);
    }
};
```
