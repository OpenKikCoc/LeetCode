#  [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)

## 题意



## 题解


```c++
class Solution {
public:
    vector<int> ans;

    vector<int> preorderTraversal(TreeNode* root) {
        dfs(root);
        return ans;
    }

    void dfs(TreeNode* root) {
        if (!root) return;
        ans.push_back(root->val);
        dfs(root->left);
        dfs(root->right);
    }
};


class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> stk;
        while (root || stk.size()) {
            while (root) {
                res.push_back(root->val);
                stk.push(root);
                root = root->left;
            }

            root = stk.top()->right;
            stk.pop();
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
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res;
      	if (!root) return res;
        stack<TreeNode*> s;
      	TreeNode* t;
        s.push(root);
        while (!s.empty()){
            t = s.top();
            s.pop();
            if (t != nullptr){
                if (t->right) s.push(t->right);  //右节点先压栈，最后处理
                if (t->left) s.push(t->left);
                s.push(t);                      //当前节点重新压栈（留着以后处理），因为先序遍历所以最后压栈
                s.push(nullptr);                //在当前节点之前加入一个空节点表示已经访问过了
            } else {
              	res.push_back(s.top()->val);
                s.pop();
            }
        }
        return res;
    }
};
```



```python
# 递归写法
class Solution:
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        res = []
        def dfs(root):
            if not root:return 
            res.append(root.val)
            dfs(root.left)
            dfs(root.right)
        dfs(root)
        return res
      
# 迭代
class Solution:
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        if not root:return []
        res = []
        stack = []
        p = root 
        while p or stack:
            while p:
                stack.append(p)
                res.append(p.val)
                p = p.left 
            p = stack.pop()
            p = p.right 
        return res
```

