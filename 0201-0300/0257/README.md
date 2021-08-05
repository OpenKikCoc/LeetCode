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
        if (!root)
            return;
        t += to_string(root->val);
        if (!root->left && !root->right) {
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

```c++
// yxc
class Solution {
public:
    vector<string> ans;
    vector<int> path;

    void dfs(TreeNode* root) {
        path.push_back(root->val);
        if (!root->left && !root->right) {
            string line = to_string(path[0]);
            for (int i = 1; i < path.size(); i ++ )
                line += "->" + to_string(path[i]);
            ans.push_back(line);
        } else {
            if (root->left) dfs(root->left);
            if (root->right) dfs(root->right);
        }
        path.pop_back();
    }

    vector<string> binaryTreePaths(TreeNode* root) {
        if (root) dfs(root);
        return ans;
    }
};
```



```python3

```

