#  [99. 恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/)

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
    void recoverTree(TreeNode* root) {
        TreeNode * p1 = nullptr, * p2 = nullptr, * cur = root, * pre = nullptr;
        while (cur) {
            if (cur->left) {
                auto p = cur->left;
                while (p->right && p->right != cur)
                    p = p->right;
                if (p->right) {
                    // p->right = cur;
                    p->right = nullptr;
                } else {
                    p->right = cur;
                    cur = cur->left;
                    continue;
                }
            }
            if (pre && cur->val < pre->val) {
                if (p1 == nullptr)
                    p1 = pre;
                p2 = cur;
            }
            pre = cur;
            cur = cur->right;
        }
        swap(p1->val, p2->val);
    }
};
```



```python3

```

