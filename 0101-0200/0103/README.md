#  [103. 二叉树的锯齿形层次遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

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
        if(!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            vector<int> v;
            int sz = q.size();
            while(sz--) {
                auto t = q.front(); q.pop();
                v.push_back(t->val);
                if(t->left) q.push(t->left);
                if(t->right) q.push(t->right);
            }
            if(res.size() & 1) reverse(v.begin(), v.end());
            res.push_back(v);
        }
        return res;
    }

    vector<vector<int>> zigzagLevelOrder2(TreeNode* root) {
        vector<vector<int>> res;
        if(!root) return res;
        stack<TreeNode*> sl, sr;
        sl.push(root);
        TreeNode* t;
        bool f = true;
        int sz;
        while(!sl.empty() || !sr.empty()) {
            vector<int> v;
            if(f) {
                sz = sl.size();
                while(sz--) {
                    t = sl.top();
                    sl.pop();
                    v.push_back(t->val);
                    if(t->left) sr.push(t->left);
                    if(t->right) sr.push(t->right);
                }
            } else {
                sz = sr.size();
                while(sz--) {
                    t = sr.top();
                    sr.pop();
                    v.push_back(t->val);
                    if(t->right) sl.push(t->right);
                    if(t->left) sl.push(t->left);
                }
            }
            res.push_back(v);
            f = !f;
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

