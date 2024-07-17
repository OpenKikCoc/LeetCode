#  [501. 二叉搜索树中的众数](https://leetcode.cn/problems/find-mode-in-binary-search-tree/)

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

// 1. 符合惯性 但实现并不友好
class Solution {
public:
    vector<int> res;
    int maxc = 0, cnt = 0, last = INT_MIN;
    void dfs(TreeNode * root) {
        if (!root) return;
        dfs(root->left);
        if (root->val == last) ++ cnt;
        else {
            if (cnt > maxc) res = {last}, maxc = cnt;
            else if (cnt == maxc) res.push_back(last);
            cnt = 1;
        }
        last = root->val;
        dfs(root->right);
    }
    vector<int> findMode(TreeNode* root) {
        dfs(root);
        if (cnt > maxc) res = {last}, maxc = cnt;
        else if (cnt == maxc && cnt) res.push_back(last);
        return res;
    }
};


// 2. 新写法
// yxc
class Solution {
public:
    vector<int> res;
    int maxc = 0, cnt = 0, last = INT_MIN;
    void dfs(TreeNode * root) {
        if (!root) return;
        dfs(root->left);
        if (!cnt || root->val == last) ++ cnt;
        else cnt = 1;
        last = root->val;
        if (cnt > maxc) res = {last}, maxc = cnt;
        else if (cnt == maxc) res.push_back(last);
        dfs(root->right);
    }
    vector<int> findMode(TreeNode* root) {
        dfs(root);
        return res;
    }
};
```



```python
class Solution:
    def findMode(self, root: TreeNode) -> List[int]:
        if not root:
            return
        res = []
        max_count =  count = 0 
        base = float("-inf") 
        #对当前值进行处理
        def update(x):
            nonlocal max_count,count,base,res
            #相等则计数+1
            if x == base:
                count += 1
            else:
                #不相等，说明该数的节点已经全部遍历完成，更新base，count为1
                base = x
                count = 1
            #计数如果等于max，则加入result
            if count == max_count:
                res.append(base)
            #计数如果大于max，则要重置result，并把该值加入      
            if count > max_count:
                max_count = count
                res = []
                res.append(base)
        #二叉查找树，中序遍历，数据从小到大顺序处理
        def dfs(root):
            if root:
                nonlocal max_count,count,base,res
                dfs(root.left)
                update(root.val)
                dfs(root.right)
        dfs(root)
        return res
```

