#  [508. 出现次数最多的子树元素和](https://leetcode.cn/problems/most-frequent-subtree-sum/)

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
    unordered_map<int, int> mp;
    vector<int> res;
    int maxc = 0;
    int dfs(TreeNode * root) {
        if (!root) return 0;
        int v = dfs(root->left) + dfs(root->right) + root->val;
        ++ mp[v];
        if (mp[v] > maxc) res = {v}, maxc = mp[v];
        else if (mp[v] == maxc) res.push_back(v);
        return v;
    }
    vector<int> findFrequentTreeSum(TreeNode* root) {
        dfs(root);
        return res;
    }
};

class Solution_2 {
public:
    unordered_map<int, int> mp;
    int dfs(TreeNode * root) {
        if (!root) return 0;
        int v = dfs(root->left) + dfs(root->right) + root->val;
        ++ mp[v];
        return v;
    }
    vector<int> findFrequentTreeSum(TreeNode* root) {
        dfs(root);
        vector<int> res;
        int maxc = -1;
        for (auto [k, v] : mp)
            if (v > maxc) res = {k}, maxc = v;
            else if (v == maxc) res.push_back(k);
        return res;
    }
};
```



```python3

```

