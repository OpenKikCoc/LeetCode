#  [110. 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

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
    int helper(TreeNode* root) {
        if(!root) return 0;
        int l = helper(root->left);
        int r = helper(root->right);
        if(l == -1 || r == -1 || abs(l-r) > 1) return -1;
        return max(l, r) + 1;
    }
    bool isBalanced(TreeNode* root) {
        return helper(root) != -1;
    }
};
```



```python
class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        self.res = True 

        def dfs(root):
            if not root:return 0 
            left = dfs(root.left)
            right = dfs(root.right)
            if abs(right - left) > 1:
                self.res = False 
            return max(left, right) + 1
        
        dfs(root)
        return self.res
      
 # 用 -1  标识一种非法状态     
class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        
        def dfs(root):
            if not root:return 0 
            left = dfs(root.left)
            right = dfs(root.right)
            if left == -1:return -1   # 不满足条件 返回-1
            if right == -1:return -1  
            return max(left, right) + 1 if abs(left - right) <= 1 else -1

        return dfs(root) != -1
```

