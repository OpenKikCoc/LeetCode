## [比赛链接](https://leetcode.cn/contest/biweekly-contest-116/)

>   virtual rank:
>
>   186 / 2904   12     0:04:02 0:11:36 0:19:53


### [2913. 子数组不同元素数目的平方和 I](https://leetcode.cn/problems/subarrays-distinct-element-sum-of-squares-i/)



```c++
class Solution {
public:
    const static int N = 110, MOD = 1e9 + 7;
    
    int s[N][N];
    
    int sumCounts(vector<int>& nums) {
        memset(s, 0, sizeof s);
        int n = nums.size();
        for (int i = 1; i <= n; ++ i ) {
            for (int j = 0; j < N; ++ j )
                s[i][j] = s[i - 1][j];
            s[i][nums[i - 1]] ++ ;
        }
        
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= i; ++ j ) {
                int t = 0;
                for (int k = 0; k < N; ++ k ) {
                    int d = s[i][k] - s[j - 1][k];
                    t += d > 0;
                }
                res = (res + t * t % MOD) % MOD;
            }
        return res;
    }
};
```


### [2914. 使二进制字符串变美丽的最少修改次数](https://leetcode.cn/problems/minimum-number-of-changes-to-make-binary-string-beautiful/)



```c++
class Solution {
public:
    // 思考: 必然是 1..1 0..0 交替出现
    const static int N = 1e5 + 10;
    
    int f[N][2];
    
    int minChanges(string s) {
        int n = s.size();
        memset(f, 0x3f, sizeof f);
        
        f[0][0] = f[0][1] = 0;
        for (int i = 1; i <= n; ++ i ) {
            int t = s[i - 1] - '0';
            
            // ATTENTION 状态转移 分奇偶
            if (i & 1) {
                f[i][1] = min(f[i - 1][0], f[i - 1][1]) + (t != 1);
                f[i][0] = min(f[i - 1][0], f[i - 1][1]) + (t != 0);
            } else {
                f[i][1] = f[i - 1][1] + (t != 1);
                f[i][0] = f[i - 1][0] + (t != 0);
            }
        }
        
        return min(f[n][0], f[n][1]);
    }
};
```

### [2915. 和为目标值的最长子序列的长度](https://leetcode.cn/problems/length-of-the-longest-subsequence-that-sums-to-target/)



```c++
class Solution {
public:
    // 显然 DP
    // 考虑 f[i][j] 只考虑前 i 个数，组合总和为 j 的长度最大值
    // 对于某个具体的数来说 f[i][j] = max(f[i][j], f[i - 1][j - x] + 1)
    const static int N = 1010;
    
    int f[N][N];
    
    int lengthOfLongestSubsequence(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        
        memset(f, -1, sizeof f);
        f[0][0] = 0;
        for (int i = 1; i <= n; ++ i ) {
            int x = nums[i - 1];
            for (int j = 0; j < N; ++ j )
                f[i][j] = f[i - 1][j];
            
            for (int j = x; j < N; ++ j ) {
                int t = f[i - 1][j - x];
                if (t != -1)
                    f[i][j] = max(f[i][j], t + 1);
            }
        }
        return f[n][target];
    }
};
```

### [2916. 子数组不同元素数目的平方和 II](https://leetcode.cn/problems/subarrays-distinct-element-sum-of-squares-ii/) [TAG]

线段树经典应用 重点在于推导过程

