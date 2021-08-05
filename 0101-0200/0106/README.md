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
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> po;
    int n;
    unordered_map<int, int> mp;

    TreeNode * helper(int l, int r, int px) {
        if (l > r)
            return nullptr;
        
        int v = po[px], idx = mp[v], len = r - idx;
        TreeNode * t = new TreeNode(v);
        t->left = helper(l, idx - 1, px - len - 1);
        t->right = helper(idx + 1, r, px - 1);
        return t;
    }

    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        this->po = postorder;
        this->n = po.size();
        for (int i = 0; i < n; ++ i )
            mp[inorder[i]] = i;
        return helper(0, n - 1, n - 1);
    }
};
```



```python
class Solution:
    def buildTree(self, ino: List[int], po: List[int]) -> TreeNode:
        my_dict = {}
        for i in range(len(ino)):
            my_dict[ino[i]] = i 
        
        def dfs(ino_L, ino_R, po_L, po_R):
            if ino_L > ino_R:return 
            root = TreeNode(po[po_R])
            idx = my_dict[po[po_R]]
            root.left = dfs(ino_L, idx - 1, po_L, idx - ino_L + po_L - 1)
            root.right = dfs(idx + 1, ino_R, idx - ino_L + po_L, po_R - 1)
            return root 
        
        return dfs(0, len(ino) - 1, 0 , len(po) - 1)
```

