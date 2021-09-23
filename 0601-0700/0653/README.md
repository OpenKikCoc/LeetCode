#  [653. 两数之和 IV - 输入 BST](https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst/)

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
    unordered_set<int> hash;
    bool dfs(TreeNode* root, int k) {
        if (!root) return false;
        if (dfs(root->left, k)) return true;
        int x = root->val;
        if (hash.count(k - x)) return true;
        hash.insert(x);
        return dfs(root->right, k);
    }

    bool findTarget(TreeNode* root, int k) {
        return dfs(root, k);
    }
};
```



```python
class Solution:
    def findTarget(self, root: TreeNode, k: int) -> bool:   
        res = []    
        def dfs(root):
            if not root:return
            dfs(root.left)
            res.append(root.val)
            dfs(root.right)
        dfs(root)
        sumn = 0
        l, r = 0, len(res) - 1
        while l < r:
            sumn = res[l] + res[r]
            if sumn == k:
                return True
            elif sumn > k:
                r -= 1
            else:
                l += 1
        return False
```

