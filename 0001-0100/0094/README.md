#  [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)

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
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        stack<TreeNode*> s;
        TreeNode * t;
        s.push(root);
        while (!s.empty()) {
            t = s.top(); s.pop();
            if (t) {
                if (t->right) s.push(t->right);
                s.push(t);
                s.push(nullptr);
                if (t->left) s.push(t->left);
            } else {
                res.push_back(s.top()->val);
                s.pop();
            }
        }
        return res;
    }
};
```



```c++
// yxc
class Solution {
public:
    vector<int> ans;
    vector<int> inorderTraversal(TreeNode* root) {
        dfs(root);
        return ans;
    }

    void dfs(TreeNode* root) {
        if (!root) return;
        dfs(root->left);
        ans.push_back(root->val);
        dfs(root->right);
    }
};


class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> stk;

        while (root || stk.size()) {
            while (root) {
                stk.push(root);
                root = root->left;
            }

            root = stk.top();
            stk.pop();
            res.push_back(root->val);
            root = root->right;
        }

        return res;
    }
};
```



```python
# 递归
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        res = []
        def dfs(root):
            if not root:return []  
            dfs(root.left)
            res.append(root.val)
            dfs(root.right)
        
        dfs(root)
        return res
   
# 迭代
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        if not root:return []
        stack, res = [], []
        p = root 
        while p or stack:
            while p:
                stack.append(p)
                p = p.left 
            p = stack.pop()
            res.append(p.val)
            p = p.right 
        return res
```

