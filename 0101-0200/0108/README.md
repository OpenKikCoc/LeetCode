#  [108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)

## 题意



## 题解



```c++

 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* helper(vector<int>& nums, int l, int r) {
        if (l > r) return nullptr;
        int mid = l + (r - l) / 2;
        TreeNode* node = new TreeNode(nums[mid]);
        node->left = helper(nums, l, mid - 1);
        node->right = helper(nums, mid + 1, r);
        return node;
    }
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        int n = nums.size();
        return helper(nums, 0, n - 1);
    }
};
```



```python
# 递归建立整棵二叉树: 每次以中点为根，以左半部分为左子树，右半部分为右子树。先分别递归建立左子树和右子树，然后令根节点的指针分别指向两棵子树。

class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        def dfs(l, r):
            if l > r:return None
            m = l + (r - l) // 2
            root = TreeNode(nums[m])
            root.left = dfs(l, m - 1)
            root.right = dfs(m + 1, r)
            return root 
        return dfs(0, len(nums) - 1)
```

