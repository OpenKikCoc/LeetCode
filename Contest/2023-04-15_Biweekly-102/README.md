## [比赛链接](https://leetcode.cn/contest/biweekly-contest-102/)

>   154 / 3058
>   regentropfenbinacs 虚拟竞赛
>   18
>   0:29:55
>   0:01:52
>   0:06:38
>   0:19:47
>   0:29:55


### [2639. 查询网格图中每一列的宽度](https://leetcode.cn/problems/find-the-width-of-columns-of-a-grid/)



```c++
class Solution {
public:
    vector<int> findColumnWidth(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        vector<int> res(m);
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                string s = to_string(grid[i][j]);
                res[j] = max(res[j], int(s.size()));
            }
        return res;
    }
};
```


### [2640. 一个数组所有前缀的分数](https://leetcode.cn/problems/find-the-score-of-all-prefixes-of-an-array/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL t[N];
    
    vector<long long> findPrefixScore(vector<int>& nums) {
        int n = nums.size();
        int maxv = 0;
        for (int i = 0; i < n; ++ i ) {
            maxv = max(maxv, nums[i]);
            t[i] = (LL)nums[i] + maxv;
        }
        vector<LL> res(n);
        for (int i = 0; i < n; ++ i )
            res[i] = (i ? res[i - 1] : 0) + t[i];
        return res;
    }
};
```

### [2641. 二叉树的堂兄弟节点 II](https://leetcode.cn/problems/cousins-in-binary-tree-ii/)



```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    const static int N = 1e5 + 10;
    
    unordered_map<TreeNode*, int> d;
    int sum[N];
    
    void dfs(TreeNode* u, TreeNode* pa, int depth) {
        if (u == nullptr)
            return;
        if (pa != nullptr)
            d[pa] += u->val;
        sum[depth] += u->val;
        dfs(u->left, u, depth + 1), dfs(u->right, u, depth + 1);
    }
    
    void f(TreeNode* u, TreeNode* pa, int depth) {
        if (u == nullptr)
            return;
        int tot = sum[depth];
        if (pa != nullptr)
            tot -= d[pa];
        u->val = tot;
        f(u->left, u, depth + 1), f(u->right, u, depth + 1);
    }
    
    TreeNode* replaceValueInTree(TreeNode* root) {
        memset(sum, 0, sizeof sum);
        dfs(root, nullptr, 0);
        
        f(root, nullptr, 0);
        root->val = 0;
        return root;
    }
};
```

### [2642. 设计可以求最短路径的图类](https://leetcode.cn/problems/design-graph-with-shortest-path-calculator/)

标准的 floyd 思想：每次增加一条边，求任意点间的最短路

```c++
class Graph {
public:
    const static int N = 110, M = 2e4 + 10, INF = 0x3f3f3f3f; // 有向图
    
    int n;
    int d[N][N];
    
    Graph(int n, vector<vector<int>>& edges) {
        this->n = n;
        memset(d, 0x3f, sizeof d);
        for (int i = 0; i < n; ++ i )
            d[i][i] = 0;
        for (auto & e : edges)
            d[e[0]][e[1]] = e[2];
        for (int k = 0; k < n; ++ k )
            for (int i = 0; i < n; ++ i )
                for (int j = 0; j < n; ++ j )
                    d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
    }
    
    void addEdge(vector<int> edge) {
        int a = edge[0], b = edge[1], c = edge[2];
        if (d[a][b] <= c)
            return;
        // floyd 标准的 dp 思想
        d[a][b] = c;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < n; ++ j )
                d[i][j] = min(d[i][j], d[i][a] + d[a][b] + d[b][j]);
    }
    
    int shortestPath(int node1, int node2) {
        return d[node1][node2] < INF / 2 ? d[node1][node2] : -1;
    }
};

/**
 * Your Graph object will be instantiated and called as such:
 * Graph* obj = new Graph(n, edges);
 * obj->addEdge(edge);
 * int param_2 = obj->shortestPath(node1,node2);
 */
```
