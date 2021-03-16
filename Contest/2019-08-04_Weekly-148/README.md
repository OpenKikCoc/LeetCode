## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-148/)


### [1144. 递减元素使数组呈锯齿状](https://leetcode-cn.com/problems/decrease-elements-to-make-array-zigzag/)

注意 只递减 简单很多

```c++
class Solution {
public:
    int movesToMakeZigzag(vector<int>& nums) {
        int n = nums.size();
        if (n < 2)
            return 0;
        int s1 = 0, s2 = 0;
        for (int i = 0; i < n; ++ i ) {
            int l = i > 0 ? nums[i - 1] : INT_MAX;
            int r = i < n - 1 ? nums[i + 1] : INT_MAX;
            int v = max(0, nums[i] - min(l, r) + 1);
            if (i & 1)
                s1 += v;
            else
                s2 += v;
        }
        return min(s1, s2);
    }
};
```


### [1145. 二叉树着色游戏](https://leetcode-cn.com/problems/binary-tree-coloring-game/)

检查 x 点所划分的不同连通块最大的一个的个数即可

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
    int s1, s2, x;
    
    int count(TreeNode * root) {
        if (!root)
            return 0;
        
        int l = count(root->left), r = count(root->right);
        
        if (root->val == x)
            s1 = l, s2 = r;
        
        return l + r + 1;
    }
    
    void dfs(TreeNode * root) {
        if (!root)
            return;
        
        if (root->val == x) {
            count(root);
        } else {
            dfs(root->left);
            dfs(root->right);
        }
    }
    
    bool btreeGameWinningMove(TreeNode* root, int n, int x) {
        this->x = x;
        s1 = s2 = 0;
        dfs(root);
        
        int v = max(max(s1, s2), n - 1 - s1 - s2);
        return v > n / 2;
    }
};
```

### [1146. 快照数组](https://leetcode-cn.com/problems/snapshot-array/)

构造 二分

```c++
class SnapshotArray {
public:
    using PII = pair<int, int>;
    vector<vector<PII>> all;
    vector<int> t;
    int times, snapcnt;
    
    SnapshotArray(int length) {
        times = snapcnt = 0;
        t.clear(); all.resize(length);
        for (int i = 0; i < length; ++ i )
            all[i].push_back({0, 0});
    }
    
    void set(int index, int val) {
        ++ times;
        all[index].push_back({times, val});
    }
    
    int snap() {
        ++ snapcnt;
        t.push_back(times);
        return snapcnt - 1;
    }
    
    int get(int index, int snap_id) {
        int time = t[snap_id];
        auto it = upper_bound(all[index].begin(), all[index].end(), PII{time + 1, -1});
        -- it;
        return it->second;
    }
};

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * SnapshotArray* obj = new SnapshotArray(length);
 * obj->set(index,val);
 * int param_2 = obj->snap();
 * int param_3 = obj->get(index,snap_id);
 */
```

### [1147. 段式回文](https://leetcode-cn.com/problems/longest-chunked-palindrome-decomposition/)

字符串 hash

O(n^2) dp 方法超时，考虑双指针向中间收缩

l r 维护已合法的两侧外部区间边界即可

```c++
class Solution {
public:
    // O(n^2)的dp会超时
    using ULL = unsigned long long;
    const static int P = 131, N = 1010;
    ULL h[N], p[N];
    int f[N][N];
    
    ULL get(int l, int r) {
        return h[r] - h[l - 1] * p[r - l + 1];
    }
    
    int longestDecomposition(string text) {
        int n = text.size();
        
        p[0] = 1;
        for (int i = 1; i <= n; ++ i ) {
            h[i] = h[i - 1] * P + text[i - 1];
            p[i] = p[i - 1] * P;
        }
        
        int res = 0, l = 1, r = n;;
        for (int i = 1, j = n; i < j; ++ i , -- j )
            if (get(l, i) == get(j, r)) {
                res += 2;
                l = i + 1, r = j - 1;
            }
        if (l <= r)
            ++ res;
        
        return res;
    }
};
```
