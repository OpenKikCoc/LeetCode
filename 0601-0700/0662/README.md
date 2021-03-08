#  [662. 二叉树最大宽度](https://leetcode-cn.com/problems/maximum-width-of-binary-tree/)

## 题意



## 题解

如果按照一般树编号 则爆 long long 需要每层都从1开始编号

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
    int widthOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 1});
        int res = 1;
        while (q.size()) {
            int sz = q.size();
            // 最左侧节点 l
            int l = q.front().second, r;

            while (sz -- ) {
                auto [node, rv] = q.front(); q.pop();
                r = rv;
                int id = rv - l + 1;
                
                if (node->left) q.push({node->left, id * 2});
                if (node->right) q.push({node->right, id * 2 + 1});
            }
            res = max(res, r - l + 1);
        }
        return res;
    }
};
```



```python3

```

