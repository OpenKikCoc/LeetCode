## [比赛链接](https://leetcode.cn/contest/biweekly-contest-99/)

>   virtual rank: 126 / 3467


### [2578. 最小和分割](https://leetcode.cn/problems/split-with-minimum-sum/)



```c++
class Solution {
public:
    int splitNum(int num) {
        string s = to_string(num);
        sort(s.begin(), s.end());
        string a, b;
        for (int i = 0; i < s.size(); ++ i )
            if (i & 1)
                a += s[i];
            else
                b += s[i];
        return stoi(a) + stoi(b);
    }
};
```


### [2579. 统计染色格子数](https://leetcode.cn/problems/count-total-number-of-colored-cells/)



```c++
class Solution {
public:
    // 1, +1*4, +2*4, +3*4, 
    
    using LL = long long;
    long long coloredCells(int n) {
        LL res = 1;
        for (int i = 2; i <= n; ++ i )
            res += (i - 1) * 4;
        return res;
    }
};
```

### [2580. 统计将重叠区间合并成组的方案数](https://leetcode.cn/problems/count-ways-to-group-overlapping-ranges/)

分析 简单快速幂即可

```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;
    const int N = 1e5 + 10, MOD = 1e9 + 7;
    
    int quick_pow(int a, int b) {
        LL ret = 1;
        while (b) {
            if (b & 1)
                ret = ret * a % MOD;
            a = (LL)a * a % MOD;
            b >>= 1;
        }
        return ret;
    }
    
    int countWays(vector<vector<int>>& ranges) {
        sort(ranges.begin(), ranges.end());
        
        vector<PII> xs;
        int st = -2e9, ed = -2e9;
        for (auto & r : ranges)
            if (ed < r[0]) {
                if (st != -2e9)
                    xs.push_back({st, ed});
                st = r[0], ed = r[1];
            } else
                ed = max(ed, r[1]);
        if (st != -2e9)
            xs.push_back({st, ed});
        
        // 需要把 m 组任意分配
        int m = xs.size();
        return quick_pow(2, m);
    }
};
```

### [2581. 统计可能的树根数目](https://leetcode.cn/problems/count-number-of-possible-root-nodes/)

显然经典树换根 DP

需要加快速度

```c++
class Solution {
public:
    // 数据范围 1e5 显然不能枚举哪些 guesses 为 true
    // 换个思路：
    //      考虑枚举根节点，则题意要求转化为【以某个节点为根的情况下 能满足 guesses 猜测 >= k 的情况】
    // 显然树dp + 换根
    
    const static int N = 1e5 + 10, M = 2e5 + 10;
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n, k;
    unordered_set<int> gs[N];
    int f[N], g[N];
    
    void dfs_d(int u, int pa) {
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            dfs_d(j, u);
            f[u] += f[j] + (gs[u].find(j) != gs[u].end());    // 如果 u 是 j 的父节点是一个已有的猜测
        }
    }
    void dfs_u(int u, int pa) {
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            int other = f[u] - f[j] - (gs[u].find(j) != gs[u].end());   // ATTENTION 理清思路：需要计算这一部分
            g[j] = g[u] + (gs[j].find(u) != gs[j].end()) + other;       // 如果 j 是 u 的父节点是一个已有的猜测
            dfs_u(j, u);
        }
    }
    
    int rootCount(vector<vector<int>>& edges, vector<vector<int>>& guesses, int k) {
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        this->n = edges.size() + 1, this->k = k;
        for (auto & g : guesses)
            gs[g[0]].insert(g[1]);
        
        memset(f, 0, sizeof f), memset(g, 0, sizeof g);
        dfs_d(0, -1);
        dfs_u(0, -1);
        
        // for (int i = 0; i < n; ++ i )
        //     cout << " i = " << i << " f = " << f[i] << " g = " << g[i] << endl;
        
        int res = 0;
        for (int i = 0; i < n; ++ i )
            if (f[i] + g[i] >= k)
                res ++ ;
        return res;
    }
};
```
