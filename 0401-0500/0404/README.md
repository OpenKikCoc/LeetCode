#  [404. 左叶子之和](https://leetcode.cn/problems/sum-of-left-leaves/)

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
    int res;
    void dfs(TreeNode* node, bool l) {
        if (!node) return;
        if (!node->left && !node->right) {
            if (l)
                res += node->val;
            return;
        }
        dfs(node->left, true);
        dfs(node->right, false);
    }
    int sumOfLeftLeaves(TreeNode* root) {
        dfs(root, false);
        return res;
    }
};
```

```c++
// yxc
class Solution {
public:
    int res = 0;

    int sumOfLeftLeaves(TreeNode* root) {
        dfs(root);
        return res;
    }

    void dfs(TreeNode* root) {
        if (!root) return;
        if (root->left) {
            if (!root->left->left && !root->left->right) {
                res += root->left->val;
            }
        }
        dfs(root->left);
        dfs(root->right);
    }
};
```


```python3

```

