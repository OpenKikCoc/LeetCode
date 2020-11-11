#  [106. 从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

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
    int n;
    unordered_map<int, int> mp;
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        n = inorder.size();
        for(int i = 0; i < n; ++i) mp[inorder[i]] = i;
        function<TreeNode*(int,int,int)> helper = [&](int l, int r, int x) -> TreeNode* {
            if(l > r) return nullptr;
            int v = postorder[x], idx = mp[v], lenr = r-idx;
            TreeNode* ret = new TreeNode(v);
            ret->left = helper(l, idx-1, x-lenr-1);
            ret->right = helper(idx+1, r, x-1);
            return ret;
        };
        return helper(0, n-1, n-1);
    }
};
```



```python3

```

