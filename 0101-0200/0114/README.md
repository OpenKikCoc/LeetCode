#  [114. 二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)

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
    // ATTENTION
    void flatten(TreeNode* root) {
        while (root) {
            if (root->left) {
                TreeNode *pre = root->left;
                while (pre->right)
                    pre = pre->right;
                pre->right = root->right;
                root->right = root->left;
                root->left = nullptr;
            }
            root = root->right;
        }
        return;
    }
    // another
    TreeNode* pre = nullptr;
    void flatten(TreeNode* root) {
        if (!root) return;
        flatten(root->right);
        flatten(root->left);
        root->right = pre;
        root->left = nullptr;
        pre = root;
    }
};
```



```python
# 找规律 + 模拟
# 1. 当前节点存在左子树，将左子树的右链插入到当前点的右边
# 2. 否则 不存在的时候，遍历当前节点的右儿子
# 原地：不能用递归
class Solution:
    def flatten(self, root: TreeNode) -> None:
        while root:
            p = root.left
            if p:
                while p.right:
                    p = p.right 
                p.right = root.right
                root.right = root.left
                root.left = None # 一定要记得清空，因为左儿子已经移走了
            root = root.right  # 上述步骤完成后，当前节点一定没有左儿子了，所以只能往右边走
```

