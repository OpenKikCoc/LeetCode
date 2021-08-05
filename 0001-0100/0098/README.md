#  [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

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
    bool helper(TreeNode* r, long& pre) {
        if (!r) return true;
        if (!helper(r->left, pre)) return false;
        if (r->val <= pre) return false;
        pre = r->val;
        return helper(r->right, pre); 
    }
    bool isValidBST(TreeNode* root) {
        long pre = LONG_MIN;
        return helper(root, pre);
    }
};
```



```python
# 法一：按照定义来递归求解：
# 1） 左子树的所有节点的值都小于当前节点的值；
# 2） 右子树的所有节点的值都大于当前节点的值；
# 3） 左子树和右子树都必须是合法的二叉搜索树；
class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        res = []

        def dfs(u):
            if not u:return 
            dfs(u.left)
            res.append(u.val)
            dfs(u.right)
        
        dfs(root)
        p1 = 0 
        while p1 + 1 < len(res):
            if res[p1] >= res[p1 + 1]:
                return False 
            p1 += 1
        return True


# 法二：中序遍历时，判断当前节点是否大于中序遍历的前一个节点，如果大于，说明满足 BST，继续遍历；否则直接返回 false。

class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        self.pre = None
        
        def isBST(u):
            if not u:
                return True
            if not isBST(u.left): # 访问左子树 
                return False
            if self.pre and self.pre.val >= u.val: # 访问当前节点：如果当前节点小于等于中序遍历的前一个节点，说明不满足BST，返回 false；否则继续遍历。
                return False
            self.pre = u  # 将当前节点置为“前一个节点”
            return  isBST(u.right) # 访问右子树

        return isBST(root)
        

```

