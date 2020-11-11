#  [105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

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
    unordered_map<int, int> m;
    TreeNode* build(vector<int>& po, int px, int l, int r) {
        if(l > r) return nullptr;
        TreeNode* node = new TreeNode(po[px]);
        if(l == r) return node;

        int ix = m[po[px]];
        TreeNode* ln = build(po, px+1, l, ix-1);
        TreeNode* rn = build(po, px-l+ix+1, ix+1, r);
        node->left = ln;
        node->right = rn;
        return node;
    }
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int n = preorder.size();
        if(!n) return nullptr;
        for(int i = 0; i < n; ++i) m[inorder[i]] = i;
        return build(preorder, 0, 0, n-1);
    }
};
```



```python3

```

