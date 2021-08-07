#  [437. 路径总和 III](https://leetcode-cn.com/problems/path-sum-iii/)

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
    int pathSum(TreeNode* root, int sum) {
        return root ? helper(root, sum) + pathSum(root->left, sum) + pathSum(root->right, sum) : 0;
    }
    int helper(TreeNode* root, int sum) {
        if(!root) return 0;
        int count = root->val == sum ? 1 : 0;
        count += helper(root->left, sum - root->val);
        count += helper(root->right, sum - root->val);
        return count;
    }
};
```

```c++
// yxc
class Solution {
public:
    unordered_map<int, int> cnt;
    int res = 0;

    int pathSum(TreeNode* root, int sum) {
        cnt[0] ++ ;
        dfs(root, sum, 0);
        return res;
    }

    void dfs(TreeNode* root, int sum, int cur) {
        if (!root) return;
        cur += root->val;
        res += cnt[cur - sum];
        cnt[cur] ++ ;
        dfs(root->left, sum, cur), dfs(root->right, sum, cur);
        cnt[cur] -- ;
    }
};
```


```python3

```

