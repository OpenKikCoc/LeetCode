#  [105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

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
#算法流程：
#1. 在前序遍历中找到根节点：前序遍历的第一个数 就是根节点的值
#2. 在中序遍历中找到根节点对应的位置k，则 k的左边就是左子树的中序遍历，k的右边就是右子树的中序遍历 （这一步需要用一个字典来存储对应的位置）
#3. 假设左子树的长度为l,那么在前序遍历里，根节点后l个数 是左子树的前序遍历，剩下的树就是右子树的前序遍历
#4. 有了左右子树的前序遍历和中序遍历，我们可以创造出根节点，然后递归它的左右子树；
class Solution:
    def buildTree(self, pre: List[int], ino: List[int]) -> TreeNode:
        my_dict = dict()
        for i in range(len(ino)):
            my_dict[ino[i]] = i

        def dfs(pre_L, pre_R, ino_L, ino_R):
            if pre_L > pre_R:return    # 踩坑： 只能 大于 的时候 才能return! 进入 dfs 后，每次都记得先想一下终止条件！
            root = TreeNode(pre[pre_L])    # 进入 dfs ，把每一层的 root 节点构造出来！
            idx = my_dict[pre[pre_L]]
            root.left = dfs(pre_L + 1, idx - ino_L + pre_L, ino_L, idx - 1)
            root.right = dfs(idx - ino_L + pre_L + 1, pre_R, idx + 1, ino_R)
            return root   # 递归返回这一层对应的root , 也就是重建后的二叉树
        
        return dfs(0, len(pre) - 1, 0, len(ino) - 1)      
```

