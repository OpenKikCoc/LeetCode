#  [113. 路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/)

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
    vector<vector<int>> res;
    vector<int> t;
    void dfs(TreeNode* root, int sum) {
        if(!root) return;
        t.push_back(root->val);
        if(!root->left && !root->right)
            if(root->val == sum) res.push_back(t);
        dfs(root->left, sum-root->val);
        dfs(root->right, sum-root->val);
        t.pop_back();
    }
    vector<vector<int>> pathSum(TreeNode* root, int sum) {
        dfs(root, sum);
        return res;
    }
};
```



```python3

```

