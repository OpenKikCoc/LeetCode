#  [222. 完全二叉树的节点个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/)

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
    int countNodes(TreeNode* root) {
        if (!root) return 0;
        auto l = root->left, r = root->right;
        int x = 1, y = 1;
        while (l) l = l->left, x ++ ;
        while (r) r = r->right, y ++ ;
        // 本层完全
        if (x == y) return (1 << x) - 1;
        return countNodes(root->left) + 1 + countNodes(root->right);
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


#暴力解法：
# class Solution:
#     def countNodes(self, root: TreeNode) -> int:
#         if not root:return 0
#         return 1+self.countNodes(root.left)+self.countNodes(root.right)


        

class Solution:
    def countNodes(self, root: TreeNode) -> int:
        if not root:return 0
        l,r=root.left,root.right
        x,y=1,1
        while l:
            l=l.left
            x+=1
        while r:
            r=r.right
            y+=1
        if x==y:
            return pow(2,x)-1
        return self.countNodes(root.left)+1+self.countNodes(root.right)

```

