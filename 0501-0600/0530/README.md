#  [530. 二叉搜索树的最小绝对差](https://leetcode.cn/problems/minimum-absolute-difference-in-bst/)

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
    int res = INT_MAX / 2;
    TreeNode * pre = nullptr;
    void dfs(TreeNode * root) {
        if (!root) return;
        dfs(root->left);
        if (pre) res = min(res, root->val - pre->val);
        pre = root;
        dfs(root->right);
    }
    int getMinimumDifference(TreeNode* root) {
        dfs(root);
        return res;
    }
};


// yxc
class Solution {
public:
    int ans = INT_MAX, last;
    bool is_first = true;

    int getMinimumDifference(TreeNode* root) {
        dfs(root);
        return ans;
    }

    void dfs(TreeNode* root) {
        if (!root) return;
        dfs(root->left);
        if (is_first) is_first = false;
        else ans = min(ans, root->val - last);
        last = root->val;
        dfs(root->right);
    }
};
```



```python3

```

