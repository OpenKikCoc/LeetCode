#  [538. 把二叉搜索树转换为累加树](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/)

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
    int sum = 0;

    void dfs(TreeNode * root) {
        if (!root) return ;
        dfs(root->right);
        sum += root->val;
        root->val = sum;
        dfs(root->left);
    }

    TreeNode* convertBST(TreeNode* root) {
        dfs(root);
        return root;
    }
};
```



```python
class Solution:
    def convertBST(self, root: TreeNode) -> TreeNode:
        self.total=0
        def dfs(root):
            if root:
                print("val=", root.val, " before dfs.right total=", self.total)
                dfs(root.right)
                print("val=", root.val, " after dfs.right total=", self.total)
                self.total+=root.val
                root.val=self.total
                dfs(root.left)
        
        dfs(root)
        return root
```

