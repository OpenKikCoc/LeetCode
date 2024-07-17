#  [513. 找树左下角的值](https://leetcode.cn/problems/find-bottom-left-tree-value/)

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
    int res = 0, maxd = 0;
    void dfs(TreeNode * root, int d) {
        if (!root) return ;
        if (d > maxd) {
            res = root->val;
            maxd = d;
        }
        dfs(root->left, d + 1), dfs(root->right, d + 1);
    }
    int findBottomLeftValue(TreeNode* root) {
        dfs(root, 1);
        return res;
    }
};
```



```python3

```

