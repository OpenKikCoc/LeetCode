#  [685. 冗余连接 II](https://leetcode.cn/problems/redundant-connection-ii/)

## 题意



## 题解

1.  出现了环 （有一条边连向了根结点）删掉一边即可
2.  无环 但某个点入度为二（某个一子树节点连向了另一子树节点）去除两个入度的任意一个都可
3.  环且某个点入度为二（某个节点连向了其祖先节点）只能删掉12情况的公共边

```c++
class Solution {
public:
    int n;
    vector<bool> st1, st2, st, in_k, in_c;
    vector<vector<int>> g;
    stack<int> stk;

    bool dfs(int u) {
        st[u] = true;
        stk.push(u), in_k[u] = true;

        for (int x : g[u]) {
            if (!st[x]) {
                if (dfs(x))
                    return true;
            } else if (in_k[x]) {
                while (stk.top() != x) {
                    in_c[stk.top()] = true;
                    stk.pop();
                }
                in_c[x] = true;
                return true;
            }
        }

        stk.pop(), in_k[u] = false;
        return false;
    }

    void work1(vector<vector<int>> & edges) {
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            g[a].push_back(b);
        }
        for (int i = 1; i <= n; ++ i )
            if (!st[i] && dfs(i))
                break;
        for (int i = 0; i < n; ++ i ) {
            int a = edges[i][0], b = edges[i][1];
            if (in_c[a] && in_c[b])
                st1[i] = true;
        }
    }

    void work2(vector<vector<int>> & edges) {
        vector<int> p(n + 1, -1);
        for (int i = 0; i < n; ++ i ) {
            int a = edges[i][0], b = edges[i][1];
            if (p[b] != -1) {
                st2[p[b]] = st2[i] = true;
                break;
            } else
                p[b] = i;
        }
    }

    vector<int> findRedundantDirectedConnection(vector<vector<int>>& edges) {
        n = edges.size();
        st1 = st2 = st = in_k = in_c = vector<bool>(n + 1);
        g.resize(n + 1);
        work1(edges);
        work2(edges);

        for (int i = n - 1; i >= 0; -- i )
            if (st1[i] && st2[i])
                return edges[i];
        for (int i = n - 1; i >= 0; -- i )
            if (st1[i] || st2[i])
                return edges[i];
        return {};
    }
};
```

旧代码：

```c++
struct UnionFind {
    vector<int> fa;
    UnionFind(int n) {
        fa.resize(n);
        for (int i = 0; i < n; ++ i ) fa[i] = i;
    }
    int find(int x) {
        if (fa[x] == x) return x;
        return fa[x] = find(fa[x]);
    }
    void merge(int u, int v) {
        fa[find(u)] = find(v);
    }
};

class Solution {
public:
    vector<int> findRedundantDirectedConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        UnionFind uf = UnionFind(n+1);
        vector<int> pa(n + 1);
        for (int i = 1; i <= n; ++ i ) pa[i] = i;
        int conflict = -1, cycle = -1;
        for (int i = 0; i < n; ++ i ) {
            int u = edges[i][0], v = edges[i][1];
            if (pa[v] != v) conflict = i;       // v作为后继已经有了前序
            else {
                pa[v] = u;
                if (uf.find(u) == uf.find(v)) cycle = i;      // 成环
                else uf.merge(u, v);
            }
        }
        if (conflict < 0) return edges[cycle];
        else {
            if (cycle < 0) return edges[conflict];
            else return vector<int>{pa[edges[conflict][1]], edges[conflict][1]};
        }
    }
};
```



```python3

```

