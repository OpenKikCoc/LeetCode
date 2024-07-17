#  [103. 二叉树的锯齿形层次遍历](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/)

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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> res;
        queue<TreeNode*> q;
        if (root) q.push(root);

        int cnt = 0;
        while (q.size()) {
            vector<int> level;
            int len = q.size();
            while (len -- ) {
                auto t = q.front();
                q.pop();
                level.push_back(t->val);
                if (t->left) q.push(t->left);
                if (t->right) q.push(t->right);
            }

            if ( ++ cnt % 2 == 0) reverse(level.begin(), level.end());
            res.push_back(level);
        }

        return res;
    }
};
```



```python
# 同理
class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:return []
        res = []
        q = collections.deque()
        q.append(root)
        while q:
            tmp = []
            for _ in range(len(q)):
                node = q.popleft()
                tmp.append(node.val)
                if node.left:q.append(node.left)
                if node.right:q.append(node.right)
            if len(res) % 2 == 0:
                res.append(tmp)
            else:res.append(tmp[::-1])
        return res
```

