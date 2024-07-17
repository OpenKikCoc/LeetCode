#  [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)

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
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        int l = minDepth(root->left), r = minDepth(root->right);
        return (l && r) ? min(l, r) + 1 : 1 + l + r;
    }
};
```



```python
# 四个出口条件：
# 1.此时参数为None，返回0即可，表示并不增加深度
# 2.左子树节点为空，返回右子节点的最小深度+1。为什么不返回0，因为此时这个节点可能不是叶子节点，还要考察右子树节点
# 3.右子树节点为空，返回左子节点的最小深度+1。
# 4.左右子树都有节点，那么返回左右子树中的最小深度，并且+1
class Solution:
    def minDepth(self, root: TreeNode) -> int:
        if not root:return 0
        if not root.left:return self.minDepth(root.right) + 1
        if not root.right:return self.minDepth(root.left) + 1
        return min(self.minDepth(root.left), self.minDepth(root.right)) + 1
```

