#  **[LeetCode 1372. 二叉树中的最长交错路径](https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/)** 

## 题意



## 题解



```c++
class Solution {
public:
    int maxAns;
    /* 0 => left, 1 => right */
    void dfs(TreeNode* o, bool dir, int len) {
        maxAns = max(maxAns, len);
        if (!dir) {		// left		
            if (o->left) dfs(o->left, 1, len + 1);
            if (o->right) dfs(o->right, 0, 1);
        } else {
            if (o->right) dfs(o->right, 0, len + 1);
            if (o->left) dfs(o->left, 1, 1);
        }
    } 

    int longestZigZag(TreeNode* root) {
        if (!root) return 0;
        maxAns = 0;
        dfs(root, 0, 0);
        dfs(root, 1, 0);
        return maxAns;
    }
};
```



**思路**

> 记录当前节点是左/右孩子，即记录当前路径的方向。搜索其孩子时，根据上一条路径方向判断。
>
> 如果当前路径方向相反，路径+1；如果路径相同，路径长度置为1

```python
class Solution:
    def longestZigZag(self, root: TreeNode) -> int:
        self.res = 0

        def dfs(u, dir, dis):
            if not u:return
            self.res = max(self.res, dis)
            # 当前节点是其父节点的右孩子
            if dir == 1:
                dfs(u.left, 0, dis + 1) # 搜索它的左孩子
                dfs(u.right, 1, 1)  # 搜索它的右孩子
            # 当前节点是其父节点的左孩子
            else:
                dfs(u.left, 0, 1)
                dfs(u.right, 1, dis +1)

        dfs(root.right, 1, 1)
        dfs(root.left, 0, 1) 
        return self.res
```