```c++
class Solution {
public:
    // 对于新的数据范围 原本 O(n^3) 的解法显然不再适用
    // 思考 已知子数组一定是连续的区间
    //
    // 考虑 某一个位置作为区间右端点 能够带来多少收益
    //   => 不同左端点的种类 平方和
    // 本质上 伴随着区间向右扩展 左侧存在不变量
    //   =>【每个位置都会让某个值的计数+1 如果这个计数是从0开始的 就是第一次出现的位置】
    // 感觉不是很好维护
    //
    // 换个思路: 右侧新增一个值 之前的计算结果能否复用？
    //    a^2+b^2+c^2...
    //   - 如果新增的值 之前未出现过    ==> 【所有 a/b/c 都要+1 再求值】
    //   - 如果之前的值 之前出现过     ==> 【ATTENTION last出现点作为分割位置 右侧都+1 再求值】
    // => 则模型可以简化为 区间修改+区间查询
    // => 【线段树 / 树状数组】
    
    using LL = long long;
    const static int N = 1e5 + 10, M = N << 2, MOD = 1e9 + 7;
    
    vector<int> xs;
    int last[N], n;

    struct Node {
        int l, r;
        // ATTENTION sum的含义是【不同元素个数】而非简单的区间和
        LL sum, add;
    } tr[M];

    void pushup(Node & u, Node & l, Node & r) {
        u.sum = l.sum + r.sum;
    }
    void pushup(int u) {
        pushup(tr[u], tr[u << 1], tr[u << 1 | 1]);
    }
    void pushdown(int u) {
        Node & root = tr[u], & left = tr[u << 1], & right = tr[u << 1 | 1];
        if (root.add) {
            left.add += root.add, left.sum += (left.r - left.l + 1) * root.add;
            right.add += root.add, right.sum += (right.r - right.l + 1) * root.add;
            root.add = 0;
        }
    }
    void build(int u, int l, int r) {
        if (l == r)
            // ATTENTION sum含义
            tr[u] = {l, r, 0, 0};
        else {
            tr[u] = {l, r};
            int mid = l + (r - l) / 2;
            build(u << 1, l, mid), build(u << 1 | 1, mid + 1, r);
            pushup(u);
        }
    }
    // modify -> add
    void modify(int u, int l, int r, int d) {
        if (tr[u].l >= l && tr[u].r <= r) {
            tr[u].sum += (tr[u].r - tr[u].l + 1) * d;
            tr[u].add += d;
        } else {
            pushdown(u);
            int mid = tr[u].l + (tr[u].r - tr[u].l) / 2;
            if (l <= mid)
                modify(u << 1, l, r, d);
            if (r > mid)
                modify(u << 1 | 1, l, r, d);
            pushup(u);
        }
    }
    LL query(int u, int l, int r) {
        if (tr[u].l >= l && tr[u].r <= r)
            return tr[u].sum;
        else {
            pushdown(u);
            int mid = tr[u].l + (tr[u].r - tr[u].l) / 2;
            LL sum = 0;
            if (l <= mid)
                sum += query(u << 1, l, r);
            if (r > mid)
                sum += query(u << 1 | 1, l, r);
            return sum;
        }
    }
    
    LL f[N];    // 所有以 i 结尾的不同元素的平方和
    // 则当从 i 转移到 i+1 时，可以基于 f[i] 加一些变动
    // 具体来说，是以 [last[x]+1, i] 为起点、i 为终点的所有区间的不同元素数增加1
    // eg:    f[i] = a^2 + b^2 + ...
    //      f[i+1] = [not_changed] + (a+1)^2 + (b+1)^2 + ...
    //             = [not_changed] + a^2 + b^2 + ... + 2a+1 + 2b+1 + ...
    //  注意到 f[i] = [not_changed] + a^2 + b^2 + ...
    // =>   f[i+1] = f[i] + 2*(a + b + ...) + 1*(改变的区间长度)
    // => 线段树维护中间的元素种类和即可

    int sumCounts(vector<int>& nums) {
        this->n = nums.size();
        this->xs = nums;
        build(1, 1, n);

        memset(last, 0, sizeof last);   // 坐标使用 [1,n]
        
        f[0] = 0;
        for (int i = 1; i <= n; ++ i ) {
            int x = nums[i - 1];
            int pre = last[x];
            
            // ATTENTION
            f[i] = f[i - 1] + (i - pre) + 2 * query(1, pre + 1, i);
            modify(1, pre + 1, i, 1);
            last[x] = i;
        }

        LL res = 0;
        for (int i = 1; i <= n; ++ i )
            res = (res + f[i]) % MOD;
        return res;
    }
};
```
