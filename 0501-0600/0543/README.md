#  [543. 二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

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
    int res = 0;
    int dfs(TreeNode * root) {
        if (!root) return 0;
        int l = dfs(root->left), r = dfs(root->right);
        // 计算边 而不是点
        res = max(res, l + r);
        return max(l, r) + 1;
    }

    int diameterOfBinaryTree(TreeNode * root) {
        dfs(root);
        return res;
    }
};
```



```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        def dfs(root):
            nonlocal ans
            if not root: return 0
            left=dfs(root.left);right=dfs(root.right)
            ans=max(ans,left+right)
            return max(left,right)+1
        ans=0
        dfs(root)
        return ans

```

