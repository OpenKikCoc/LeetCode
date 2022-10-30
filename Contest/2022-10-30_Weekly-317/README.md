## [比赛链接](https://leetcode.cn/contest/weekly-contest-317)


### [6220. 可被三整除的偶数的平均值](https://leetcode.cn/problems/average-value-of-even-numbers-that-are-divisible-by-three/)



```c++
class Solution {
public:
    int averageValue(vector<int>& nums) {
        int a = 0, b = 0;
        for (auto x : nums)
            if (x % 3 == 0 && x % 2 == 0)
                a += x, b ++ ;
        if (b == 0)
            return 0;
        return a / b;
    }
};
```


### [6221. 最流行的视频创作者](https://leetcode.cn/problems/most-popular-video-creator/)

LL WA1

```c++
class Solution {
public:
    using LL = long long;
    using PIS = pair<int, string>;
    
    vector<vector<string>> mostPopularCreator(vector<string>& cs, vector<string>& ids, vector<int>& vs) {
        int n = cs.size();
        unordered_map<string, vector<PIS>> hash;
        unordered_map<string, LL> score;
        for (int i = 0; i < n; ++ i ) {
            hash[cs[i]].push_back({-vs[i], ids[i]});
            score[cs[i]] += (LL)vs[i];
        }
        for (auto & [k, v] : hash)
            sort(v.begin(), v.end());
        
        vector<string> p;
        for (auto [k, v] : score)
            if (p.empty() || score[p.back()] < v)
                p = {k};
            else if (score[p.back()] == v)
                p.push_back(k);
        
        vector<vector<string>> res;
        for (auto c : p) {
            vector<string> t;
            auto [_, id] = *hash[c].begin();
            t.push_back(c);
            t.push_back(id);
            res.push_back(t);
        }
        return res;
    }
};
```

### [6222. 美丽整数的最小增量](https://leetcode.cn/problems/minimum-addition-to-make-integer-beautiful/)

一开始想在遍历的时候记录 tot 的变化，实际上实现起来非常麻烦

实际上可以每次动态计算

```c++
class Solution {
public:
    using LL = long long;
    
    int get(LL n) {
        string s = to_string(n);
        int tot = 0;
        for (auto c : s)
            tot += c - '0';
        return tot;
    }
    
    long long makeIntegerBeautiful(long long n, int target) {
        LL res = 0;
        for (LL p = 10; get(n) > target; p *= 10) {
            LL d = n % p;
            if (d == 0)
                continue;
            
            LL add = p - d;
            res += add;
            n += add;
        }
        
        return res;
    }
};
```

### [6223. 移除子树后的二叉树高度](https://leetcode.cn/problems/height-of-binary-tree-after-subtree-removal-queries/) [TAG]

离线 + 思维

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
    
    int n;
    int height[N];
    int tr[N][2], son[N];
    
    int t[N];
    
    void dfs(TreeNode * u) {
        if (!u)
            return;
        
        n ++ ;
        dfs(u->left), dfs(u->right);
        
        int x = u->val, l = 0, r = 0;
        if (u->left)
            tr[x][0] = u->left->val, l = height[u->left->val];
        if (u->right)
            tr[x][1] = u->right->val, r = height[u->right->val];
        
        if (l > r)
            son[x] = 0;
        else if (l < r)
            son[x] = 1;
        height[x] = max(l, r) + 1;
    }
    
    vector<int> treeQueries(TreeNode* root, vector<int>& queries) {
        memset(tr, 0, sizeof tr), memset(son, -1, sizeof son);
        n = 0;
        dfs(root);
        
        for (int i = 1; i <= n; ++ i )
            t[i] = height[root->val];
        
        // 核心思想: 我们只需要关注改变某个点之后一定会影响全局的部分即可
        // -> 对于有冗余备份的部分 其删除不影响全局 => 故只需要关心一条链 不需要 bfs
        // 
        // 对于该链上发生变化的节点 新值即为每个节点另一个方向的高度 + 当前深度
        for (int u = root->val, path = 0, maxd = 0, k; u && son[u] != -1; u = tr[u][k] ) {
            path ++ ;
            // 【思维】对于当前位置处 如果删掉了 tr[u][k] 则新的高度为 tr[u][k^1] + path
            k = son[u];
            maxd = max(maxd, height[tr[u][k ^ 1]] + path);
            t[tr[u][k]] = maxd;
        }
        
        vector<int> res;
        for (auto x : queries)
            res.push_back(t[x] - 1);
        return res;
    }
};
```

DFS序

子树里的所有点是 DFS 序里的一个连续区间。因此本题可以被转化为如下问题：

>   给定一个序列，每次删除一个连续区间，求序列里剩下的数的最大值。

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
    
    int n, ts;
    int l[N], r[N];
    int d[N];
    
    void dfs(TreeNode * u, int dep) {
        if (!u)
            return;
        
        n ++ ;
        int x = u->val;
        
        l[x] = ++ ts;
        // ATTENTION 不是使用 x 而是使用 ts 来标记深度
        // 方便后面前后缀分别统计
        d[ts] = dep;
        dfs(u->left, dep + 1), dfs(u->right, dep + 1);
        r[x] = ts;
    }
    
    int f[N], g[N];
    
    vector<int> treeQueries(TreeNode* root, vector<int>& queries) {
        n = 0, ts = 0;
        dfs(root, 0);
        
        memset(f, 0, sizeof f), memset(g, 0, sizeof g);
        for (int i = 1; i <= n; ++ i )
            f[i] = max(f[i - 1], d[i]);
        for (int i = n; i >= 1; -- i )
            g[i] = max(g[i + 1], d[i]);
        
        vector<int> res;
        for (auto q : queries)
            res.push_back(max(f[l[q] - 1], g[r[q] + 1]));
        return res;
    }
};
```

