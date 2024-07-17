#  [623. 在二叉树中增加一行](https://leetcode.cn/problems/add-one-row-to-tree/)

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
    TreeNode* addOneRow(TreeNode* root, int v, int d) {
        if (d == 1) {
            auto cur = new TreeNode(v);
            cur->left = root;
            return cur;
        }
        queue<TreeNode*> q;
        q.push(root);
        for (int i = 0; i < d - 2; ++ i )
            for (int j = q.size(); j; -- j ) {
                auto t = q.front();
                q.pop();
                if (t->left) q.push(t->left);
                if (t->right) q.push(t->right);
            }
        while (q.size()) {
            auto t = q.front(); q.pop();
            auto left = new TreeNode(v), right = new TreeNode(v);
            left->left = t->left, right->right = t->right;
            t->left = left, t->right = right;
        }
        return root;
    }
};
```



```python3

```

