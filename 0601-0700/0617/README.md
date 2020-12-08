#  [617. 合并二叉树](https://leetcode-cn.com/problems/merge-two-binary-trees/)

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



```python3

```

