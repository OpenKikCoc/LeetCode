#  [94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

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
        if(!root) return res;
        stack<TreeNode*> s;
        TreeNode* t;
        s.push(root);
        while(!s.empty()) {
            t = s.top(); s.pop();
            if(t) {
                if(t->right) s.push(t->right);
                s.push(t);
                s.push(nullptr);
                if(t->left) s.push(t->left);
            } else {
                res.push_back(s.top()->val);
                s.pop();
            }
        }
        return res;
    }
};
```



```python3

```

