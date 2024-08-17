## [比赛链接](https://leetcode.cn/contest/biweekly-contest-133/)

>   virtual rank: 45 / 2326
>
>   19  0:29:35  0:01:04  0:08:46  0:10:28  0:29:35


### [3190. 使所有元素都可以被 3 整除的最少操作数](https://leetcode.cn/problems/find-minimum-operations-to-make-all-elements-divisible-by-three/)



```c++
class Solution {
public:
    int minimumOperations(vector<int>& nums) {
        int res = 0;
        for (auto x : nums) {
            int mod = x % 3;
            res += min(mod, 3 - mod);
        }
        return res;
    }
};
```


### [3191. 使二进制数组全部等于 1 的最少操作次数 I](https://leetcode.cn/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int d[N];
    
    int minOperations(vector<int>& nums) {
        memset(d, 0, sizeof d);
        
        int n = nums.size(), res = 0;
        for (int i = 0; i < n - 2; ++ i ) {
            if (i)
                d[i] = d[i - 1] + d[i];
            int x = (nums[i] + d[i]) % 2;
            if (x == 0)
                d[i] ++ , d[i + 3] -- , res ++ ;
        }
        for (int i = n - 2; i < n; ++ i ) {
            if (i)
                d[i] = d[i - 1] + d[i];
            int x = (nums[i] + d[i]) % 2;
            if (x == 0)
                return -1;
        }
        return res;
    }
};
```

### [3192. 使二进制数组全部等于 1 的最少操作次数 II](https://leetcode.cn/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-ii/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int d[N];
    
    int minOperations(vector<int>& nums) {
        memset(d, 0, sizeof d);
        
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            if (i)
                d[i] = d[i - 1] + d[i];
            int x = (nums[i] + d[i]) % 2;
            if (x == 0)
                d[i] ++ , d[N - 1] -- , res ++ ;
        }
        return res;
    }
};
```

### [3193. 统计逆序对的数目](https://leetcode.cn/problems/count-the-number-of-inversions/)

与 629 本质相同，唯一变化的点是增加了对状态转移的约束

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 310, M = 410, MOD = 1e9 + 7;
    
    int f[N][M];    // 假设用了前i个数 当前产生了j个逆序对的方案数
    // f[i][j] = f[i - 1][j] + f[i - 1][j - 1] + ... + f[i - 1][j - (i - 1)];
    // 唯一的问题在于 某些f[i-1][j] 取不到 (该位置有限制)
    
    int numberOfPermutations(int n, vector<vector<int>>& requirements) {
        memset(f, 0, sizeof f);
        unordered_map<int, int> r;
        for (auto & req : requirements) {
            int idx = req[0], val = req[1];
            r[idx] = val;
        }
        
        if (r.count(0) && r[0] != 0)
            return 0;
        
        f[1][0] = 1;
        for (int i = 2; i <= n; ++ i ) {
            if (r.count(i - 1)) {
                int j = r[i - 1];
                LL s = 0;
                for (int k = max(0, j - (i - 1)); k <= j; ++ k )
                    s += f[i - 1][k];
                f[i][j] = s % MOD;
            } else {
                LL s = 0;
                for (int j = 0; j < M; ++ j ) {
                    s += f[i - 1][j];
                    if (j - i >= 0)
                        s -= f[i - 1][j - i];
                    f[i][j] = s % MOD;
                }
            }
        }
        
        int res = 0;
        for (int i = 0; i < M; ++ i )
            res = max(res, f[n][i]);
        return res;
    }
};
```
