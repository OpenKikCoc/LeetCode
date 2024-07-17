#  [230. 二叉搜索树中第K小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)

## 题意



## 题解

```c++
// 更好
// yxc
class Solution {
public:
    int k, ans;

    int kthSmallest(TreeNode* root, int _k) {
        k = _k;
        dfs(root);
        return ans;
    }

    bool dfs(TreeNode* root) {
        if (!root) return false;
        if (dfs(root->left)) return true;
        if ( -- k == 0) {
            ans = root->val;
            return true;
        }
        return dfs(root->right);
    }
};
```


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
        if (!r) return;
        dfs(r->left);
        k -- ;
        if (!k) {res = r->val; return;}
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



```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def __init__(self):
        self.res=None

    def kthSmallest(self, root: TreeNode, k: int) -> int:
        self.k=k
        self.dfs(root)
        return self.res

    def dfs(self,root):
        if not root:return None
        else:
            self.dfs(root.left)
            self.k-=1
            if self.k==0:self.res=root.val
            if self.k>0:self.dfs(root.right)
            
```

