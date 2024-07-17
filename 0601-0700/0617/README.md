#  [617. 合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees/)

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
    TreeNode* mergeTrees(TreeNode* t1, TreeNode* t2) {
        if (!t1 && !t2) return nullptr;
        else if (!t1) return t2;
        else if (!t2) return t1;
        TreeNode * r = new TreeNode(t1->val + t2->val);
        r->left = mergeTrees(t1->left, t2->left), r->right = mergeTrees(t1->right, t2->right);
        return r;
    }
};
```



```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def mergeTrees(self, t1: TreeNode, t2: TreeNode) -> TreeNode:
        if not (t1 and t2):
            return t1 if t1 else t2
        t1.val += t2.val
        t1.left = self.mergeTrees(t1.left, t2.left)
        t1.right = self.mergeTrees(t1.right, t2.right)
        return t1
```

