#  [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

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
    bool helper(TreeNode* r, long& pre) {
        if(!r) return true;
        if(!helper(r->left, pre)) return false;
        if(r->val <= pre) return false;
        pre = r->val;
        return helper(r->right, pre); 
    }
    bool isValidBST(TreeNode* root) {
        long pre = LONG_MIN;
        return helper(root, pre);
    }
};
```



```python3

```

