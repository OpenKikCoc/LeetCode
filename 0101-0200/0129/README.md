#  [129. 求根到叶子节点数字之和](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/)

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
    int res = 0;
    int v = 0;
    void dfs(TreeNode* root) {
        if(!root) return;
        int t = v;
        v = v * 10 + root->val;
        if(!root->left && !root->right) {
            //res += nv;
            //return;
            res += v;
        }
        dfs(root->left);
        dfs(root->right);
        v = t;
    }
    int sumNumbers(TreeNode* root) {
        dfs(root);
        return res;
    }
};
```



```python3

```

