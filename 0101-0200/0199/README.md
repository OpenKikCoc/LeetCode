#  [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/)

## 题意



## 题解

```c++
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        queue<TreeNode*> q;
        vector<int> res;
        if (!root) return res;
        q.push(root);
        while (q.size()) {
            int len = q.size();
            for (int i = 0; i < len; i ++ ) {
                auto t = q.front();
                q.pop();
                if (t->left) q.push(t->left);
                if (t->right) q.push(t->right);
                if (i == len - 1) res.push_back(t->val);
            }
        }
        return res;
    }
};
```


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
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        if(!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        TreeNode* tmp;
        while (!q.empty()) {
            int tot = q.size();
            int v;
            while (tot -- ) {
                tmp = q.front();
                q.pop();
                v = tmp->val;
                if (tmp->left) q.push(tmp->left);
                if (tmp->right) q.push(tmp->right);
            }
            res.push_back(v);
        }
        return res;
    }
};
```



```python
# BFS 
class Solution:
    def rightSideView(self, root: TreeNode) -> List[int]:
        if not root:return []
        q = collections.deque()
        q.append(root)
        res = []
        while q:
            tmp = []
            for _ in range(len(q)):
                node = q.popleft()
                tmp.append(node.val)
                if node.left:q.append(node.left)
                if node.right:q.append(node.right)
            res.append(tmp[-1])
        return res
```

