## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-50/)


### [1827. 最少操作使数组递增](https://leetcode-cn.com/problems/minimum-operations-to-make-the-array-increasing/)



```c++
class Solution {
public:
    int minOperations(vector<int>& nums) {
        int res = 0, n = nums.size();
        for (int i = 1; i < n; ++ i )
            if (nums[i] <= nums[i - 1]) {
                res += nums[i - 1] + 1 - nums[i];
                nums[i] = nums[i - 1] + 1;
            }
        return res;
    }
};
```


### [1828. 统计一个圆中点的数目](https://leetcode-cn.com/problems/queries-on-number-of-points-inside-a-circle/)



```c++
class Solution {
public:
    vector<int> countPoints(vector<vector<int>>& points, vector<vector<int>>& queries) {
        vector<int> res;
        for (auto & q : queries) {
            int cnt = 0;
            int qx = q[0], qy = q[1], r = q[2];
            for (auto & p : points) {
                int px = p[0], py = p[1];
                if ((px - qx) * (px - qx) + (py - qy) * (py - qy) <= r * r)
                    cnt ++ ;
            }
            res.push_back(cnt);
        }
        return res;
    }
};
```

### [1829. 每个查询的最大异或值](https://leetcode-cn.com/problems/maximum-xor-for-each-query/)



```c++
class Solution {
public:
    int get(int s, int b) {
        int ret = 0;
        for (int i = 0; i < b; ++ i )
            if ((s >> i & 1) == 0)
                ret += 1 << i;
        return ret;
    }
    
    vector<int> getMaximumXor(vector<int>& nums, int maximumBit) {
        vector<int> res;
        int n = nums.size();
        int s = 0;
        for (auto v : nums) {
            s ^= v;
            res.push_back(get(s, maximumBit));
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

### [1830. 使字符串有序的最少操作次数](https://leetcode-cn.com/problems/minimum-number-of-operations-to-make-string-sorted/) [TAG]

逆序观察 操作的过程（与求下一个排列恰好是逆操作）恰好是全排列

故原题可以转化为求原排列是初始（升序）排列的第几个排列

显然有 **康托展开** 或 **数位DP**

```c++
// 康托展开
class Solution {
public:
    using LL = long long;
    const int MOD = 1e9 + 7;
    
    LL quick_pow(LL a, LL b, LL m) {
        LL res = 1;
        a %= m;
        while (b) {
            if (b & 1)
                res = res * a % m;
            a = a * a % m;
            b >>= 1;
        }
        return res;
    }
    
    int makeStringSorted(string s) {
        int n = s.size();
        LL fact = 1, dup = 1;
        LL res = 0;
        vector<int> seen(26, 0);
        for (int i = n - 1; i >= 0; -- i ) {
            seen[s[i] - 'a'] ++ ;
            dup = dup * seen[s[i] - 'a'] % MOD;
            
            LL rk = 0;
            for (int j = 0; j < s[i] - 'a'; ++ j )
                rk += seen[j];
            
            res = (res + rk * fact % MOD * quick_pow(dup, MOD - 2, MOD) % MOD) % MOD;
            fact = fact * (n - i) % MOD;
        }
        return res;
    }
};
```

```c++
// 数位DP
class Solution {
public:
    using LL = long long;
    const int MOD = 1e9 + 7;
    const static int N = 3010;
    
    LL f[N], g[N];
    
    LL qmi(LL a, int b) {
        LL res = 1;
        while (b) {
            if (b & 1)
                res = res * a % MOD;
            a = a * a % MOD;
            b >>= 1;
        }
        return res;
    }
    
    // 重复排列问题
    int get(vector<int> & cnt) {
        int sum = 0;
        for (int i = 0; i < 26; ++ i )
            sum += cnt[i];
        int res = f[sum];
        for (int i = 0; i < 26; ++ i )
            res = (LL)res * g[cnt[i]] % MOD;
        return res;
    }
    
    int makeStringSorted(string s) {
        f[0] = g[0] = 1;
        for (int i = 1; i <= s.size(); ++ i ) {
            f[i] = f[i - 1] * i % MOD;
            g[i] = qmi(f[i], MOD - 2);
        }
        
        int res = 0;
        vector<int> cnt(26, 0);
        for (auto c : s)
            cnt[c - 'a'] ++ ;
        for (auto c : s) {
            int x = c - 'a';
            for (int i = 0; i < x; ++ i ) {
                if (!cnt[i])
                    continue;
                cnt[i] -- ;
                res = (res + get(cnt)) % MOD;
                cnt[i] ++ ;
            }
            cnt[x] -- ;
        }
        return res;
    }
};
```
