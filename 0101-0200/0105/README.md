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
        
        // l, r, idx 均为中序遍历中的下标
        // 显然满足 l + len = idx
        int v = po[px], idx = mp[v], len = idx - l;
        TreeNode * t = new TreeNode(v);
        t->left = helper(l, idx - 1, px + 1);
        t->right = helper(idx + 1, r, px + len + 1);
        return t;
    }

    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        this->po = preorder;
        this->n = po.size();
        for (int i = 0; i < n; ++ i )
            mp[inorder[i]] = i;
        return helper(0, n - 1, 0);
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

