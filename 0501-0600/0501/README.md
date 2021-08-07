#  [501. 二叉搜索树中的众数](https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/)

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

// 1. 符合惯性 但实现并不友好
class Solution {
public:
    vector<int> res;
    int maxc = 0, cnt = 0, last = INT_MIN;
    void dfs(TreeNode * root) {
        if (!root) return;
        dfs(root->left);
        if (root->val == last) ++ cnt;
        else {
            if (cnt > maxc) res = {last}, maxc = cnt;
            else if (cnt == maxc) res.push_back(last);
            cnt = 1;
        }
        last = root->val;
        dfs(root->right);
    }
    vector<int> findMode(TreeNode* root) {
        dfs(root);
        if (cnt > maxc) res = {last}, maxc = cnt;
        else if (cnt == maxc && cnt) res.push_back(last);
        return res;
    }
};


// 2. 新写法
// yxc
class Solution {
public:
    vector<int> res;
    int maxc = 0, cnt = 0, last = INT_MIN;
    void dfs(TreeNode * root) {
        if (!root) return;
        dfs(root->left);
        if (!cnt || root->val == last) ++ cnt;
        else cnt = 1;
        last = root->val;
        if (cnt > maxc) res = {last}, maxc = cnt;
        else if (cnt == maxc) res.push_back(last);
        dfs(root->right);
    }
    vector<int> findMode(TreeNode* root) {
        dfs(root);
        return res;
    }
};
```



```python3

```

