#  [637. 二叉树的层平均值](https://leetcode.cn/problems/average-of-levels-in-binary-tree/)

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
    vector<double> averageOfLevels(TreeNode* root) {
        vector<double> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (q.size()) {
            int sz = q.size();
            double sum = 0;
            for (int i = 0; i < sz; i ++ ) {
                auto t = q.front();
                q.pop();
                sum += t->val;
                if (t->left) q.push(t->left);
                if (t->right) q.push(t->right);
            }
            res.push_back(sum / sz);
        }
        return res;
    }
};
```



```python
class Solution:
    def averageOfLevels(self, root: TreeNode) -> List[float]:
        res = []
        q = collections.deque()
        q.append(root)
        while q:
            tmp = []
            for _ in range(len(q)):
                node = q.popleft()
                tmp.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            res.append(sum(tmp) / len(tmp))
        return res
```

