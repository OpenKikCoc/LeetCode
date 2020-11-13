#  [257. 二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)

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
    vector<string> res;
    void dfs(TreeNode* root, string t) {
        if(!root) return;
        t += to_string(root->val);
        if(!root->left && !root->right) {
            res.push_back(t);
            return;
        }
        t += "->";
        dfs(root->left, t);
        dfs(root->right, t);
    }
    vector<string> binaryTreePaths(TreeNode* root) {
        dfs(root, "");
        return res;
    }
};
```



```python3

```

