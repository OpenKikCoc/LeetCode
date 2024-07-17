#  [785. 判断二分图](https://leetcode.cn/problems/is-graph-bipartite/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> g;
    vector<int> color;

    bool dfs(int u, int c) {
        color[u] = c;
        for (auto v : g[u])
            if (color[v] != -1) {
                if (color[v] == c)
                    return false;
            } else if (!dfs(v, c ^ 1))
                return false;
        return true;
    }

    bool isBipartite(vector<vector<int>>& graph) {
        g = graph;
        color = vector<int>(g.size(), -1);

        for (int i = 0; i < g.size(); ++ i )
            if (color[i] == -1)
                if (!dfs(i, 0))
                    return false;
        return true;
    }
};
```



```python3

```

