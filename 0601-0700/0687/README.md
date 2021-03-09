#  [687. 最长同值路径](https://leetcode-cn.com/problems/longest-univalue-path/)

## 题意



## 题解



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
    int res;

    int dfs(TreeNode * root) {
        if (!root)
            return 0;
        
        int l = dfs(root->left), r = dfs(root->right);
        if (!root->left || root->left->val != root->val)
            l = 0;
        if (!root->right || root->right->val != root->val)
            r = 0;
        res = max(res, l + r);
        return max(l, r) + 1;
    }

    int longestUnivaluePath(TreeNode* root) {
        res = 0;
        dfs(root);
        return res;
    }
};
```



```python3

```

