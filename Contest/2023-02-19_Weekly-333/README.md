## [比赛链接](https://leetcode.cn/contest/weekly-contest-333/)


### [2570. 合并两个二维数组 - 求和法](https://leetcode.cn/problems/merge-two-2d-arrays-by-summing-values/)



```c++
class Solution {
public:
    vector<vector<int>> mergeArrays(vector<vector<int>>& nums1, vector<vector<int>>& nums2) {
        unordered_map<int, int> h;
        for (auto & p : nums1)
            h[p[0]] += p[1];
        for (auto & p : nums2)
            h[p[0]] += p[1];
        vector<vector<int>> res;
        for (auto [k, v] : h)
            res.push_back({k, v});
        sort(res.begin(), res.end());
        return res;
    }
};
```


### [2571. 将整数减少到零需要的最少操作数](https://leetcode.cn/problems/minimum-operations-to-reduce-an-integer-to-0/)



```c++
class Solution {
public:
    int minOperations(int n) {
        int res = 0;
        for (int i = 0; i < 30; ++ i ) {
            if (!(n >> i & 1))
                continue;
            int j = i;
            while (j < 30 && (n >> j & 1))
                j ++ ;
            int w = j - i;
            res ++ ;    // +1
            if (w > 1) {
                n ^= 1 << j;
            }
            i = j - 1;
        }
        return res;
    }
};
```

### [2572. 无平方子集计数](https://leetcode.cn/problems/count-the-number-of-square-free-subsets/) [TAG]

容易想到枚举质因子出现的情况 重点在于想到按顺序枚举数字来实现去重

```c++
class Solution {
public:
    // 较显然的，需要根据数据范围找思路
    //      对于 30 以内的值域，最终的集合的因子必然满足下列质数因子至多出现一次
    //          [2, 3, 5, 7, 11, 13, 17, 19, 23, 29] ==> 只有10个
    // 显然可以枚举最终的集合的情况 (2^10)
    // 问题在于，因为最终结果顺序无关，【如何避免重复计数】？
    //
    // -> 最外层增加一个维度 按照数值域顺序枚举
    using LL = long long;
    const static int N = 1100, M = 31, K = 10, MOD = 1e9 + 7;
    
    int p[K] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};
    int valid(int x) {
        int ori = x;
        int y = 0;
        for (int i = 0; i < K; ++ i ) {
            if (x % p[i] == 0) {
                int c = 0;
                while (x % p[i] == 0)
                    x /= p[i], c ++ ;
                if (c > 1)
                    return -1;
                y |= 1 << i;
            }
        }
        return y;
    }
    
    int c[M], st[M];
    LL f[N];
    
    int squareFreeSubsets(vector<int>& nums) {
        memset(c, 0, sizeof c), memset(st, 0, sizeof st);
        for (auto x : nums)
            c[x] ++ ;
        for (int i = 1; i <= 30; ++ i )
            st[i] = valid(i);
        
        int TOP = 1 << K;
        f[0] = 1;
        for (int i = 2; i <= 30; ++ i ) {
            if (st[i] == -1)
                continue;
            
            // 枚举当前使用 i 的情况下，最终集合的情况
            int x = st[i], y = (TOP - 1) ^ x;
            // ATTENTION 枚举对应补集的子集
            for (int j = y; ; j = (j - 1) & y) {    // 不能写 j = y; [j]; j = (j - 1) & y   => 因为 0 也需要考虑
                f[x | j] = (f[x | j] + f[j] * c[i] % MOD) % MOD;
                if (j == 0)
                    break;
            }
        }
        
        LL a = 1, b = 0;
        {
            for (int i = 0; i < c[1]; ++ i )
                a = (a << 1) % MOD;
        }
        {
            for (int i = 0; i < TOP; ++ i )
                b = (b + f[i]) % MOD;
        }
        return (a * b % MOD - 1 + MOD) % MOD;
    }
};
```

### [2573. 找出对应 LCP 矩阵的字符串](https://leetcode.cn/problems/find-the-string-with-lcp/) [TAG]

思维 构造

重复做

```c++
class Solution {
public:
    string findTheString(vector<vector<int>>& lcp) {
        int i = 0, n = lcp.size();
        string s(n, 0);
        for (char c = 'a'; c <= 'z'; ++ c ) {
            while (i < n && s[i])
                i ++ ;
            if (i == n) // 构造结束
                break;
            // 考虑填充第 i 个位置，以及相应的有 lcp 的所有位置（都与 i 相同）
            for (int j = i; j < n; ++ j )
                if (lcp[i][j])
                    s[j] = c;
        }
        for (int j = i; j < n; ++ j )
            if (s[j] == 0)  // 未填充完
                return "";
        
        for (int i = n - 1; i >= 0; -- i )
            for (int j = n - 1; j >= 0; -- j ) {
                int actual_lcp = 0;
                if (s[i] != s[j])
                    actual_lcp = 0;
                else if (i == n - 1 || j == n - 1)
                    actual_lcp = 1;
                else
                    actual_lcp = lcp[i + 1][j + 1] + 1;
                
                if (actual_lcp != lcp[i][j])
                    return "";
            }
        return s;
    }
};
```
