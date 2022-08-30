## [比赛链接](https://leetcode.cn/contest/weekly-contest-307/)


### [2383. 赢得比赛需要的最少训练时长](https://leetcode.cn/problems/minimum-hours-of-training-to-win-a-competition/)



```c++
class Solution {
public:
    int minNumberOfHours(int initialEnergy, int initialExperience, vector<int>& energy, vector<int>& experience) {
        int n = energy.size();
        int res = 0;
        {
            int need = 0;
            for (int i = 0; i < n; ++ i )
                need += energy[i];
            res += max(0, need + 1 - initialEnergy);
            // cout << " 1 need = " << need << " = " << max(0, need + 1 - initialEnergy) << endl;
        }
        {
            int need = 0;
            for (int i = 0, has = initialExperience; i < n; ++ i ) {
                int exp = experience[i];
                if (has > exp) {
                    has += exp;
                } else {
                    need += exp - has + 1;
                    has = exp * 2 + 1;
                }
            }
            // cout << " 2 need = " << need << endl;
            res += need;
        }
        return res;
    }
};
```


### [2384. 最大回文数字](https://leetcode.cn/problems/largest-palindromic-number/)

cornor case

```c++
class Solution {
public:
    const static int N = 10;
    
    int cnt[N];
    
    string largestPalindromic(string num) {
        memset(cnt, 0, sizeof cnt);
        for (auto c : num)
            cnt[c - '0'] ++ ;
        string pre;
        for (int i = 9; i >= 0; -- i )
            if (cnt[i] >= 2) {
                if (i || pre.size()) {
                    int t = cnt[i] / 2;
                    for (int j = 0; j < t; ++ j )
                        pre.push_back('0' + i);
                }
            }
        string mid;
        for (int i = 9; i >= 0; -- i )
            if (cnt[i] & 1) {
                mid.push_back('0' + i);
                break;
            }
        string suf = pre;
        reverse(suf.begin(), suf.end());
        string res = pre + mid + suf;
        if (res.empty() || res[0] == '0')
            return "0";
        return res;
    }
};
```

### [2385. 感染二叉树需要的总时间](https://leetcode.cn/problems/amount-of-time-for-binary-tree-to-be-infected/)



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
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    void dfs(TreeNode * u) {
        if (u->left) {
            add(u->val, u->left->val), add(u->left->val, u->val);
            dfs(u->left);
        }
        if (u->right) {
            add(u->val, u->right->val), add(u->right->val, u->val);
            dfs(u->right);
        }
    }
    
    int d[N];
    
    int amountOfTime(TreeNode* root, int start) {
        init();
        dfs(root);
        
        memset(d, -1, sizeof d);
        d[start] = 0;
        queue<int> q;
        q.push(start);
        while (q.size()) {
            int u = q.front(); q.pop();
            for (int i = h[u]; ~i; i = ne[i]) {
                int j = e[i];
                if (d[j] != -1)
                    continue;
                d[j] = d[u] + 1;
                q.push(j);
            }
        }
        int res = 0;
        for (int i = 0; i < N; ++ i )
            if (d[i] != -1)
                res = max(res, d[i]);
        return res;
    }
};
```

### [2386. 找出数组的第 K 大和](https://leetcode.cn/problems/find-the-k-sum-of-an-array/) [TAG]



```c++
class Solution {
public:
    using LL = long long;
    using PLI = pair<LL, int>;
    
    // 考虑将操作简化：先求所有正数和，则移除正数或添加负数都可以当作减去某一个数值
    long long kSum(vector<int>& nums, int k) {
        // 1. 对正数求和，同时将负数取反
        LL s = 0;
        for (auto & x : nums)
            if (x >= 0)
                s += x;
            else
                x = -x;
        sort(nums.begin(), nums.end());
        
        priority_queue<PLI> q;
        q.push({s, 0}); // PLI{当前和, 当前要考虑是否减去的数的下标}
        
        // 2. 循环 k-1 次
        while ( -- k ) {
            auto [s, i] = q.top(); q.pop();
            if (i == nums.size())
                continue;
            
            // ATTENTION 考虑每个数字都有 [选(保留在s里)/不选(从s里删除)] 两种方式
            // 【且初始化时已经有了 选0-th 的情况】
            // 后续只需考虑要不要让前面那个选
            
            // 不选
            q.push({s - nums[i], i + 1});
            
            // 选
            if (i)
                q.push({s - nums[i] + nums[i - 1], i + 1});
        }
        return q.top().first;
    }
};
```
