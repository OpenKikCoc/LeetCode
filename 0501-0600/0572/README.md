#  [572. 另一个树的子树](https://leetcode-cn.com/problems/subtree-of-another-tree/)

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
    bool helper(TreeNode* s, TreeNode* t) {
        // 注意 需完全一致
        if (s == nullptr && t == nullptr) return true;
        else if (s == nullptr || t == nullptr) return false;
        return s->val == t->val && helper(s->left, t->left) && helper(s->right, t->right);
    }
    bool isSubtree(TreeNode* s, TreeNode* t) {
        if (s == nullptr && t == nullptr) return true;
        else if (s == nullptr || t == nullptr) return false;
        if(s->val == t->val) return helper(s, t) || isSubtree(s->left, t) || isSubtree(s->right, t);
        return isSubtree(s->left, t) || isSubtree(s->right, t);
    }
};
```



```python3

```

