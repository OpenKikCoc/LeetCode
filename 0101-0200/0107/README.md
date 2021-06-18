#  [107. 二叉树的层次遍历 II](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)

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
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
        vector<vector<int>> res;
        if(!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            int sz = q.size();
            vector<int> t;
            while(sz--) {
                TreeNode* n = q.front(); q.pop();
                t.push_back(n->val);
                if(n->left) q.push(n->left);
                if(n->right) q.push(n->right);
            }
            res.push_back(t);
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```



```python
class Solution:
    def levelOrderBottom(self, root: TreeNode) -> List[List[int]]:
        if not root:return []
        res, q = [], collections.deque()
        q.append(root)
        while q:
            tmp = []
            for _ in range(len(q)):
                node = q.popleft()
                tmp.append(node.val)
                if node.left:q.append(node.left)
                if node.right:q.append(node.right)
            res.append(tmp)
        return res[::-1]
```

