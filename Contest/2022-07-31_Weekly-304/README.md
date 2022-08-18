## [比赛链接](https://leetcode.cn/contest/weekly-contest-304/)

>   virtual rank: 165 / 7372


### [2357. 使数组中所有元素都等于零](https://leetcode.cn/problems/make-array-zero-by-subtracting-equal-amounts/)



```c++
class Solution {
public:
    int minimumOperations(vector<int>& nums) {
        unordered_set<int> S;
        for (auto x : nums)
            if (x)
                S.insert(x);
        return S.size();
    }
};
```


### [2358. 分组的最大数量](https://leetcode.cn/problems/maximum-number-of-groups-entering-a-competition/)



```c++
class Solution {
public:
    int maximumGroups(vector<int>& grades) {
        int n = grades.size();
        int res = 0;
        while (n - (res + 1) >= 0) {
            res ++ , n -= res;
        }
        return res;
    }
};
```

### [2359. 找到离给定两个节点最近的节点](https://leetcode.cn/problems/find-closest-node-to-given-two-nodes/)

坑：传了 `int sth[]` 数组的不要在数组内部 memset

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = N, INF = 0x3f3f3f3f;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int d[2][N], n;
    
    void bfs(int u, int dist[]) {
        dist[u] = 0;
        queue<int> q;
        q.push(u);
        
        while (q.size()) {
            int t = q.front(); q.pop();
            
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                if (dist[j] > dist[t] + 1) {
                    dist[j] = dist[t] + 1;
                    q.push(j);
                }
            }
        }
    }
    
    int closestMeetingNode(vector<int>& edges, int node1, int node2) {
        init();
        this->n = edges.size();
        for (int i = 0; i < n; ++ i )
            if (edges[i] != -1)
                add(i, edges[i]);
        
        memset(d, 0x3f, sizeof d);
        bfs(node1, d[0]);
        bfs(node2, d[1]);
        
        int v = INF, p = -1;
        for (int i = 0; i < n; ++ i ) {
            int t = max(d[0][i], d[1][i]);
            if (t > INF / 2)
                continue;
            if (p == -1 || p != -1 && v > t)
                p = i, v = t;
        }
        return p;
    }
};
```

### [2360. 图中的最长环](https://leetcode.cn/problems/longest-cycle-in-a-graph/)

题目约束：每个节点 **至多** 有一条出边。

直接 tarjan 找最大的分量即可

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = N;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    
    int dfn[N], low[N], timestamp;
    int stk[N], top;
    bool in_stk[N];
    int scc_cnt, sz[N];
    
    void tarjan(int u) {
        dfn[u] = low[u] = ++ timestamp;
        stk[ ++ top] = u, in_stk[u] = true;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (!dfn[j]) {
                tarjan(j);
                low[u] = min(low[u], low[j]);
            } else if (in_stk[j])
                low[u] = min(low[u], dfn[j]);
        }
        if (dfn[u] == low[u]) {
            ++ scc_cnt;
            int y;
            do {
                y = stk[top -- ];
                in_stk[y] = false;
                sz[scc_cnt] ++ ;
            } while (y != u);
        }
    }
    
    int longestCycle(vector<int>& edges) {
        init();
        this->n = edges.size();
        for (int i = 0; i < n; ++ i )
            if (edges[i] != -1)
                add(i, edges[i]);
        /* 可以省略
        {
            memset(dfn, 0, sizeof dfn), memset(low, 0, sizeof low);
            timestamp = 0;
            top = 0;
            memset(in_stk, 0, sizeof in_stk);
            memset(sz, 0, sizeof sz);
            scc_cnt = 0;
        }
        */
        for (int i = 0; i < n; ++ i )
            if (!dfn[i])
                tarjan(i);
        
        int res = -1;
        for (int i = 1; i <= scc_cnt; ++ i )
            res = max(res, sz[i] > 1 ? sz[i] : -1);
        return res;
    }
};
```
