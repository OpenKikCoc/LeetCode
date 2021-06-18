#  [112. 路径总和](https://leetcode-cn.com/problems/path-sum/)

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
    bool hasPathSum(TreeNode* root, int sum) {
        if(!root) return false;
        if(!root->left && !root->right) return root->val == sum;
        return hasPathSum(root->left, sum - root->val) || hasPathSum(root->right, sum - root->val);
    }
};
```



```python
class Solution:
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        if not root:return False   # 即使root.left不存在，也会返回false；所以不需要写if root.left 这个判断
        if not root.left and not root.right:return root.val == sum 
        return self.hasPathSum(root.left, sum - root.val) or  self.hasPathSum(root.right, sum - root.val)   
```

