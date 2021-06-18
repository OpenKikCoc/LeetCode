#  [637. 二叉树的层平均值](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/)

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
        if(!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            int sz = q.size();
            double tot = 0;
            for(int i = 0; i < sz; ++i) {
                TreeNode* fr = q.front(); q.pop();
                tot += fr->val;
                if(fr->left) q.push(fr->left);
                if(fr->right) q.push(fr->right);
            }
            res.push_back(double(tot)/double(sz));
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

