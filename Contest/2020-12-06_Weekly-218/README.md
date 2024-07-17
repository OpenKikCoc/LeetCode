## [比赛链接](https://leetcode.cn/contest/weekly-contest-218/)

rating 249 / 3760

### [5617. 设计 Goal 解析器](https://leetcode.cn/problems/goal-parser-interpretation/)

线性扫描即可

```c++
class Solution {
public:
    string interpret(string command) {
        int n = command.size();
        string res;
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            if (command[j] == 'G') {
                ++ j;
                res.push_back('G');
            } else if (command[j] == '(') {
                ++ j;
                if (command[j] == ')') {
                    ++ j;
                    res.push_back('o');
                } else {
                    j += 3;
                    res += "al";
                }
            }
            i = j - 1;
        }
        return res;
    }
};
```


### [5618. K 和数对的最大数目](https://leetcode.cn/problems/max-number-of-k-sum-pairs/)

双指针 & hash 统计

```c++
class Solution {
public:
    int maxOperations(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int res = 0;
        for (int l = 0, r = n - 1; l < r;) {
            if (nums[l] + nums[r] > k) -- r;
            else if (nums[l] + nums[r] < k) ++ l;
            else {
                ++ res;
                ++ l , -- r;
            }
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    int maxOperations(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        unordered_map<int, int> hash;
        for (auto c : nums) ++ hash[c];
        int res = 0;
        for (auto [x, v] : hash) {
            int y = k - x;
            if (hash.count(x) && hash.count(y)) {
                int cnt = min(hash[x], hash[y]);
                if (x == y) cnt /= 2;
                res += cnt;
                hash[x] -= cnt, hash[y] -= cnt;
            }
        }
        return res;
    }
};
```

### [5620. 连接连续二进制数字](https://leetcode.cn/problems/concatenation-of-consecutive-binary-numbers/)

线性递推即可

```c++
class Solution {
public:
    // 连接起来的数字本质是
    typedef long long LL;
    const LL mod = 1e9 + 7;
    LL getw(LL x) {
        LL res = 0;
        while (x) {
            x >>= 1;
            ++ res;
        }
        return res;
    }
    int concatenatedBinary(int n) {
        vector<LL> f(n + 1);
        f[1] = 1;
        for (int i = 2; i <= n; ++ i ) {
            LL t = (LL)pow(2, getw(i)) % mod;
            f[i] = f[i - 1] * t % mod + i;
            f[i] %= mod;
        }
        return f[n];
    }
};
```

```c++
class Solution {
public:
    int concatenatedBinary(int n) {
        long long res = 0, mod = 1e9 + 7;
        vector<int> g(n + 1);
        for (int i = 1; i <= n; i ++ ) {
            g[i] = g[i / 2] + 1;
            (res = (res << g[i]) + i) %= mod;
        }
        return res;
    }
};
```

### [5619. 最小不兼容性](https://leetcode.cn/problems/minimum-incompatibility/) [TAG]

状压 dp

**核心在枚举子集的时间复杂度 3 ^ n   以及枚举枚举思路**：

```c++
        for (int i = 1; i < 1 << n; ++ i )
            for (int j = i; j; j = j - 1 & i)
                if (g[j] != -1)
                    f[i] = min(f[i], f[i - j] + g[j]);
```

AC 代码

```c++
class Solution {
public:
    const int INF = 1e8;
    int minimumIncompatibility(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> f(1 << n, INF);     // f[i]表示选取下标组合是i的二进制表示的最小兼容性和
        vector<int> g(1 << n);          // g[i]表示一种合法组合的兼容性
        // 预处理 g  复杂度 2^16 * (n + nlogn) = 2^16 * 5n = 5 * 2^20 = 5e6
        int d[16];
        for (int i = 1; i < 1 << n; ++ i ) {
            g[i] = -1;
            if (__builtin_popcount(i) == n / k) {
                int cnt = 0;
                for (int j = 0; j < n; ++ j )
                    if (i >> j & 1)
                        d[cnt ++ ] = nums[j];
                sort(d, d + cnt);
                int flag = 1;
                for (int j = 1; j < cnt; ++ j )
                    // 存在相同的两个数则不合法
                    if (d[j] == d[j - 1]) {
                        flag = 0;
                        break;
                    }
                if (flag)
                    g[i] = d[cnt - 1] - d[0];
            }
        }

        // 枚举所有子集的时间是3^n次  通过二项式定理能够证明出来
        f[0] = 0;
        for (int i = 1; i < 1 << n; ++ i )
            for (int j = i; j; j = j - 1 & i)   // 枚举 i 的所有子集
                if (g[j] != -1)                 // i 的子集 j 是合法的【包含n/k个】 则转移
                    f[i] = min(f[i], f[i - j] + g[j]);
        int res = f[(1 << n) - 1];
        if (res == INF) res = -1;
        return res;
    }
};
```
