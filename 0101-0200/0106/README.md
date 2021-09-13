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
#算法流程：
#1. 在后续遍历中找到根节点：后续遍历的第一个数 就是根节点的值
#2. 在中序遍历中找到根节点对应的位置idx，则idx的左边就是左子树的中序遍历，右边的就是右子树的中序遍历(这一步需要用一个字典来存储对应的位置）
#3. 假设左子树的长度为l,那么在后序遍历里，从第一个数算开始的 1 个数是左子树的前序遍历，剩下的树就是右子树的后续遍历
#4. 有了左右子树的中序遍历和后序遍历，我们可以创造出根节点，然后递归它的左右子树；

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

