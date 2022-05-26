## [比赛链接](https://leetcode.cn/contest/weekly-contest-289/)

>   virtual rank: 160 / 7293


### [2243. 计算字符串的数字和](https://leetcode.cn/problems/calculate-digit-sum-of-a-string/)

略

```c++
class Solution {
public:
    string digitSum(string s, int k) {
        while (s.size() > k) {
            string ns;
            {
                int n = s.size(), d = n / k;
                for (int i = 0; i < d; ++ i ) {
                    int j = i * k, c = 0;
                    for (int x = j; x < j + k; ++ x )
                        c += s[x] - '0';
                    ns += to_string(c);
                }
                if (d * k < n) {
                    int c = 0;
                    for (int i = d * k; i < n; ++ i )
                        c += s[i] - '0';
                    ns += to_string(c);
                }
            }
            s = ns;
        }
        return s;
    }
};
```


### [2244. 完成所有任务需要的最少轮数](https://leetcode.cn/problems/minimum-rounds-to-complete-all-tasks/)

略

```c++
class Solution {
public:
    int minimumRounds(vector<int>& tasks) {
        unordered_map<int, int> hash;
        for (auto & x : tasks)
            hash[x] ++ ;
        
        int res = 0;
        for (auto [x, v] : hash) {
            if (v == 1)
                return -1;
            if (v <= 3)
                res ++ ;
            else {
                int k = v % 3;
                if (k == 1)
                    res += v / 3 - 1, res += 2;
                else if (k == 2)
                    res += v / 3 + 1;
                else
                    res += v / 3;
            }
            // cout << " x = " << x << " v = " << v << " res = " << res << endl;
        }
        return res;
    }
};
```

### [2245. 转角路径的乘积中最多能有几个尾随零](https://leetcode.cn/problems/maximum-trailing-zeros-in-a-cornered-path/)

简单前缀和 题意坑（可以不转弯）

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    int n, m;
    vector<vector<PII>> g, gu, gl, gr, gd;
    
    int maxTrailingZeros(vector<vector<int>>& grid) {
        this->n = grid.size(), this->m = grid[0].size();
        this->g = this->gu = this->gl = this->gr = this->gd = vector<vector<PII>>(n + 2, vector<PII>(m + 2));
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                int x = grid[i - 1][j - 1];
                int c2 = 0, c5 = 0;
                while (x % 2 == 0)
                    x /= 2, c2 ++ ;
                while (x % 5 == 0)
                    x /= 5, c5 ++ ;
                g[i][j] = PII{c2, c5};
                // cout << " i = " << i << " j = " << j << " c2 = " << c2 << " c5 = " << c5 << endl;
            }
        
        int res = 0;
        // 根据题意，可以直接一条直线
        for (int i = 1; i <= n; ++ i ) {
            for (int j = 1; j <= m; ++ j ) {
                gl[i][j].first += gl[i][j - 1].first + g[i][j].first, gl[i][j].second += gl[i][j - 1].second + g[i][j].second;
            }
            res = max(res, min(gl[i][m].first, gl[i][m].second));
            for (int j = m; j >= 1; -- j ) {
                gr[i][j].first += gr[i][j + 1].first + g[i][j].first, gr[i][j].second += gr[i][j + 1].second + g[i][j].second;
            }
            res = max(res, min(gr[i][1].first, gr[i][1].second));
        }
        for (int j = 1; j <= m; ++ j ) {
            for (int i = 1; i <= n; ++ i ) {
                gu[i][j].first += gu[i - 1][j].first + g[i][j].first, gu[i][j].second += gu[i - 1][j].second + g[i][j].second;
            }
            res = max(res, min(gu[n][j].first, gu[n][j].second));
            for (int i = n; i >= 1; -- i ) {
                gd[i][j].first += gd[i + 1][j].first + g[i][j].first, gd[i][j].second += gd[i + 1][j].second + g[i][j].second;
            }
            res = max(res, min(gd[1][j].first, gd[1][j].second));
        }
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                auto [t2, t5] = g[i][j];
                // u, r
                if (i - 1 >= 1 && j + 1 <= m) {
                    int c2 = gu[i - 1][j].first + gr[i][j + 1].first;
                    int c5 = gu[i - 1][j].second + gr[i][j + 1].second;
                    // cout << " u, r " << c2 << " " << c5 << endl;
                    res = max(res, min(t2 + c2, t5 + c5));
                }
                // r, d
                if (i + 1 <= n && j + 1 <= m) {
                    int c2 = gd[i + 1][j].first + gr[i][j + 1].first;
                    int c5 = gd[i + 1][j].second + gr[i][j + 1].second;
                    // cout << " d, r " << c2 << " " << c5 << endl;
                    res = max(res, min(t2 + c2, t5 + c5));
                }
                // d, l
                if (i + 1 <= n && j - 1 >= 1) {
                    int c2 = gd[i + 1][j].first + gl[i][j - 1].first;
                    int c5 = gd[i + 1][j].second + gl[i][j - 1].second;
                    // cout << " d, l " << c2 << " " << c5 << endl;
                    res = max(res, min(t2 + c2, t5 + c5));
                }
                // l, u
                if (i - 1 >= 1 && j - 1 >= 1) {
                    int c2 = gu[i - 1][j].first + gl[i][j - 1].first;
                    int c5 = gu[i - 1][j].second + gl[i][j - 1].second;
                    // cout << " u, l " << c2 << " " << c5 << endl;
                    res = max(res, min(t2 + c2, t5 + c5));
                }
                
                // cout << " i = " << i << " j = " << j << " res = " << res << endl;
            }
        return res;
    }
};
```

### [2246. 相邻字符不同的最长路径](https://leetcode.cn/problems/longest-path-with-different-adjacent-characters/)

显然相同字符不能连边，最终会形成森林

森林里找直径即可

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = N << 1;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n, d;
    bool st[N];
    int d1[N], d2[N];
    
    void dfs(int u, int fa) {
        st[u] = true;
        d1[u] = d2[u] = 1;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            dfs(j, u);
            if (d1[j] + 1 >= d1[u])
                d2[u] = d1[u], d1[u] = d1[j] + 1;
            else if (d1[j] + 1 > d2[u])
                d2[u] = d1[j] + 1;
        }
        // cout << "... u = " << u << " " << d1[u] << " " << d2[u] << endl;
        d = max(d, d1[u] + d2[u] - 1);
    }
    
    int longestPath(vector<int>& parent, string s) {
        init();
        
        n = parent.size();
        for (int i = 1; i < n; ++ i ) {
            int a = parent[i], b = i;
            if (s[a] != s[b])
                add(a, b), add(b, a);
        }
        
        int res = 0;
        memset(st, 0, sizeof st);
        for (int i = 0; i < n; ++ i )
            if (!st[i]) {
                d = 0;
                dfs(i, -1);
                res = max(res, d);
                // cout << " i = " << i << " d = " << d << endl;
            }
        return res;
    }
};
```
