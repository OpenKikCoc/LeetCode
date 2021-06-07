#  [95. 不同的二叉搜索树 II](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)

## 题意



## 题解



```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<TreeNode*> helper(int s, int t) {
        vector<TreeNode*> ret;
        if(s > t) {
            ret.push_back(nullptr);
            return ret;
        }
        for(int i = s; i <= t; ++i) {
            auto ls = helper(s, i-1);
            auto rs = helper(i+1, t);
            for(auto l : ls) for(auto r : rs) {
                TreeNode *n = new TreeNode(i);
                n->left = l, n->right = r;
                ret.push_back(n);
            }
        }
        return ret;
    }
    vector<TreeNode*> generateTrees(int n) {
        vector<TreeNode*> res;
        if(!n) return res;
        res = helper(1, n);
        return res;
    }
};
```



```python
# 暴搜：递归所有方案
# 1. 对于每段连续的序列 l, l+1,...,r, 枚举二叉搜索树根节点的位置
# 2. 分别递归求出左右子树的所有方案
# 3. 左子树的任意一种方案和右子树的任意一种方案拼在一起，可以得到当前节点的一种方案，所以将左右子树的所有方案两两组和，并记录到答案中
class Solution:
    def generateTrees(self, n: int) -> List[TreeNode]:
        if not n:return []

        def dfs(l, r):
            res = []   # 踩坑1: res一定要放在递归函数里，每次进来都是[]！
            if l > r:return [None]
            for i in range(l, r + 1):# 遍历根节点的位置，每个数值都可能成为根节点
                left = dfs(l, i - 1)
                right = dfs(i + 1, r)
                for j in left:
                    for k in right:
                        root = TreeNode(i)  # 踩坑2:每次都要生成一个新的root节点树
                        root.left, root.right = j, k
                        res.append(root)
            return res

        return dfs(1, n)
```

