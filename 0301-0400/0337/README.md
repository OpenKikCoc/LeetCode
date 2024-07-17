#  [337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/)

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
    int res = INT_MIN;
    pair<int, int> dfs(TreeNode* n) {
        if (!n) return {0, 0};
        auto l = dfs(n->left), r = dfs(n->right);
        int zero = max(l.first, l.second) + max(r.first, r.second);
        int one = max(l.first, 0) + max(0, r.first) + n->val;
        res = max(res, max(zero, one));
        return {zero, one};
    }
    int rob(TreeNode* root) {
        if (!root) return 0;
        dfs(root);
        return res;
    }
};


// yxc
class Solution {
public:
    unordered_map<TreeNode*, unordered_map<int, int>>f;

    int rob(TreeNode* root) {
        dfs(root);
        return max(f[root][0], f[root][1]);
    }

    void dfs(TreeNode *root) {
        if (!root) return;
        dfs(root->left);
        dfs(root->right);
        f[root][1] = root->val + f[root->left][0] + f[root->right][0];
        f[root][0] = max(f[root->left][0], f[root->left][1]) + max(f[root->right][0], f[root->right][1]);
    }
};
```



**思路**

> **树形dp**
>
> 典型的树形DP问题。时间复杂度: $O(n)$
>
> 1. 状态表示：
>    $f[i, 0]$ 表示已经偷完以 $i$ 为根的子树，且不在 $i$ 行窃的最大收益；
>    $f[i, 1]$ 表示已经偷完以 $i$ 为根的子树，且在 $i$ 行窃的最大收益；
>
> 2. 状态转移：
>    $f[i, 0]$ ：因为在 i 行窃，所以在 i 的子节点不能行窃，只能从 $f[i->left][0]$ 和 $f[i->right][0]$ 转移；
>    $f[i, 1]$ ：因为不在 i 行窃，所以对 i 的子节点没有限制，直接用左右子节点的最大收益转移即可

```python
class Solution:
    def rob(self, root: TreeNode) -> int:
        def dfs(u):
            if not u:return [0, 0]
            l = dfs(u.left)
            r = dfs(u.right)
            return [max(l[0],l[1]) + max(r[0], r[1]), l[0] + r[0] + u.val]

        f = dfs(root)
        return max(f[0], f[1])
```

