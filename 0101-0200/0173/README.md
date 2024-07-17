#  [173. 二叉搜索树迭代器](https://leetcode.cn/problems/binary-search-tree-iterator/)

## 题意



## 题解

记忆

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
class BSTIterator {
private:
    stack<TreeNode*> s;
public:
    BSTIterator(TreeNode* root) {
        while (root) {
            s.push(root);
            root = root->left;
        }
    }
    
    /** @return the next smallest number */
    int next() {
        TreeNode* cur = s.top();
        s.pop();
        int res = cur->val;
        if (cur->right) {
            cur = cur->right;
            while (cur) {
                s.push(cur);
                cur = cur->left;
            }
        }
        return res;
    }
    
    /** @return whether we have a next smallest number */
    bool hasNext() {
        return !s.empty();
    }
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator* obj = new BSTIterator(root);
 * int param_1 = obj->next();
 * bool param_2 = obj->hasNext();
 */
```



```python
# 1. init: 将根节点的左子树遍历，并且压入栈
# 2. next: 1) 因为是中序遍历，所以当前栈顶元素就是最小元素；2）弹出栈顶元素后，再将该节点向右移动，并且将左子树都遍历，压入栈中
# 3. hasNext: 判断栈中是否还有元素

class BSTIterator:
    def __init__(self, root: TreeNode):
        self.stack = []
        while root:
            self.stack.append(root)
            root = root.left

    def next(self) -> int:
        cur = self.stack.pop()
        node = cur.right
        while node:
            self.stack.append(node)
            node = node.left 
        return cur.val

    def hasNext(self) -> bool:
        return len(self.stack) > 0
```

