#  [230. 二叉搜索树中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)

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
    int res, k;
    void dfs(TreeNode* r) {
        if(!r) return;
        dfs(r->left);
        --k;
        if(!k) {res = r->val; return;}
        dfs(r->right);
    }
    int kthSmallest(TreeNode* root, int k) {
        this->k = k;
        this->res = -1;
        dfs(root);
        return res;
    }
};
```



```python3

```

