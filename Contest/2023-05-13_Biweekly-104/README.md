## [比赛链接](https://leetcode.cn/contest/biweekly-contest-104/)


### [2678. 老人的数目](https://leetcode.cn/problems/number-of-senior-citizens/)



```c++
class Solution {
public:
    int countSeniors(vector<string>& details) {
        int res = 0;
        for (auto & s : details) {
            string t = s.substr(11, 2);
            if (stoi(t) > 60)
                res ++ ;
        }
        return res;
    }
};
```


### [2679. 矩阵中的和](https://leetcode.cn/problems/sum-in-a-matrix/)



```c++
class Solution {
public:
    int matrixSum(vector<vector<int>>& nums) {
        int res = 0, n = nums.size(), m = nums[0].size();
        for (auto & xs : nums)
            sort(xs.begin(), xs.end());
        
        for (int j = 0; j < m; ++ j ) {
            int t = 0;
            for (int i = 0; i < n; ++ i )
                t = max(t, nums[i][j]);
            res += t;
        }
        return res;
    }
};
```

### [2680. 最大或值](https://leetcode.cn/problems/maximum-or/)



```c++
class Solution {
public:
    // dp
    using LL = long long;
    const static int N = 1e5 + 10, M = 16;
    
    LL f[N][M];
    
    long long maximumOr(vector<int>& nums, int k) {
        int n = nums.size();
        memset(f, 0, sizeof f);
        
        for (int i = 1; i <= n; ++ i ) {
            LL x = nums[i - 1];
            for (int a = 0; a <= k; ++ a )
                for (int b = 0; b <= a; ++ b )
                    f[i][a] = max(f[i][a], f[i - 1][a - b] | (x << b));
        }
        
        LL res = 0;
        for (int i = 0; i <= k; ++ i )
            res = max(res, f[n][i]);
        return res;
    }
};
```

### [2681. 英雄的力量](https://leetcode.cn/problems/power-of-heroes/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10, MOD = 1e9 + 7;

    LL f[N];

    int sumOfPower(vector<int>& nums) {
        f[0] = 1;
        for (int i = 1; i < N; ++ i )
            f[i] = f[i - 1] * 2 % MOD;
        sort(nums.begin(), nums.end());

        LL res = 0, s = 0;
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            LL x = nums[i]; // 作为最大值

            // 把 j=i 的情况单独拎出来 方便后面的循环化简
            res = (res + x * x % MOD * x % MOD) % MOD;

            x = x * x % MOD;

            // LL s = 0;
            // for (int j = 0; j < i; ++ j ) {
            //     LL t = f[i - j - 1], y = nums[j];
            //     s = (s + y * t % MOD) % MOD;
            // }
            if (i)
                s = (s * 2 % MOD + nums[i - 1]) % MOD;
            res = (res + x * s % MOD) % MOD;
        }
        return res;
    }
};
```
