#  [450. 删除二叉搜索树中的节点](https://leetcode-cn.com/problems/delete-node-in-a-bst/)

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
    TreeNode* deleteNode(TreeNode* root, int key) {
        del(root, key);
        return root;
    }

    void del(TreeNode* &root, int key) {
        if (!root) return;
        if (key == root->val) {
            if (!root->left && !root->right) root = NULL;  // 子节点
            else if (!root->left) root = root->right;  // 只有右儿子
            else if (!root->right) root = root->left;  // 只有左儿子
            else {  // 左右儿子都有
                auto p = root->right;
                while (p->left) p = p->left;  // 找后继
                root->val = p->val;
                del(root->right, p->val);
            }
        }
        else if (key < root->val) del(root->left, key);
        else del(root->right, key);
    }
};
```



```python3

```

