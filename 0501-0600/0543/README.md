#  [543. 二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

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
    int dfs(TreeNode * root) {
        if (!root) return 0;
        int l = dfs(root->left), r = dfs(root->right);
        // 计算边 而不是点
        res = max(res, l + r);
        return max(l, r) + 1;
    }

    int diameterOfBinaryTree(TreeNode * root) {
        dfs(root);
        return res;
    }
};

class Solution_2 {
public:
    // 定义状态dp[i] 表示i在路径上且其他路径都在左右子树中的最大值
    // dp[i] = max(dp[lson], dp[rson]) + 1;
    int res = INT_MIN;
    int dp(TreeNode* n) {
        if(!n) return 0;
        int l = dp(n->left), r = dp(n->right);
        res = max(res, l+r+1);
        return max(l, r)+1;
    }
    int diameterOfBinaryTree(TreeNode* root) {
        if(!root) return 0;
        dp(root);
        return res-1;
    }
};
```



```python3

```

