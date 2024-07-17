## [比赛链接](https://leetcode.cn/contest/weekly-contest-250)

>   ranking 466 / 4314


### [5161. 可以输入的最大单词数](https://leetcode.cn/problems/maximum-number-of-words-you-can-type/)

模拟即可 略

```c++
class Solution {
public:
    int canBeTypedWords(string text, string brokenLetters) {
        unordered_set<char> S;
        for (auto c : brokenLetters)
            S.insert(c);
        stringstream ss(text);
        string s;
        int res = 0;
        while (ss >> s) {
            bool f = true;
            for (auto c : s)
                if (S.count(c)) {
                    f = false;
                    break;
                }
            if (f)
                res ++ ;
        }
        return res;
    }
};
```


### [5814. 新增的最少台阶数](https://leetcode.cn/problems/add-minimum-number-of-rungs/)

贪心即可

```c++
class Solution {
public:
    int addRungs(vector<int>& rungs, int dist) {
        int s = 0, res = 0;
        for (auto v : rungs) {
            if (s + dist < v) {
                int d = v - s;
                int c = d / dist;
                if (d % dist == 0)
                    c -- ;
                res += c;
            }
            s = max(s, v);
        }
        return res;
    }
};
```

更简单些

```c++
class Solution {
public:
    int addRungs(vector<int>& rungs, int dist) {
        int s = 0, res = 0;
        for (auto v : rungs) {
            res += (v - s - 1) / dist;
            s = v;
        }
        return res;
    }
};
```



### [5815. 扣分后的最大得分](https://leetcode.cn/problems/maximum-number-of-points-with-cost/) [TAG]

尝试根据状态转移方程【拆掉绝对值表达式】

**经典DP优化**

```c++
class Solution {
public:
    using LL = long long;
    const int INF = 0x3f3f3f3f;
    int n, m;
    vector<vector<int>> ps;
    vector<LL> f, g;
    
    long long maxPoints(vector<vector<int>>& points) {
        this->ps = points;
        this->n = ps.size(), this->m = ps[0].size();
        
        f = g = vector<LL>(m);
        
        for (int i = 0; i < m; ++ i )
            f[i] = ps[0][i];
        
        for (int i = 1; i < n; ++ i ) {
            g = f;
            {
                LL maxv = -INF;
                for (int j = 0; j < m; ++ j ) {
                    maxv = max(maxv, g[j] + j);
                    f[j] = max(f[j], ps[i][j] - j + maxv);
                }
            }
            {
                LL maxv = -INF;
                for (int j = m - 1; j >= 0; -- j ) {
                    maxv = max(maxv, g[j] - j);
                    f[j] = max(f[j], ps[i][j] + j + maxv);
                }
            }
        }
        return *max_element(f.begin(), f.end());
    }
};
```

### [5816. 查询最大基因差](https://leetcode.cn/problems/maximum-genetic-difference-query/) [TAG]

离线处理即可

**涉及到 Trie 中删除元素 思路**

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1e5 + 10, M = 2e5 * 18 + 10;
    
    int n, m, root;
    
    // ------------------ es ------------------
    int h[N], e[N], ne[N], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
        tot = 0;    // trie
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    // ------------------ trie ------------------
    int son[M][2], cnt[M], tot; // cnt for count
    void insert(int x) {
        int p = 0;
        for (int i = 30; i >= 0; -- i ) {
            int t = x >> i & 1;
            if (!son[p][t])
                son[p][t] = ++ tot ;
            p = son[p][t];
            cnt[p] ++ ; // ATTENTION
        }
    }
    void remove(int x) {
        int p = 0;
        for (int i = 30; i >= 0; -- i ) {
            int t = x >> i & 1;
            p = son[p][t];
            cnt[p] -- ;
        }
    }
    int query(int x) {
        int p = 0, res = 0;
        for (int i = 30; i >= 0; -- i ) {
            int t = x >> i & 1;
            // ATTENTION
            if (son[p][!t] && cnt[son[p][!t]]) {
                res |= 1 << i;
                p = son[p][!t];
            } else
                p = son[p][t];
        }
        return res;
    }
    
    // ------------------ dfs ------------------
    unordered_map<int, vector<PII>> qs;
    vector<int> res;
    void dfs(int u, int pa) {
        insert(u);
        
        for (auto [val, id] : qs[u])
            res[id] = query(val);
        
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            dfs(j, u);
        }
        remove(u);
    }
    
    vector<int> maxGeneticDifference(vector<int>& parents, vector<vector<int>>& queries) {
        init();
        
        this->n = parents.size();
        for (int i = 0; i < n; ++ i ) {
            if (parents[i] == -1)
                root = i;
            else
                add(parents[i], i);
        }
        
        this->m = queries.size();
        for (int i = 0; i < m; ++ i ) {
            int node = queries[i][0], val = queries[i][1];
            qs[node].push_back({val, i});
        }
        
        res = vector<int>(m);
        
        dfs(root, -1);
        
        return res;
    }
};
```
