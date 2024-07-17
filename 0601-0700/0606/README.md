#  [606. 根据二叉树创建字符串](https://leetcode.cn/problems/construct-string-from-binary-tree/)

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
    string res;
    void dfs(TreeNode * t) {
        if (!t) {
            return ;
        }
        res += to_string(t->val);

        // 基于题目要求的省略规则
        if (t->left || t->right) {
            res.push_back('(');
            dfs(t->left);
            res.push_back(')');
        }
        
        if (t->right) {
            res.push_back('(');
            dfs(t->right);
            res.push_back(')');
        }
    }
    string tree2str(TreeNode* t) {
        dfs(t);
        return res;
    }
};
```



```python3

```

