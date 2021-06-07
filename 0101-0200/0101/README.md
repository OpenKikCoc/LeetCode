#  [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

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
    bool helper(TreeNode* l, TreeNode* r) {
        if(!l && !r) return true;
        else if(!l || !r) return false;
        else if(l->val != r->val) return false;
        return helper(l->left, r->right) && helper(l->right, r->left);
    }
    bool isSymmetric(TreeNode* root) {
        if(!root) return true;
        return helper(root->left, root->right);
    }
};
```



```python
# 递归
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        if not root:return True
        
        def dfs(L, R):
            if not L and not R:return True
            if not L or not R or L.val != R.val:return False  # 踩坑：不要忘记写L.val
            return dfs(L.left, R.right) and dfs(L.right, R.left)

        return dfs(root.right, root.left)
      
# 迭代
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        if not root:return True
        left, right = [], []
        L, R = root.left, root.right
        while L or R or len(left) or len(right):
            while L and R:
                left.append(L)
                L = L.left
                right.append(R)
                R = R.right
            if L or R:return False
            L, R = left.pop(), right.pop()
            if L.val != R.val:return False
            L, R = L.right, R.left
        return True
```

