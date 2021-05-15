#  [797. 所有可能的路径](https://leetcode-cn.com/problems/all-paths-from-source-to-target/)

## 题意



## 题解



```c++
class Solution {
public:
    int n;
    vector<vector<int>> g;
    vector<vector<int>> ans;
    vector<int> path;

    void dfs(int u) {
        path.push_back(u);
        if (u == n - 1) ans.push_back(path);
        for (auto v: g[u]) dfs(v);
        path.pop_back();
    }

    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        g = graph;
        n = g.size();
        dfs(0);
        return ans;
    }
};
```



```python3

```

