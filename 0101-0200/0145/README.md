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



```python3

```

