#  [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

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
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) return nullptr;
        TreeNode * l = invertTree(root->right), *r = invertTree(root->left);
        root->left = l, root->right = r;
        return root;
    }
};
```



```python
class Solution:
    def invertTree(self, root: TreeNode) -> TreeNode:
        if not root:return 
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root
```

