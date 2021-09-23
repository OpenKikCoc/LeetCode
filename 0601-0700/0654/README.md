#  [654. 最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)

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
// 设计到查询区间最值 显然可以RMQ
class Solution {
public:
    int n, k;
    vector<vector<int>> f;
    vector<int> nums;

    int query(int l, int r) {
        int len = r - l + 1;
        int k = log(len) / log(2);
        int a = f[l][k], b = f[r - (1 << k) + 1][k];
        if (nums[a] > nums[b]) return a;
        return b;
    }

    TreeNode* build(int l, int r) {
        if (l > r) return nullptr;
        int k = query(l, r);
        auto root = new TreeNode(nums[k]);
        root->left = build(l, k - 1);
        root->right = build(k + 1, r);
        return root;
    }

    TreeNode* constructMaximumBinaryTree(vector<int>& nums) {
        this->nums = nums;
        n = nums.size();
        k = log(n) / log(2);
        f = vector<vector<int>>(n, vector<int>(k + 1));
        for (int j = 0; j <= k; ++ j )
            for (int i = 0; i + (1 << j) - 1 < n; ++ i ) {
                if (!j) f[i][j] = i;
                else {
                    int l = f[i][j - 1], r = f[i + (1 << j - 1)][j - 1];
                    if (nums[l] > nums[r]) f[i][j] = l;
                    else f[i][j] = r;
                }
            }
        return build(0, n - 1);
    }
};

// 暴力做法就能过
class Solution_2 {
public:
    TreeNode* dfs(vector<int>& nums, int l, int r) {
        if (l >= r) return nullptr;
        int p = l;
        for (int i = l; i < r; ++ i )
            if (nums[i] > nums[p])
                p = i;
        TreeNode* root = new TreeNode(nums[p]);
        root->left = dfs(nums, l, p);
        root->right = dfs(nums, p + 1, r);
        return root;
    }
    TreeNode* constructMaximumBinaryTree(vector<int>& nums) {
        int n = nums.size();
        return dfs(nums, 0, n);
    }
};
```



```python
# 属于 重构二叉树的题型
# 采用递归算法，假设 build(l, r) 表示对数组中 [l, r] 闭区间的部分构造二叉树；
# 首先找出最大值及其所在位置 max_i，
# 然后构造一个新的结点 rt， 递归 build(l, max_i - 1) 和 build(max_i + 1, r) 分别作为 rt 的# 左右儿子，最后返回该结点 rt

class Solution:
    def constructMaximumBinaryTree(self, nums: List[int]) -> TreeNode:
        if not nums:return 

        def build(l, r):
            if l > r:return 
            max_num, max_i = nums[l], l 
            for i in range(l + 1, r + 1):
                if max_num < nums[i]:
                    max_num = nums[i]
                    max_i = i  
            rt = TreeNode(max_num)
            rt.left = build(l, max_i - 1)
            rt.right = build(max_i + 1, r)
            return rt

        return build(0, len(nums) - 1)
```

