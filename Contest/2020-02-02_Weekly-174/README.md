## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-174/)


### [1337. 方阵中战斗力最弱的 K 行](https://leetcode-cn.com/problems/the-k-weakest-rows-in-a-matrix/)

排序即可 排序时需加入原来一个 `vector<int>` 所在的下标 这里采取之前某次周赛的经验 直接在最后加入一个元素即可(让下标参与排序)

```c++
    vector<int> kWeakestRows(vector<vector<int>>& mat, int k) {
        int n = mat.size(), m = mat[0].size();
        for(int i = 0; i < n; ++i) {
            //sort(mat[i].begin(), mat[i].end()); // 1总是在0之前 所以这个可以省略 如果乱序就需要内部排序
            mat[i].push_back(i);
        }
        sort(mat.begin(), mat.end());
        vector<int> res;
        for(int i = 0; i < k; ++i) res.push_back(mat[i][m]);
        return res;
    }
```


### [1338. 数组大小减半](https://leetcode-cn.com/problems/reduce-array-size-to-the-half/)

返回 **至少** 能删除数组中的一半整数的整数集合的最小大小。

*至少 一词把这个问题简化很多 排序从后向前扫即可*

**进阶：找到最小集合大小使得刚好删除数组的一半 若不存在返回-1 ==> 则此时转化为完全背包问题**

```c++
    int minSetSize(vector<int>& arr) {
        unordered_map<int, int> m;
        int n = arr.size();
        for(int i = 0; i < n; ++i) ++m[arr[i]];
        vector<int> vs;
        for(auto kv : m) vs.push_back(kv.second);
        sort(vs.begin(), vs.end());
        int t = vs.size(), sum = n&1 ? n/2+1:n/2, res = 0;
        for(int i = t-1; i >= 0; --i) {
            sum -= vs[i], ++res;
            if(sum <= 0) break;
        }
        return res;
    }
```

### [1339. 分裂二叉树的最大乘积](https://leetcode-cn.com/problems/maximum-product-of-splitted-binary-tree/)

简单树dp

```c++
// 首先对每个节点的子节点求和 (使用longlong计数)
// 对于当前某个非叶子节点 可以断开 左/右 断左答案为lsum*(allsum-lsum) 断右答案为rsum*(allsum-rsum);
    int mod = 1e9+7;
    long long res, allsum;
    unordered_map<TreeNode*, long long> sum;
    long long dfs(TreeNode* r) {
        if(!r) return 0;
        return sum[r] = dfs(r->left) + dfs(r->right) + r->val;
    }
    void helper(TreeNode* r) {
        if(!r) return;
        long long v;
        if(r->left) {
            v = sum[r->left];
            res = max(res, v*(allsum-v));
        }
        if(r->right) {
            v = sum[r->right];
            res = max(res, v*(allsum-v));
        }
        helper(r->left);
        helper(r->right);
    }
    int maxProduct(TreeNode* root) {
        res = 0;
        allsum = dfs(root);
        helper(root);
        return res%mod;
    }
```

稍稍换个思路 其实除边也是让某一棵树子树独立 这样写

```c++
    int mod = 1e9+7;
    long long res, allsum;
    unordered_map<TreeNode*, long long> sum;
    long long dfs(TreeNode* r) {
        if(!r) return 0;
        return sum[r] = dfs(r->left) + dfs(r->right) + r->val;
    }
    void helper(TreeNode* r) {
        if(!r) return;
        long long v;
        v = sum[r];
        res = max(res, v*(allsum-v));
        helper(r->left);
        helper(r->right);
    }
    int maxProduct(TreeNode* root) {
        res = 0;
        allsum = dfs(root);
        helper(root);
        return res%mod;
    }
```



### [1340. 跳跃游戏 V](https://leetcode-cn.com/problems/jump-game-v/)

dp 记忆化搜索即可

```c++
    int dfs(vector<int>& arr, vector<int>& dp, int n, int d, int x) {
        if(dp[x]) return dp[x];
        dp[x] = 1;
        for(int i = x-1; i >= max(0, x-d); --i) {
            // check
            if(arr[i] >= arr[x]) break;
            dp[x] = max(dp[x], dfs(arr,dp,n,d,i)+1);
        }
        for(int i = x+1 ; i <= min(n-1, x+d); ++i) {
            // check
            if(arr[i] >= arr[x]) break;
            dp[x] = max(dp[x], dfs(arr,dp,n,d,i)+1);
        }
        return dp[x];
    }
    int maxJumps(vector<int>& arr, int d) {
        int n = arr.size(), res = 0;
        vector<int> dp(n);
        for(int i = 0; i < n; ++i) {
            res = max(res, dfs(arr, dp, n, d, i));
        }
        return res;
    }
```
