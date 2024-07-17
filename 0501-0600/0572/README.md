#  [572. 另一个树的子树](https://leetcode.cn/problems/subtree-of-another-tree/)

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
    bool helper(TreeNode* s, TreeNode* t) {
        // 注意 需完全一致
        if (s == nullptr && t == nullptr) return true;
        else if (s == nullptr || t == nullptr) return false;
        return s->val == t->val && helper(s->left, t->left) && helper(s->right, t->right);
    }
    bool isSubtree(TreeNode* s, TreeNode* t) {
        if (s == nullptr && t == nullptr) return true;
        else if (s == nullptr || t == nullptr) return false;
        if(s->val == t->val) return helper(s, t) || isSubtree(s->left, t) || isSubtree(s->right, t);
        return isSubtree(s->left, t) || isSubtree(s->right, t);
    }
};
```


```c++
// yxc 树hash做法
class Solution {
public:
    const int P = 131, Q = 159, MOD = 1e7 + 7;
    int T = -1;
    bool ans = false;

    int dfs(TreeNode* root) {
        if (!root) return 12345;
        int left = dfs(root->left), right = dfs(root->right);
        int x = (root->val % MOD + MOD) % MOD;
        if (left == T || right == T) ans = true;
        return (x + left * P % MOD + right * Q) % MOD;
    }

    bool isSubtree(TreeNode* s, TreeNode* t) {
        T = dfs(t);
        if (T == dfs(s)) ans = true;
        return ans;
    }
};
```



```python3

```

