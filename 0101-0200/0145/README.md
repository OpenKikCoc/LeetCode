#  [145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

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
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        if(!root) return res;
        stack<TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            TreeNode* r = q.top(); q.pop();
            if(r) {
                q.push(r);
                q.push(nullptr);
                if(r->right) q.push(r->right);
                if(r->left) q.push(r->left);
            } else {
                res.push_back(q.top()->val);
                q.pop();
            }
        }
        return res;
    }
};
```



```python
# 递归
class Solution:
    def postorderTraversal(self, root: TreeNode) -> List[int]:
        res = []
        def dfs(p):
            if not p:return
            dfs(p.left)
            dfs(p.right)
            res.append(p.val)

        dfs(root)
        return res
      
 # 迭代: 前序遍历写成：父- 右 - 左； 然后return结果的时候 逆序返回
class Solution:
    def postorderTraversal(self, root: TreeNode) -> List[int]:
        res, stack = [], []
        p = root 
        while p or stack:
            while p:
                stack.append(p)
                res.append(p.val)
                p = p.right 
            p = stack.pop()
            p = p.left 
        return res[::-1]
```

