## [比赛链接](https://leetcode.cn/contest/weekly-contest-335/)


### [2582. 递枕头](https://leetcode.cn/problems/pass-the-pillow/)



```c++
class Solution {
public:
    int passThePillow(int n, int time) {
        int p = 1;
        for (int d = 0; time > 0; d = 1 - d) {
            if (d == 0) {
                while (p < n && time)
                    p ++ , time -- ;
            } else {
                while (p > 1 && time)
                    p -- , time -- ;
            }
        }
        return p;
    }
};
```


### [2583. 二叉树中的第 K 大层和](https://leetcode.cn/problems/kth-largest-sum-in-a-binary-tree/)



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
    using LL = long long;
    unordered_map<int, LL> hash;
    
    int maxd = 0;
    
    void dfs(TreeNode * u, int d) {
        if (!u)
            return;
        hash[d] += u->val;
        maxd = max(maxd, d);
        dfs(u->left, d + 1), dfs(u->right, d + 1);
    }
    
    long long kthLargestLevelSum(TreeNode* root, int k) {
        dfs(root, 1);
        vector<LL> xs;
        for (int i = 1; i <= maxd; ++ i )
            xs.push_back(hash[i]);
        sort(xs.begin(), xs.end());
        reverse(xs.begin(), xs.end());
        if (k <= xs.size())
            return xs[k - 1];
        return -1;
    }
};
```

### [2584. 分割数组使乘积互质](https://leetcode.cn/problems/split-the-array-to-make-coprime-products/) [TAG]

较显然的 题意可以转化为求最左侧分界点使得其左右没有 `除了 1 之外的公共质因子`

素数筛后对原数组分解即可

一种可行解为记录每个质因子出现的左右区间 按区间切即可

注意 1 的特判

```c++
class Solution {
public:
    // 显然不能直接裸着乘，考虑 1e6 数字进行质因数分解 最多有 78499
    //               【ATTENTION】 但是 不同的质因数最多只有 
    using PII = pair<int, int>;
    const static int N = 1e6 + 10, M = 1e5;
    
    int primes[M], cnt;
    bool st[N];
    void init() {
        cnt = 0;
        memset(st, 0, sizeof st);
        for (int i = 2; i < N; ++ i ) {
            if (!st[i])
                primes[cnt ++ ] = i;
            for (int j = 0; primes[j] <= (N - 1) / i; ++ j ) {
                st[primes[j] * i] = true;
                if (i % primes[j] == 0)
                    break;
            }
        }
    }
    
    int l[N], r[N];
    
    int findValidSplit(vector<int>& nums) {
        if (nums.size() <= 1)   // ATTENTION 特判
            return -1;
        
        init();
        
        // unordered_map<int, int> l, r;   // TLE
        memset(l, -1, sizeof l), memset(r, -1, sizeof r);
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            int x = nums[i];
            for (int j = 0; j < cnt && primes[j] <= x; ++ j ) {
                {
                    // 优化
                    if (!st[x]) {
                        if (l[x] == -1)
                            l[x] = i;
                        r[x] = i;
                        break;
                    }
                }
                
                
                if (x % primes[j] == 0) {
                    int y = primes[j];
                    {
                        if (l[y] == -1)   // ATTENTION 要使用 primes[j] 而非 j
                            l[y] = i;
                        r[y] = i;
                    }
                    while (x % y == 0)
                        x /= y;
                }
            }
            if (x > 1) { // 1 不统计
                if (l[x] == -1)
                    l[x] = i;
                r[x] = i;
            }
        }
        
        // 直接枚举位置显然会超时，考虑【区间分组】思想
        
        vector<PII> xs;
        for (int i = 0; i < N; ++ i )
            if (l[i] != -1)
                xs.push_back({l[i], r[i]});
        sort(xs.begin(), xs.end()); // sort by l
        
        int st = -1, ed = -1;
        vector<PII> ys;
        for (auto & s : xs)
            if (ed < s.first) {
                if (ed != -1)
                    ys.push_back({st, ed});
                st = s.first, ed = s.second;
            } else
                ed = max(ed, s.second);
        if (st != -1)
            ys.push_back({st, ed});
        
        if (ys.empty())         // 全是 1 的情况
            return 0;
        if (ys[0].first != 0)   // 前面一段是 1 的情况
            return 0;
        if (ys[0].second != n - 1)
            return ys[0].second;
        return -1;
    }
};
```

### [2585. 获得分数的方法数](https://leetcode.cn/problems/number-of-ways-to-earn-points/)

标准多重背包 求方案数

可以进一步前缀和优化 实现略

```c++
class Solution {
public:
    // 显然是个多重背包问题
    using LL = long long;
    const static int N = 55, M = 1010, MOD = 1e9 + 7;
    
    LL f[M], g[M]; // f[i] 恰好获取 i 分的方法数
    int q[M];
    
    int waysToReachTarget(int target, vector<vector<int>>& types) {
        memset(f, 0, sizeof f);
        int n = types.size(), m = target;
        
        f[0] = 1;
        
        for (int i = 0; i < n; ++ i ) {
            int c = types[i][0], w = types[i][1];
            memset(g, 0, sizeof g);
            for (int j = 0; j <= m; ++ j )  // 体积为 i
                for (int k = 0; k <= c && k * w <= j; ++ k )   // 选择用多少个
                    g[j] = (g[j] + f[j - k * w]) % MOD;
            memcpy(f, g, sizeof g);
        }
        return f[m];
    }
};
```
