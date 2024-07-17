#  [129. 求根到叶子节点数字之和](https://leetcode.cn/problems/sum-root-to-leaf-numbers/)

## 题意



## 题解

```c++
class Solution {
public:
    int ans = 0;

    int sumNumbers(TreeNode* root) {
        if (root) dfs(root, 0);
        return ans;
    }

    void dfs(TreeNode* root, int number) {
        number = number * 10 + root->val;
        if (!root->left && !root->right) ans += number;
        if (root->left) dfs(root->left, number);
        if (root->right) dfs(root->right, number);
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
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    int res = 0;
    int v = 0;
    void dfs(TreeNode* root) {
        if (!root) return;
        int t = v;
        v = v * 10 + root->val;
        if (!root->left && !root->right)
            res += v;
        dfs(root->left);
        dfs(root->right);
        v = t;
    }
    int sumNumbers(TreeNode* root) {
        dfs(root);
        return res;
    }
};
```



```python
class Solution:
    def sumNumbers(self, root: TreeNode) -> int:
        self.res = 0 

        def dfs(root, s):
            if not root:return 
            s = s * 10 + root.val 
            if not root.left and not root.right:
                self.res += s 
            dfs(root.left, s)
            dfs(root.right, s)

        dfs(root, 0)
        return self.res 
```

