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



```python
class Solution:
    def buildTree(self, pre: List[int], ino: List[int]) -> TreeNode:
        my_dict = {}
        for i in range(len(ino)):
            my_dict[ino[i]] = i 

        def dfs(pre_L, pre_R, in_L, in_R):
            if pre_L > pre_R:return
            root = TreeNode(pre[pre_L])
            idx = my_dict[pre[pre_L]]
            root.left = dfs(pre_L + 1, idx - in_L + pre_L, in_L, idx - 1)
            root.right = dfs(idx - in_L + pre_L + 1, pre_R, idx + 1, in_R)
            return root

        return dfs(0, len(pre) - 1, 0, len(ino) - 1)
```

