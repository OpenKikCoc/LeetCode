## [比赛链接](https://leetcode.cn/contest/weekly-contest-325)

>   rank: 211 / 3530


### [6269. 到目标字符串的最短距离](https://leetcode.cn/problems/shortest-distance-to-target-string-in-a-circular-array/)



```c++
class Solution {
public:
    int closetTarget(vector<string>& words, string target, int startIndex) {
        int n = words.size(), res = 0x3f3f3f3f;
        for (int i = 0; i < n; ++ i ) {
            string w = words[i];
            if (w == target) {
                int t = abs(i - startIndex);
                res = min(res, min(t, n - t));
            }
        }
        
        return res == 0x3f3f3f3f ? -1 : res;
    }
};
```


### [6270. 每种字符至少取 K 个](https://leetcode.cn/problems/take-k-of-each-character-from-left-and-right/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int n;
    int c[N][3];
    
    bool check(int m, int k) {
        // 总共取 m 个, 左侧 i 个
        int t[3];
        for (int i = 0; i <= m; ++ i ) {
            for (int j = 0; j < 3; ++ j )
                t[j] = c[i][j] + c[n][j] - c[n - m + i][j];
            
            if (t[0] >= k && t[1] >= k && t[2] >= k) {
                return true;
            }
        }
        return false;
    }
    
    int takeCharacters(string s, int k) {
        n = s.size();
        memset(c, 0, sizeof c);
        for (int i = 1; i <= n; ++ i ) {
            for (int j = 0; j < 3; ++ j )
                c[i][j] = c[i - 1][j];
            c[i][s[i - 1] - 'a'] ++ ;
        }
        
        int l = 0, r = n + 1;
        while (l < r) {
            int m = l + r >> 1;
            if (check(m, k))
                r = m;
            else
                l = m + 1;
        }
        if (l == n + 1)
            return -1;
        return l;
    }
};
```

### [6271. 礼盒的最大甜蜜度](https://leetcode.cn/problems/maximum-tastiness-of-candy-basket/)



```c++
class Solution {
public:
    using LL = long long;
    
    int n;
    bool check(vector<int> & ps, LL m, int k) {
        LL t = ps[0], c = 1;
        for (int i = 1; i < n; ++ i )
            if (ps[i] >= t + m) {
                t = ps[i], c ++ ;
                if (c >= k)
                    return true;
            }
        // cout << " m = " << m << " "
        return false;
    }
    
    int maximumTastiness(vector<int>& price, int k) {
        n = price.size();
        sort(price.begin(), price.end());
        LL l = 0, r = 1e9 + 10;
        while (l < r) {
            LL m = l + (r - l) / 2;
            if (check(price, m, k))
                l = m + 1;
            else
                r = m;
        }
        return l - 1;
    }
};
```

### [6272. 好分区的数目](https://leetcode.cn/problems/number-of-great-partitions/)

加快速度

```c++
class Solution {
public:
    // 题目要求: 子数组和为 [k, sum - k]
    // 容斥 考虑: 所有选择方案，减去当前和 [0, k - 1] + [sum - k + 1, sum]
    using LL = long long;
    const static int N = 1010, MOD = 1e9 + 7;
    
    LL qpow(LL a, LL b) {
        LL ret = 1;
        while (b) {
            if (b & 1)
                ret = ret * a % MOD;
            a = a * a % MOD;
            b >>= 1;
        }
        return ret;
    }
    
    LL f[N];
    
    int countPartitions(vector<int>& nums, int k) {
        LL s = 0;
        for (auto x : nums)
            s += (LL)x;
        if (s < 2 * k)
            return 0;
        
        memset(f, 0, sizeof f);
        f[0] = 1;
        for (auto x : nums)
            for (int i = N - 1; i >= 0 && i >= x; -- i )
                f[i] = (f[i] + f[i - x]) % MOD;
        
        LL res = 0;
        for (int i = 0; i < k; ++ i )
            res = (res + f[i]) % MOD;
        // cout << " tot = " <<  << " res = " << res << endl;
        
        return (qpow(2, nums.size()) - res * 2ll % MOD + MOD) % MOD;
    }
};
```
