#  [437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/)

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
    int pathSum(TreeNode* root, int sum) {
        return root ? helper(root, sum) + pathSum(root->left, sum) + pathSum(root->right, sum) : 0;
    }
    int helper(TreeNode* root, int sum) {
        if(!root) return 0;
        int count = root->val == sum ? 1 : 0;
        count += helper(root->left, sum - root->val);
        count += helper(root->right, sum - root->val);
        return count;
    }
};
```

```c++
// yxc
class Solution {
public:
    unordered_map<int, int> cnt;
    int res = 0;

    int pathSum(TreeNode* root, int sum) {
        cnt[0] ++ ;
        dfs(root, sum, 0);
        return res;
    }

    void dfs(TreeNode* root, int sum, int cur) {
        if (!root) return;
        cur += root->val;
        res += cnt[cur - sum];
        cnt[cur] ++ ;
        dfs(root->left, sum, cur), dfs(root->right, sum, cur);
        cnt[cur] -- ;
    }
};
```


```python
# 前缀和的应用；
# 用哈希表维护 从根节点 到 当前节点路径里 每个前缀和 出现的次数。（这个前缀和 指的是 根节点到当前这个点的路径所有点的 前缀和）
# 往下递归时，把当前这个点放入哈希表里；当从这个点回溯的时候，把这个点从哈希表弹出就可以了。
import collections
class Solution:
    def pathSum(self, root: TreeNode, target: int) -> int:
        self.res = 0
        my_dic = collections.defaultdict(int)
    
        def dfs(root, cur):
            if not root:return 
            cur += root.val
            self.res += my_dic[cur - target]
            my_dic[cur] += 1
            dfs(root.left, cur)
            dfs(root.right, cur)
            my_dic[cur] -= 1
        
        my_dic[0] = 1   # 踩坑！作为一个哨兵
        dfs(root, 0)
        return self.res
```

