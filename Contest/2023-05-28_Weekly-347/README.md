## [比赛链接](https://leetcode.cn/contest/weekly-contest-347/)


### [2710. 移除字符串中的尾随零](https://leetcode.cn/problems/remove-trailing-zeros-from-a-string/)



```c++
class Solution {
public:
    string removeTrailingZeros(string num) {
        int n = num.size(), p = n;
        while (num[p - 1] == '0')
            p -- ;
        return num.substr(0, p);
    }
};
```


### [2711. 对角线上不同值的数量差](https://leetcode.cn/problems/difference-of-number-of-distinct-values-on-diagonals/)



```c++
class Solution {
public:
    const static int N = 110, M = 55;
    
    int l[N][M], r[N][M];
    
    vector<vector<int>> differenceOfDistinctValues(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        memset(l, 0, sizeof l), memset(r, 0, sizeof r);
        
        {
            unordered_set<int> S[N];
            for (int i = 1; i <= n; ++ i )
                for (int j = 1; j <= m; ++ j ) {
                    int x = i - j + M, y = j;
                    l[i][j] = S[x].size();
                    S[x].insert(grid[i - 1][j - 1]);
                }
        }
        {
            unordered_set<int> S[N];
            for (int i = n; i >= 1; -- i )
                for (int j = m; j >= 1; -- j ) {
                    int x = i - j + M, y = j;
                    r[i][j] = S[x].size();
                    S[x].insert(grid[i - 1][j - 1]);
                }
        }
        
        vector<vector<int>> res(n, vector<int>(m, 0));
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                int x = i - j + M, y = j;
                res[i - 1][j - 1] = abs(r[i][j] - l[i][j]);
            }
        return res;
    }
};
```

### [2712. 使所有字符相等的最小成本](https://leetcode.cn/problems/minimum-cost-to-make-all-characters-equal/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    const static LL INF = 1e15;
    
    // 考虑前后缀分解，分别记录从左边翻转到当前，且当前为 0/1 时的最小消耗
    LL l[N][2], r[N][2];
    void init() {
        for (int i = 0; i < N; ++ i )
            l[i][0] = r[i][0] = l[i][1] = r[i][1] = INF;
    }
    
    long long minimumCost(string s) {
        init();
        
        int n = s.size();
        l[0][0] = l[0][1] = r[n + 1][0] = r[n + 1][1] = 0;
        
        {
            for (int i = 1; i <= n; ++ i ) {
                int x = s[i - 1] - '0';
                if (x == 0)
                    l[i][0] = l[i - 1][0], l[i][1] = l[i - 1][0] + i;
                else
                    l[i][0] = l[i - 1][1] + i, l[i][1] = l[i - 1][1];
            }
        }
        {
            for (int i = n; i >= 1; -- i ) {
                int x = s[i - 1] - '0';
                if (x == 0)
                    r[i][0] = r[i + 1][0], r[i][1] = r[i + 1][0] + (n - i + 1);
                else
                    r[i][0] = r[i + 1][1] + (n - i + 1), r[i][1] = r[i + 1][1];
            }
        }
        
        LL res = INF;
        for (int i = 1; i <= n; ++ i )
            res = min(res, min(l[i - 1][0] + r[i][0], l[i - 1][1] + r[i][1]));
        
        return res;
    }
};
```

### [2713. 矩阵中严格递增的单元格数](https://leetcode.cn/problems/maximum-strictly-increasing-cells-in-a-matrix/) [TAG]

-   动态规划思想：

```c++
// TLE
// 超时原因在于 memcpy ==> 转化为借助一个二维数组(其他方式也行)作为临时记录 再二次遍历更新
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    int maxIncreasingCells(vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size();
        map<int, vector<PII>> h;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                h[mat[i][j]].push_back({i, j});
        
        int r[N], c[N];
        memset(r, 0, sizeof r), memset(c, 0, sizeof c);
        for (auto & [k, vs] : h) {
            static int nr[N], nc[N];
            memcpy(nr, r, sizeof r), memcpy(nc, c, sizeof c);
            for (auto & [x, y] : vs) {
                // 能从本行或者本列的最大值转移过来
                int t = max(r[x], c[y]) + 1;
                // nr[x] = nc[y] = max(max(nr[x], nc[y]), t); // WRONG
                nr[x] = max(nr[x], t);
                nc[y] = max(nc[y], t);
            }
            memcpy(r, nr, sizeof nr), memcpy(c, nc, sizeof nc);
        }
        int res = 0;
        for (int i = 0; i < n; ++ i )
            res = max(res, r[i]);
        for (int j = 0; j < m; ++ j )
            res = max(res, c[j]);
        return res;
    }
};
```

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    int maxIncreasingCells(vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size();
        map<int, vector<PII>> h;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                h[mat[i][j]].push_back({i, j});
        
        int r[N], c[N];
        memset(r, 0, sizeof r), memset(c, 0, sizeof c);
        int res = 1;
        vector<vector<int>> t(n, vector<int>(m));   // 记录
        for (auto & [k, vs] : h) {
            for (auto & [x, y] : vs) {
                t[x][y] = max(r[x], c[y]) + 1;
                res = max(res, t[x][y]);
            }
            for (auto & [x, y] : vs) {
                r[x] = max(r[x], t[x][y]);
                c[y] = max(c[y], t[x][y]);
            }
        }
        return res;
    }
};
```

