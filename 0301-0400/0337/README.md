#  [337. 打家劫舍 III](https://leetcode-cn.com/problems/house-robber-iii/)

## 题意



## 题解



```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    int res = INT_MIN;
    pair<int, int> dfs(TreeNode* n) {
        if(!n) return {0, 0};
        auto l = dfs(n->left), r = dfs(n->right);
        int zero = max(l.first, l.second) + max(r.first, r.second);
        int one = max(l.first, 0) + max(0, r.first) + n->val;
        res = max(res, max(zero, one));
        return {zero, one};
    }
    int rob(TreeNode* root) {
        if(!root) return 0;
        dfs(root);
        return res;
    }
};


// yxc
class Solution {
public:
    unordered_map<TreeNode*, unordered_map<int, int>>f;

    int rob(TreeNode* root) {
        dfs(root);
        return max(f[root][0], f[root][1]);
    }

    void dfs(TreeNode *root) {
        if (!root) return;
        dfs(root->left);
        dfs(root->right);
        f[root][1] = root->val + f[root->left][0] + f[root->right][0];
        f[root][0] = max(f[root->left][0], f[root->left][1]) + max(f[root->right][0], f[root->right][1]);
    }
};
```



```python3

```

