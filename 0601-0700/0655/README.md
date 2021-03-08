#  [655. 输出二叉树](https://leetcode-cn.com/problems/print-binary-tree/)

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
    using PII = pair<int, int>;
    vector<vector<string>> ans;

    PII dfs(TreeNode* root) {
        if (!root) return {0, 0};
        auto [ll, lr] = dfs(root->left);
        auto [rl, rr] = dfs(root->right);
        return {max(ll, rl) + 1, max(lr, rr) * 2 + 1};
    }

    void print(TreeNode * root, int h, int l, int r) {
        if (!root) return;
        int mid = l + r >> 1;
        ans[h][mid] = to_string(root->val);
        print(root->left, h + 1, l, mid - 1);
        print(root->right, h + 1, mid + 1, r);
    }

    vector<vector<string>> printTree(TreeNode* root) {
        auto [h, w] = dfs(root);
        ans = vector<vector<string>>(h, vector<string>(w));
        print(root, 0, 0, w - 1);
        return ans;
    }
};
```



```python3

```

