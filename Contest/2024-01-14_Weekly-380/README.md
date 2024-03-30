## [比赛链接](https://leetcode.cn/contest/weekly-contest-380/)


### [3005. 最大频率元素计数](https://leetcode.cn/problems/count-elements-with-maximum-frequency/)



```c++
class Solution {
public:
    int maxFrequencyElements(vector<int>& nums) {
        unordered_map<int, int> h;
        int maxc = 0;
        for (auto x : nums)
            maxc = max(maxc, ++ h[x]);
        int res = 0;
        for (auto x : nums)
            if (h[x] == maxc)
                res ++ ;
        return res;
    }
};
```


### [3006. 找出数组中的美丽下标 I](https://leetcode.cn/problems/find-beautiful-indices-in-the-given-array-i/)



```c++
class Solution {
public:
    // 本质是找到 s 中 b&k 的匹配串的所有起始位置 (i, j)
    // 并判断某个 i 附近是否存在某个 j
    
    vector<int> kmp(string p, int m) {
        vector<int> f(m + 1);
        for (int i = 2, j = 0; i <= m; ++ i ) {
            while (j && p[i] != p[j + 1])
                j = f[j];
            if (p[i] == p[j + 1])
                j ++ ;
            f[i] = j;
        }
        return f;
    }

    vector<int> beautifulIndices(string s, string a, string b, int k) {
        int n = s.size();
        if (n < a.size() || n < b.size())
            return {};
        
        s = ' ' + s, a = ' ' + a, b = ' ' + b;
        
        auto f1 = kmp(a, a.size() - 1);
        auto f2 = kmp(b, b.size() - 1);
        
        // calculate pre-sum vector for b
        vector<int> sum(n + 1, 0);
        {
            int m = b.size() - 1;
            for (int i = 1, j = 0; i <= n; ++ i ) {
                while (j && s[i] != b[j + 1])
                    j = f2[j];
                if (s[i] == b[j + 1])
                    j ++ ;
                
                if (j == m) {
                    sum[i - m + 1] ++ ; // 必须使用起始位置的下标 否则后续统计有问题
                    
                    j = f2[j];
                }
            }
            // pre-sum
            for (int i = 1; i <= n; ++ i )
                sum[i] += sum[i - 1];
        }
        
        vector<int> res;
        {
            int m = a.size() - 1;
            for (int i = 1, j = 0, c = 0; i <= n; ++ i ) {
                while (j && s[i] != a[j + 1])
                    j = f1[j];
                if (s[i] == a[j + 1])
                    j ++ ;
                
                if (j == m) {
                    int start_idx = i - m + 1;
                    // ATTENTION calculate logic
                    int l = min(max(1, start_idx - k), n);
                    int r = min(max(1, start_idx + k), n);
                    int count = sum[r] - sum[l - 1];
                    if (count)
                        res.push_back(i - m + 1 - 1);   // ATTENTION i-m+1 means modified start index, minus 1 for origin index
                    // cout << " i = " << i << " j = " << j << " start_idx = " << i - m + 1 << " l = " << l << " r = " << r << endl;
                    
                    j = f1[j];
                }
            }
        }
        
        return res;
    }
};
```

### [3007. 价值和小于等于 K 的最大数字](https://leetcode.cn/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k/)

标准二分 内部计算细节

```c++
class Solution {
public:
    // 10^15 = 45bit
    using LL = long long;
    
    bool check(LL m, LL k, int x) {
        LL res = 0;
        // bit index, start from 1
        for (int i = x; i < 50; i += x ) {
            int t = i - 1;  // actual index
            LL v = 1ll << t;
            if (v > m)
                break;
            
            bool right_exist = x > 1;
            LL right = m % v;
            LL left = m >> (t + 1);
            
            // ATTENTION 计数规则: 左侧可选范围，右侧随便选
            LL add = max(left, 0ll) * v;
            
            if (m >> t & 1) // 如果上限可以取到
                add += (right + 1);
            
            res += add;
        }
        return res <= k;
    }
    
    long long findMaximumNumber(long long k, int x) {
        // 找到第一个不符合条件的
        LL l = 1, r = 1e15;
        while (l < r) {
            LL m = l + (r - l) / 2;
            if (check(m, k, x))
                l = m + 1;
            else
                r = m;
        }
        return l - 1;
    }
};
```

### [3008. 找出数组中的美丽下标 II](https://leetcode.cn/problems/find-beautiful-indices-in-the-given-array-ii/)

同 2，KMP 应用

```c++
// 略
```
