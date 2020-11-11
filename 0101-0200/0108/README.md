#  [108. 将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

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
    TreeNode* helper(vector<int>& nums, int l, int r) {
        if(l > r) return nullptr;
        int mid = l + (r-l)/2;
        TreeNode* sl = helper(nums, l, mid-1);
        TreeNode* sr = helper(nums, mid+1, r);
        TreeNode* node = new TreeNode(nums[mid]);
        node->left = sl, node->right = sr;
        return node;
    }
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        int n = nums.size();
        return helper(nums, 0, n-1);
    }
};
```



```python3

```

