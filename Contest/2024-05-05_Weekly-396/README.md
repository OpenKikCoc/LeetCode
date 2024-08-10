## [比赛链接](https://leetcode.cn/contest/weekly-contest-396/)


### [3136. 有效单词](https://leetcode.cn/problems/valid-word/)



```c++
class Solution {
public:
    unordered_set<char> S = {'a', 'e', 'i', 'o', 'u'};
    
    bool isValid(string word) {
        if (word.size() < 3)
            return false;
        
        for (auto c : word) {
            bool flag = (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || isdigit(c));
            if (!flag)
                return false;
        }
        
        bool f1 = false, f2 = false;
        for (auto c : word)
            if (isalpha(c)) {
                if (S.count(tolower(c)))
                    f1 = true;
                else
                    f2 = true;
            }
        return f1 && f2;
    }
};
```


### [3137. K 周期字符串需要的最少操作次数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-word-k-periodic/)



```c++
class Solution {
public:
    int minimumOperationsToMakeKPeriodic(string word, int k) {
        int n = word.size(), m = n / k;
        
        unordered_map<string, int> h;
        for (int i = 0; i < n; i += k )
            h[word.substr(i, k)] ++ ;
        
        int x = 0;
        for (auto [k, v] : h)
            x = max(x, v);
        return m - x;
    }
};
```

### [3138. 同位字符串连接的最小长度](https://leetcode.cn/problems/minimum-length-of-anagram-concatenation/)

复杂度分析 勇敢暴力

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = 26;
    
    int n;
    int sum[N][M];
    
    bool check(int w) {
        for (int j = w + w; j <= n; j += w) {
            for (int k = 0; k < M; ++ k )
                if (sum[j][k] - sum[j - w][k] != sum[w][k])
                    return false;
        }
        return true;
    }
    
    int minAnagramLength(string s) {
        this->n = s.size();
        
        {
            memset(sum, 0, sizeof sum);
            for (int i = 1; i <= n; ++ i )
                for (int j = 0; j < M; ++ j )
                    sum[i][j] = sum[i - 1][j] + (s[i - 1] - 'a' == j);
        }
        
        for (int i = 1; i <= n / 2; ++ i )  // ATTENTION: i<=n/2 而不是 i<=n/i 思考
            if (n % i == 0) {
                if (check(i))
                    return i;
            }
        return n;   // 默认 只有一个串
    }
};
```

### [3139. 使数组中所有元素相等的最小开销](https://leetcode.cn/problems/minimum-cost-to-equalize-array/) [TAG]

经典原理: 两两消耗 (敏感度)

注意枚举范围

```c++
class Solution {
public:
    // 显然 每个数都要变成最大数 => 则当最终结束时 每个数字操作的总次数是一定的
    // => ATTENTION 实际上最终的操作值可能比最大值还要大 思考
    
    using LL = long long;
    const static int MOD = 1e9 + 7;
    
    int n;
    LL maxv, minv, sum, base;
    
    LL get(int x, int cost1, int cost2) {
        LL tot = base + (x - maxv) * n;   // 需要产生修改的总数
        LL maxd = x - minv;
        
        // ATTENTION:
        // trick 原理 一定可以快速分配
        // ref: [LeetCode 1953. 你可以工作的最大周数](https://leetcode.cn/problems/maximum-number-of-weeks-for-which-you-can-work/)
        if (maxd * 2 <= tot)
            return (tot / 2) * cost2 + (tot % 2) * cost1;
        // 否则 尽可能多c2, 其余都是c1
        return (tot - maxd) * cost2 + (maxd * 2 - tot) * cost1;
    }
    
    int minCostToEqualizeArray(vector<int>& nums, int cost1, int cost2) {
        if (cost2 > 2 * cost1)
            cost2 = 2 * cost1;
        
        this->maxv = 0, this->minv = 1e18, this->sum = 0;   // ATTENTION 初始化
        for (auto x : nums)
            maxv = max(maxv, (LL)x), minv = min(minv, (LL)x), sum += x;

        this->n = nums.size();
        this->base = maxv * n - sum;
        
        LL res = 1e18; // ATTENTION 1e16会WA
        for (int i = maxv; i <= maxv * 2; ++ i ) {  // ATTENTION 枚举所有可能
            LL t = get(i, cost1, cost2);
            res = min(res, t);
        }
        return res % MOD;
    }
};
```
