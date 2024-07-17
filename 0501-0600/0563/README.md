#  [563. 二叉树的坡度](https://leetcode.cn/problems/binary-tree-tilt/)

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
    int dfs(TreeNode* root) {
        if (!root) return 0;
        int l = dfs(root->left), r = dfs(root->right);
        res += abs(l - r);
        return l + r + root->val;
    }
    int findTilt(TreeNode* root) {
        res = 0;
        dfs(root);
        return res;
    }
};
```



```python3

```

