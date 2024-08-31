## [比赛链接](https://leetcode.cn/contest/weekly-contest-409/)


###  [3242. 设计相邻元素求和服务](https://leetcode.cn/problems/design-neighbor-sum-service/) 



```c++
class NeighborSum {
public:
    const static int N = 110;
    
    int n;
    int h[N];
    vector<vector<int>> g;
    
    NeighborSum(vector<vector<int>>& grid) {
        this->g = grid;
        this->n = g.size();
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < n; ++ j )
                h[grid[i][j]] = i * n + j;
    }
    
    int dx1[4] = {-1, 0, 1, 0}, dy1[4] = {0, 1, 0, -1};
    int adjacentSum(int value) {
        int x = h[value] / n, y = h[value] % n;
        int ret = 0;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx1[i], ny = y + dy1[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= n)
                continue;
            ret += g[nx][ny];
        }
        return ret;
    }
    
    int dx2[4] = {-1, -1, 1, 1}, dy2[4] = {-1, 1, 1, -1};
    int diagonalSum(int value) {
        int x = h[value] / n, y = h[value] % n;
        int ret = 0;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx2[i], ny = y + dy2[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= n)
                continue;
            ret += g[nx][ny];
        }
        return ret;
    }
};

/**
 * Your NeighborSum object will be instantiated and called as such:
 * NeighborSum* obj = new NeighborSum(grid);
 * int param_1 = obj->adjacentSum(value);
 * int param_2 = obj->diagonalSum(value);
 */
```


###  [3243. 新增道路查询后的最短距离 I](https://leetcode.cn/problems/shortest-distance-after-road-addition-queries-i/) [TAG]

**unidirectional** : 单向 uni

```yaml
14
[[0,6],[4,12]]
预期结果为啥是 [8,6]
=> 没有考虑到先到6再回来走 4-12 而是直接走 1-4-12-13
=> 因为 unidirectional 是单向的意思...
```

BFS

```c++
class Solution {
public:
    // 题目求的永远都是从 0 到 n-1 的距离
    // 考虑每次加边 [u, v] 的影响: 由于【单向边】左侧的点集 距离[可能]变小
    
    const static int N = 510, M = 1010;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    vector<int> shortestDistanceAfterQueries(int n, vector<vector<int>>& queries) {
        init();
        for (int i = 0; i < n - 1; ++ i )
            add(i, i + 1);
        
        vector<int> res;
        for (auto & qs : queries) {
            int u = qs[0], v = qs[1];
            add(u, v);
            
            static int d[N];
            static bool st[N];
            memset(d, 0x3f, sizeof d);
            memset(st, 0, sizeof st);   // ATTENTION
            queue<int> q;
            q.push(0); d[0] = 0;
            
            // 每次执行 bfs，而非 bellman ford OR floyd
            while (q.size()) {
                int u = q.front(); q.pop();
                if (st[u])
                    continue;
                st[u] = true;
                for (int i = h[u]; ~i; i = ne[i]) {
                    int j = e[i];
                    if (d[j] > d[u] + 1) {
                        d[j] = d[u] + 1;
                        q.push(j);
                    }
                }
            }
            
            res.push_back(d[n - 1]);
        }
        return res;
    }
};
```

###  [3244. 新增道路查询后的最短距离 II](https://leetcode.cn/problems/shortest-distance-after-road-addition-queries-ii/) [TAG]

不太 general 的做法

```c++
class Solution {
public:
    // 相对于上题 增加约束条件: 两个 query 要么包含、要么互斥，不会交叉
    // => 推导可知 最优路径一定是唯一的 节省的长度为最长的区间覆盖
    // => 有大的区间一定用大的区间
    // 问题在于...怎么动态维护 => 贪心 维护中间的【区间边】
    
    using PII = pair<int, int>;
    
    vector<int> shortestDistanceAfterQueries(int n, vector<vector<int>>& queries) {
        set<PII> S;
        for (int i = 0; i < n - 1; ++ i )
            S.insert({i, i + 1});
        
        vector<int> res;
        for (auto & qs : queries) {
            int l = qs[0], r = qs[1];
            auto it = S.lower_bound({l, -1});
            if (it != S.end() && it->first == l && it->second < r) {
                // 有更小的区间 踢掉加入当前
                while (it != S.end() && it->first < r)
                    it = S.erase(it);   // ATTENTION [l, r)
                S.insert({l, r});
            } // else 当前的不需要加入
            res.push_back(S.size());    // ATTENTION
        }
        return res;
    }
};
```

区间并查集

```c++
class Solution {
public:
    // 相对于上题 增加约束条件: 两个 query 要么包含、要么互斥，不会交叉
    // => 推导可知 最优路径一定是唯一的 节省的长度为最长的区间覆盖
    // => 有大的区间一定用大的区间
    // 问题在于...怎么动态维护
    // => 本质可以结合并查集 维护联通分量个数
    
    const static int N = 1e5 + 10;
    
    int pa[N];
    void init() {
        for (int i = 0; i < N; ++ i )
            pa[i] = i;
    }
    int find(int x) {
        if (pa[x] != x)
            pa[x] = find(pa[x]);
        return pa[x];
    }
    
    vector<int> shortestDistanceAfterQueries(int n, vector<vector<int>>& queries) {
        init();
        
        vector<int> res;
        int tot = n - 1;    // 联通分量个数
        for (auto & qs : queries) {
            int l = qs[0], r = qs[1];
            int pa_r = find(r - 1); // ATTENTION r-1
            for (int i = find(l); i < r - 1;) {
                pa[i] = pa_r;
                tot -- ;
                i = find(i + 1);
            }
            res.push_back(tot);
        }
        return res;
    }
};
```

###  [3245. 交替组 III](https://leetcode.cn/problems/alternating-groups-iii/) [TAG]



```c++

```