-   DAG + 最长路思想

```c++
// TLE
// 只能走到严格大于的位置 则一定无环
using PII = pair<int, int>;
const static int N = 1e7 + 10;
int h[N], e[N], ne[N], idx;

void init() {
    memset(h, -1, sizeof h);
    idx = 0;
}
void add(int a, int b) {
    e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
}

class Solution {
public:
    int maxIncreasingCells(vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size();
        init();
        static int din[N];
        memset(din, 0, sizeof din);
        
        int p = n * m;
        // 1. 优化
        // 思考 按照贪心的思路一定是相邻大小的去跳跃 所以实际上不需要建太多边
        for (int i = 0; i < n; ++ i ) {
            map<int, vector<int>> h;
            for (int j = 0; j < m; ++ j )
                h[mat[i][j]].push_back(i * m + j);
            
            // 2. 优化
            // 对于前后两个数组建边，转化为存在【虚拟中间点】
            // 【仍然 TLE 考虑可能必须要转成双指针写法】
            vector<int> last;
            for (auto & [k, xs] : h) {
                for (auto x : last)
                    add(x, p), din[p] ++ ;
                for (auto y : xs)
                    add(p, y), din[y] ++ ;
                last = xs;
                p ++ ;
            }
        }
        for (int j = 0; j < m; ++ j ) {
            map<int, vector<int>> h;
            for (int i = 0; i < n; ++ i )
                h[mat[i][j]].push_back(i * m + j);
            
            vector<int> last;
            for (auto & [k, xs] : h) {
                for (auto x : last)
                    add(x, p), din[p] ++ ;
                for (auto y : xs)
                    add(p, y), din[y] ++ ;
                last = xs;
                p ++ ;
            }
        }
        
        static int q[N], d[N];
        static bool st[N];
        int hh = 0, tt = -1;
        memset(d, 0, sizeof d);
        
        for (int i = 0; i < p; ++ i )   // ATTENTION: i < p
            if (din[i] == 0)
                q[ ++ tt] = i, d[i] = 0;
        
        // 注意 使用拓扑而非bfs 减少反复入队出队
        int res = 0;
        while (hh <= tt) {
            int t = q[hh ++ ];
            res = max(res, d[t]);
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                d[j] = max(d[j], d[t] + (j < m * n));   // 需要去除虚拟中间点
                if ( -- din[j] == 0)
                    q[ ++ tt] = j;
                // if (d[j] < d[t] + 1) {
                //     d[j] = d[t] + 1;
                //     q[ ++ tt] = j;
                // }
            }
        }
        
        return res;
    }
};
```

