#  [210. 课程表 II](https://leetcode-cn.com/problems/course-schedule-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    // 1. 迭代
    vector<int> findOrder(int n, vector<vector<int>>& edges) {
        vector<vector<int>> g(n);
        vector<int> d(n);
        for (auto& e: edges) {
            int b = e[0], a = e[1];
            g[a].push_back(b);
            d[b] ++ ;
        }
        queue<int> q;
        for (int i = 0; i < n; i ++ )
            if (d[i] == 0)
                q.push(i);

        vector<int> res;
        while (q.size()) {
            auto t = q.front();
            q.pop();
            res.push_back(t);
            for (int i: g[t])
                if ( -- d[i] == 0)
                    q.push(i);
        }
        if (res.size() < n) res = {};
        return res;
    }

    // 2. 递归
    int t;
    bool dfs(int u, vector<vector<int>>& G, vector<int>& c, vector<int>& topo) {
        c[u] = -1;
        //for(int v = 0; v < t; ++v) if(G[u][v])
        for(auto v : G[u]) {
            if(c[v] < 0) return false;
            else if(!c[v] && !dfs(v, G, c, topo)) return false;
        }
        c[u] = 1;
        topo[--t] = u;
        return true;
    }
    vector<int> findOrder_2(int n, vector<vector<int>>& prerequisites) {
        t = n;
        vector<vector<int>> G(n);
        for(auto v : prerequisites) G[v[1]].push_back(v[0]);
        vector<int> c(n);
        vector<int> topo(n);

        for(int u = 0; u < n; ++u) if(!c[u]) {
            if(!dfs(u, G, c, topo)) return vector<int>{};
        }
        return topo;
    }
};
```



```python3

```

