#  [687. 最长同值路径](https://leetcode-cn.com/problems/longest-univalue-path/)

## 题意



## 题解



```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int res;

    int dfs(TreeNode * root) {
        if (!root)
            return 0;
        
        int l = dfs(root->left), r = dfs(root->right);
        if (!root->left || root->left->val != root->val)
            l = 0;
        if (!root->right || root->right->val != root->val)
            r = 0;
        res = max(res, l + r);
        return max(l, r) + 1;
    }

    int longestUnivaluePath(TreeNode* root) {
        res = 0;
        dfs(root);
        return res;
    }
};
```



```python
# 搜索路径必然存在一个最高点，枚举的时候 以最高点来枚举
# 最高点的 左右两边子树没有交集，那么最长路径 就是看往左边最长是多少，往右边最长是多少，两个加起来就是总和；
# 每个点 返回的是：从这个点往下 伸出的最长路径的长度
class Solution:
    def longestUnivaluePath(self, root: TreeNode) -> int:
        self.res = 0 

        def dfs(root):
            if not root:return 
            l = dfs(root.left); r = dfs(root.right)
            if not root.left or root.val != root.left.val:l = 0
            if not root.right or root.val != root.right.val:r = 0 
            self.res = max(self.res, l + r)
            return max(l, r) + 1

        dfs(root)
        return self.res
```

