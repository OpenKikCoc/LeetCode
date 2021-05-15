#   [783. 二叉搜索树节点最小距离](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/)

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
    TreeNode * pre;

    void dfs(TreeNode * root) {
        if (!root)
            return;
        dfs(root->left);
        if (pre)
            res = min(res, root->val - pre->val);
        pre = root;
        dfs(root->right);
    }

    int minDiffInBST(TreeNode* root) {
        res = 2e9;
        dfs(root);
        return res;
    }
};
```



```python3

```

