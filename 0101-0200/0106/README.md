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

