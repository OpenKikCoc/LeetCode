#  [310. 最小高度树](https://leetcode.cn/problems/minimum-height-trees/)

## 题意



## 题解

暴力枚举每个节点作为根节点的树高度

树 DP

```c++
class Solution {
public:
    vector<vector<int>> g;
    vector<int> d1, d2, p1, up;
    void dfs_d(int u, int fa) {
        for (auto v : g[u]) if (v != fa) {
            dfs_d(v, u);
            int d = d1[v] + 1;
            if (d >= d1[u]) d2[u] = d1[u], d1[u] = d, p1[u] = v;
            else if (d > d2[u]) d2[u] = d;
        }
    }
    void dfs_u(int u, int fa) {
        for (auto v : g[u]) if (v != fa) {
            if (p1[u] == v) up[v] = max(up[u], d2[u]) + 1;
            else up[v] = max(up[u], d1[u]) + 1;
            dfs_u(v, u);
        }
    }
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        g.resize(n);
        d1 = d2 = p1 = up = vector<int>(n);
        for (auto & e : edges) g[e[0]].push_back(e[1]), g[e[1]].push_back(e[0]);

        dfs_d(0, -1);
        dfs_u(0, -1);

        int mind = n + 1;
        for (int i = 0; i < n; ++i) mind = min(mind, max(up[i], d1[i]));
        vector<int> res;
        for (int i = 0; i < n; ++i)
            if (max(up[i], d1[i]) == mind) res.push_back(i);
        return res;
    }
};
```



很久以前的代码:

>   1.  从叶子结点开始，每一轮删除所有叶子结点。
>   2.  删除后，会出现新的叶子结点，此时再删除。
>   3.  重复以上过程直到剩余 1 个或 2 个结点，此时这 1 个或 2 个结点就是答案。

```c++
class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        vector<int> ans;
        vector<int> degree(n);  // 初始化度为0
        vector<vector<int>> G(n);
        queue<int> q;
        if (n == 1) {
            ans.push_back(0);
            return ans;
        }
        for (auto e : edges) {
            G[e[0]].push_back(e[1]);
            G[e[1]].push_back(e[0]);
            ++ degree[e[0]] ;
            ++ degree[e[1]] ;
        }
        for (int i = 0; i < n; ++ i ) 
            if (degree[i] == 1)
                q.push(i);
        int left = n;
        while (left > 2) {
            int len = q.size();
            left -= len;
            while (len -- ) {
                int u = q.front(); q.pop();
                for (auto v : G[u]) {
                    if (degree[v] > 0) -- degree[v] ;
                    if (degree[v] == 1) q.push(v);
                }
            }
        }
        while (!q.empty()) {
            ans.push_back(q.front());
            q.pop();
        }
        return ans;
    }
};
```





```python3

```

