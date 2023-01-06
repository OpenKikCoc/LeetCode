## [比赛链接](https://leetcode.cn/contest/weekly-contest-320/)

>   virtual rank: 75 / 5678


### [2475. 数组中不等三元组的数目](https://leetcode.cn/problems/number-of-unequal-triplets-in-array/)

略

```c++
class Solution {
public:
    int unequalTriplets(vector<int>& nums) {
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                for (int k = j + 1; k < n; ++ k )
                    if (nums[i] != nums[j] && nums[j] != nums[k] && nums[i] != nums[k])
                        res ++ ;
        return res;
    }
};
```


### [2476. 二叉搜索树最近节点查询](https://leetcode.cn/problems/closest-nodes-queries-in-a-binary-search-tree/)

略

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
    vector<int> xs;
    
    void dfs(TreeNode * u) {
        if (!u)
            return;
        dfs(u->left);
        xs.push_back(u->val);
        dfs(u->right);
    }
    
    vector<vector<int>> closestNodes(TreeNode* root, vector<int>& queries) {
        xs.clear();
        dfs(root);
        vector<vector<int>> res;
        for (auto & x : queries) {
            int l = -1, r = -1;
            {
                auto it = lower_bound(xs.begin(), xs.end(), x + 1);
                if (it != xs.begin()) {
                    it -- ;
                    l = *it;
                }
            }
            {
                auto it = lower_bound(xs.begin(), xs.end(), x);
                if (it != xs.end()) {
                    r = *it;
                }
            }
            res.push_back({l, r});
        }
        return res;
    }
};
```

### [2477. 到达首都的最少油耗](https://leetcode.cn/problems/minimum-fuel-cost-to-report-to-the-capital/)

树 dp 略

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n, s;
    LL f[N], c[N];
    
    void dfs(int u, int fa) {
        f[u] = 0, c[u] = 1;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            dfs(j, u);
            c[u] += c[j], f[u] += f[j] + (c[j] + s - 1) / s;
        }
    }
    
    long long minimumFuelCost(vector<vector<int>>& roads, int seats) {
        this->n = roads.size() + 1, this->s = seats;
        init();
        for (auto & r : roads)
            add(r[0], r[1]), add(r[1], r[0]);
        
        dfs(0, -1);
        return f[0];
    }
};
```

### [2478. 完美分割的方案数](https://leetcode.cn/problems/number-of-beautiful-partitions/) [TAG]

dp + （双指针 & 前缀和 优化）

```c++
class Solution {
public:
    // 最多可以拆成 500 个
    // minLength 作为双指针约束
    using LL = long long;
    const static int N = 1010, M = 510, MOD = 1e9 + 7;
    
    unordered_set<char> primes = {'2', '3', '5', '7'};
    
    bool st[N];
    LL f[N][M];
    
    int beautifulPartitions(string s, int k, int minLength) {
        int n = s.size();
        memset(st, 0, sizeof st);
        for (int i = 1; i <= n; ++ i )
            if (primes.count(s[i - 1]))
                st[i] = true;
        
        // 第一个必须是 prime，最后一个必须不是
        if (!st[1] || st[n])
            return 0;
        
        vector<int> xs; // 记录合法的起始点位，最多 500 个
        for (int i = 1; i <= n; ++ i )
            if (st[i] && !st[i - 1])
                xs.push_back(i);
        xs.push_back(n + 1);            // 哨兵
        
        int m = xs.size();
        if (k >= m)
            return 0;
        
        memset(f, 0, sizeof f);
        f[0][0] = 1;
        
        for (int _k = 1; _k <= k; _k ++ ) {
            LL t = 0;
            for (int i = 1, j = 1; i <= m; ++ i ) {
                int r = xs[i - 1];
                while (j <= m && xs[j - 1] <= r - minLength) {
                    // cout << " r = " << r << " l = " << xs[j - 1] << endl;
                    t = (t + f[xs[j - 1] - 1][_k - 1]) % MOD;
                    j ++ ;
                }
                f[r - 1][_k] = t;
            }
        }
        // for (int i = 1; i <= n; ++ i ) {
        //     for (int j = 1; j <= m; ++ j )
        //         cout << f[i][j] << ' ';
        //     cout << endl;
        // }
        
        return f[n][k];
    }
};
```
