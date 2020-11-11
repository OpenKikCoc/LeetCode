#  [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

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
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res;
      	if(!root) return res;
        stack<TreeNode*> s;
      	TreeNode* t;
        s.push(root);
        while(!s.empty()){
            t = s.top();
            s.pop();
            if(t != nullptr){
                if(t->right) s.push(t->right);  //右节点先压栈，最后处理
                if(t->left) s.push(t->left);
                s.push(t);                      //当前节点重新压栈（留着以后处理），因为先序遍历所以最后压栈
                s.push(nullptr);                //在当前节点之前加入一个空节点表示已经访问过了
            }else{
              	res.push_back(s.top()->val);
                s.pop();
            }
        }
        return res;
    }
};
```



```python3

```

