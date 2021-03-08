#  [671. 二叉树中第二小的节点](https://leetcode-cn.com/problems/second-minimum-node-in-a-binary-tree/)

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
    using LL = long long;
    LL d1 = 1e18, d2 = 1e18;

    void dfs(TreeNode * root) {
        if (!root) return;
        int v = root->val;
        if (v < d1) {
            d2 = d1;
            d1 = v;
        } else if (v != d1 && v < d2)
            d2 = v;
        dfs(root->left);
        dfs(root->right);
    }

    int findSecondMinimumValue(TreeNode* root) {
        dfs(root);
        return d2 == 1e18 ? -1 : d2;
    }
};
```



```python3

```

