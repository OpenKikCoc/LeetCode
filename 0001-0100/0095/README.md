#  [95. 不同的二叉搜索树 II](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)

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
    vector<TreeNode*> helper(int s, int t) {
        vector<TreeNode*> ret;
        if(s > t) {
            ret.push_back(nullptr);
            return ret;
        }
        for(int i = s; i <= t; ++i) {
            auto ls = helper(s, i-1);
            auto rs = helper(i+1, t);
            for(auto l : ls) for(auto r : rs) {
                TreeNode *n = new TreeNode(i);
                n->left = l, n->right = r;
                ret.push_back(n);
            }
        }
        return ret;
    }
    vector<TreeNode*> generateTrees(int n) {
        vector<TreeNode*> res;
        if(!n) return res;
        res = helper(1, n);
        return res;
    }
};
```



```python3

```

