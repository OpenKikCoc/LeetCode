## [比赛链接](https://leetcode.cn/contest/weekly-contest-345/)


### [2682. 找出转圈游戏输家](https://leetcode.cn/problems/find-the-losers-of-the-circular-game/)



```c++
class Solution {
public:
    const static int N = 55;
    
    bool st[N];
    vector<int> circularGameLosers(int n, int k) {
        memset(st, 0, sizeof st);
        for (int p = 0, t = 1; st[p] == false; ) {
            st[p] = true;
            p = (p + t * k) % n;
            ++ t ;
        }
        
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            if (st[i] == false)
                res.push_back(i + 1);
        return res;
    }
};
```


### [2683. 相邻值的按位异或](https://leetcode.cn/problems/neighboring-bitwise-xor/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int f[N];
    
    bool doesValidArrayExist(vector<int>& derived) {
        int n = derived.size();
        f[0] = derived[0];
        for (int i = 1; i < n; ++ i )
            f[i] = f[i - 1] ^ derived[i - 1];
        
        return f[n - 1] ^ f[0] == derived[n - 1];
    }
};
```

更简单的思路：

```c++
class Solution {
public:
    bool doesValidArrayExist(vector<int>& derived) {
        int res = 0;
        for (auto x : derived)
            res ^= x;
        return res == 0;
    }
};
```



### [2684. 矩阵中移动的最大次数](https://leetcode.cn/problems/maximum-number-of-moves-in-a-grid/)

实际上可以不用提前完整建图，直接 bfs 时找可行位置即可，略

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = 5e5 + 10, INF = 0x3f3f3f3f;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }

    int dx[3] = {-1, 0, 1};
    
    int n, m;
    vector<vector<int>> g;
    int din[N];

    int d[N], q[N];

    void bfs() {
        memset(d, 0, sizeof d);
        int hh = 0, tt = -1;
        // 【只能从第一列开始移动】
        for (int i = 0; i < n; ++ i ) {
            if (din[i * m] == 0) {
                q[ ++ tt] = i * m, d[i] = 0;
            }
        }
        
        while (hh <= tt) {
            int t = q[hh ++ ];
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                if (d[j] < d[t] + 1)
                    d[j] = d[t] + 1, q[ ++ tt] = j;
            }
        }
    }
    
    int maxMoves(vector<vector<int>>& grid) {
        init();
        this->g = grid, this->n = g.size(), this->m = g[0].size();
        
        memset(din, 0, sizeof din);
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                int u = i * m + j;
                for (int k = 0; k < 3; ++ k ) {
                    int ni = i + dx[k], nj = j + 1;
                    if (ni < 0 || ni >= n || nj < 0 || nj >= m)
                        continue;
                    if (g[ni][nj] <= g[i][j])
                        continue;
                    int v = ni * m + nj;
                    add(u, v);
                    din[v] ++ ;
                }
            }
        
        bfs();
        
        int res = 0;
        for (int i = 0; i < n; ++ i ) {
            for (int j = 0; j < m; ++ j ) {
                // cout << d[i * m + j] << ' ';
                res = max(res, d[i * m + j]);
            }
            // cout << endl;
        }
            
        return res;
    }
};
```

### [2685. 统计完全连通分量的数量](https://leetcode.cn/problems/count-the-number-of-complete-components/)



```c++
class Solution {
public:
    const static int N = 55, M = 5010;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    bool st[N];
    int cn, ce;
    void dfs(int u) {
        cn ++ ;
        st[u] = true;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            ce ++ ;
            if (st[j])
                continue;
            dfs(j);
        }
    }
    
    int countCompleteComponents(int n, vector<vector<int>>& edges) {
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        int res = 0;
        memset(st, 0, sizeof st);
        for (int i = 0; i < n; ++ i )
            if (!st[i]) {
                cn = 0, ce = 0;
                dfs(i);
                if (cn * (cn - 1) == ce)
                    res ++ ;
            }
        return res;
    }
};
```
