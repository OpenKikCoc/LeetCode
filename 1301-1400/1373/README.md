#   **[LeetCode 1373. 二叉搜索子树的最大键值和](https://leetcode.cn/problems/maximum-sum-bst-in-binary-tree/)** 

## 题意



## 题解



```c++
class Solution {
public:
    struct Node {
        int sum, lo, hi;
        Node(int sum, int lo, int hi) : sum(sum), lo(lo), hi(hi) {}
    };
    int res;
    Node dfs(TreeNode* root) {
        Node l = Node(0, root->val, INT_MIN), r = Node(0, INT_MAX, root->val);
        if (root->left) l = dfs(root->left);
        if (root->right) r = dfs(root->right);

        if (root->val > l.hi && root->val < r.lo) {
            res = max(res, root->val + l.sum + r.sum);
            return Node(l.sum + r.sum + root->val, l.lo, r.hi);
        }
        return Node(INT_MIN, INT_MIN, INT_MAX);
    }

    int maxSumBST(TreeNode* root) {
        res = 0;
        dfs(root);
        return res;
    }
};
```



**思路**

> 

```python

```

