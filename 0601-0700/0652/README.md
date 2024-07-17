#  [652. 寻找重复的子树](https://leetcode.cn/problems/find-duplicate-subtrees/)

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
    // 将一颗树唯一【映射】到一个整数
    vector<TreeNode*> res;

    // 唯一id
    int cnt = 0;
    unordered_map<string, int> ids;
    unordered_map<int, int> hash;

    int dfs(TreeNode * root) {
        if (!root) return 0;
        int left = dfs(root->left);
        int right = dfs(root->right);
        string key = to_string(root->val) + ' ' + to_string(left) + ' ' + to_string(right);
        if (ids.count(key) == 0) ids[key] = ++ cnt ;
        int id = ids[key];
        if (++ hash[id] == 2) res.push_back(root);
        return id;
    }


    vector<TreeNode*> findDuplicateSubtrees(TreeNode* root) {
        dfs(root);
        return res;        
    }
};
```



```python3

```

