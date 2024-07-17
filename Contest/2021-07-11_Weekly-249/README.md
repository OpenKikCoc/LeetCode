## [比赛链接](https://leetcode.cn/contest/weekly-contest-249/)


### [1929. 数组串联](https://leetcode.cn/problems/concatenation-of-array/)

模拟 略

```c++
class Solution {
public:
    vector<int> getConcatenation(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n * 2);
        for (int i = 0; i < n; ++ i )
            res[i] = res[i + n] = nums[i];
        return res;
    }
};
```


### [1930. 长度为 3 的不同回文子序列](https://leetcode.cn/problems/unique-length-3-palindromic-subsequences/)

注意 `l & r` 避免数值溢出

```c++
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        int n = s.size();
        vector<vector<int>> sum(n + 1, vector<int>(26));
        
        for (int i = 1; i <= n; ++ i ) {
            int v = s[i - 1] - 'a';
            for (int j = 0; j < 26; ++ j )
                if (j == v)
                    sum[i][j] = sum[i - 1][j] + 1;
                else
                    sum[i][j] = sum[i - 1][j];
        }
        
        unordered_set<string> S;
        for (int i = 2; i < n; ++ i ) {
            int v = s[i - 1] - 'a';
            for (int j = 0; j < 26; ++ j ) {
                int l = sum[i - 1][j], r = sum[n][j] - sum[i][j];
                if (l && r) {   // ATTENTION && 而不是 *
                    string t;
                    t.push_back('a' + j);
                    t.push_back('a' + v);
                    t.push_back('a' + j);
                    S.insert(t);
                }
            }
        }
        return S.size();
    }
};
```

思想：set 可以用数组标记替代 形如

```c++
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        int n = s.size();
        vector<int> u(26), v(26);
        for (int i = 0; i < n; ++i)
            u[s[i]-'a'] ++;
        vector<vector<int>> f(26, vector<int>(26));
        for (int i = 0; i < n; ++i) {
            u[s[i]-'a'] --;
            for (int c = 0; c < 26; ++c)
                if (u[c] && v[c]) f[s[i]-'a'][c] = 1;
            v[s[i]-'a'] ++;
        }
        int res = 0;
        for (int a = 0; a < 26; ++a)
            for (int b = 0; b < 26; ++b)
                res += f[a][b];
        return res;
    }
};
```

### [1931. 用三种不同颜色为网格涂色](https://leetcode.cn/problems/painting-a-grid-with-three-different-colors/) [TAG]

> dp思路简单版 [1411. 给 N x 3 网格图涂色的方案数](https://leetcode.cn/problems/number-of-ways-to-paint-n-3-grid/) 

之前想用 `01 10 11` 表示三进制状态，但实现起来非常麻烦

直接用 `pow(3, k)` 来处理此类**三进制经典问题**

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1010, M = 250;
    const int MOD = 1e9 + 7;

    int n, m;
    vector<int> st;
    unordered_map<int, vector<int>> g;
    LL f[N][M];

    bool check(int x) {
        int last = -1;
        for (int i = 0; i < m; ++ i ) {
            if (x % 3 == last)
                return false;
            last = x % 3;
            x /= 3;
        }
        return true;
    }

    bool match(int a, int b) {
        for (int i = 0; i < m; ++ i ) {
            if (a % 3 == b % 3)
                return false;
            a /= 3, b /= 3;
        }
        return true;
    }

    int colorTheGrid(int m, int n) {
        this->n = n, this->m = m;

        int lim = pow(3, m);

        for (int i = 0; i < lim; ++ i )
            if (check(i))
                st.push_back(i);
        for (auto a : st)
            for (auto b : st)
                if (match(a, b))
                    g[a].push_back(b);

        for (auto v : st)
            f[1][v] = 1;
        for (int i = 2; i <= n; ++ i )
            for (auto j : st)
                for (auto k : g[j])
                    f[i][j] = (f[i][j] + f[i - 1][k]) % MOD;

        int res = 0;
        for (auto v : st)
            res = (res + f[n][v]) % MOD;
        return res;
    }
};
```

### [1932. 合并多棵二叉搜索树](https://leetcode.cn/problems/merge-bsts-to-create-single-bst/) [TAG]

复杂模拟 见注释

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
    unordered_map<TreeNode*, TreeNode*> root;   // 找根
    unordered_map<int, TreeNode*> states;       // 某个值作为根节点 是哪个节点
    
    TreeNode* get_root(TreeNode * t) {
        auto it = root.find(t);
        // 自己就是根
        if (it == root.end())
            return t;
        // 自己不是根 继续找
        // 类似于路径压缩的并查集思路
        TreeNode * pa = it->second;
        root[t] = get_root(pa);
        return root[t];
    }
    
    bool is_bst(TreeNode * r, int d, int u) {
        if (!r)
            return true;
        if (r->val < d || r->val > u)
            return false;
        return is_bst(r->left, d, r->val - 1) && is_bst(r->right, r->val + 1, u);
    }
    
    TreeNode* canMerge(vector<TreeNode*>& trees) {
        queue<TreeNode*> q;
        for (auto t : trees) {
            states[t->val] = t; // 
            q.push(t);
        }
        
        while (!q.empty()) {
            auto t = q.front(); q.pop();
            // 加入儿子
            vector<pair<TreeNode*, int>> sons;
            if (t->left)
                sons.push_back({t->left, 0});
            if (t->right)
                sons.push_back({t->right, 1});
            
            for (auto [p, v] : sons) {
                // 非叶子节点
                if (p->left || p->right) {
                    root[p] = t;
                    q.push(p);
                } else {
                    // 叶子节点 找其是否为某个子树根节点
                    auto it = states.find(p->val);
                    if (it == states.end())
                        continue;
                    
                    // CASE: it->second 是某个子树的根节点 且是当前树的根
                    // 则成环 返回nullptr
                    if (it->second == get_root(t))
                        return nullptr;
                    
                    // 更新根信息 使用it替代p所在的位值
                    root[it->second] = t;
                    if (v == 0)
                        t->left = it->second;
                    else
                        t->right = it->second;
                    states.erase(it);   // ATTENTION
                }
            }
        }
        if (states.size() != 1)
            return nullptr;
        TreeNode * rt = states.begin()->second;
        return is_bst(rt, -1e9, 1e9) ? rt : nullptr;
    }
};
```
