## [比赛链接](https://leetcode.cn/contest/weekly-contest-374/)


### [2951. 找出峰值](https://leetcode.cn/problems/find-the-peaks/)

略

```c++
class Solution {
public:
    vector<int> findPeaks(vector<int>& mountain) {
        vector<int> res;
        int n = mountain.size();
        for (int i = 1; i < n - 1; ++ i )
            if (mountain[i] > mountain[i - 1] && mountain[i] > mountain[i + 1])
                res.push_back(i);
        return res;
    }
};
```


### [2952. 需要添加的硬币的最小数量](https://leetcode.cn/problems/minimum-number-of-coins-to-be-added/)

1798 进阶，所有的数字可能都达不到 target，此时需要继续补全

补全思维是倍增【思考】

```c++
class Solution {
public:
    int minimumAddedCoins(vector<int>& coins, int target) {
        sort(coins.begin(), coins.end());
        int res = 0, p = 1; // 当前未能表示的是 1
        for (int i = 0; i < coins.size(); ++ i ) {
            if (p > target)
                break;
            int x = coins[i];
            if (p >= x) {
                p += x;
            } else {
                // p < x
                p += p, res ++ ;
                i -- ;
            }
        }
        // ATTENTION: 思考这里的判断条件
        if (p <= target) {
            // 还有一部分需要追加元素才能够表示 此时显然 【按照p去倍增即可】
            while (p <= target) {
                res ++ ;
                p += p;
            }
        }
        return res;
    }
};
```

### [2953. 统计完全子字符串](https://leetcode.cn/problems/count-complete-substrings/)

标准暴力优化 简单推理即可

```c++
class Solution {
public:
    // 最简单暴力的处理是:
    //  1. 按照前缀和统计每个区间内的特定字符的数量
    //  2. 枚举区间 O(n^2) 再判断区间内出现的字符是否符合要求 O(26) + O(n)
    //  3. 统计求和
    //
    // 复杂度显然无法接受 考虑如何优化
    //  1. 对于某一个确定的右端点i 思考其可能包含多少个字符 假定为 c
    //  2. 则区间固定为 [i-c*k+1, i] 或者 (i-c*k, i]  => 枚举代价仍然无法接受
    // 
    // 尝试发现单调性以优化该过程
    // 容易想到: 对于一个确定的i 向左侧不会无限延伸 因为字符数量有上限 最左侧的边界也不能超过k
    //        且伴随着i右移 这个边界同样会右移【且由于第二个条件的存在 不会跨该条件的边界点】
    // 则 双指针维护区间 并维护区间内的种类数量以及各种类个数 【在有限的范围内进行枚举】
    
    const static int N = 1e5 + 10, M = 26;
    
    int sum[N][M];
    int n, k;
    
    int vars, bigger;
    int cnt[M];
    void init() {
        vars = 0, bigger = 0;
        memset(cnt, 0, sizeof cnt);
    }
    void add(char c) {
        int t = c - 'a';
        cnt[t] ++ ;
        if (cnt[t] == 1)
            vars ++ ;
        if (cnt[t] == k + 1)
            bigger ++ ;
    }
    void sub(char c) {
        int t = c - 'a';
        cnt[t] -- ;
        if (cnt[t] == 0)
            vars -- ;
        if (cnt[t] == k)
            bigger -- ;
    }
    bool invalid() {
        return bigger > 0;
    }
    bool split(char a, char b) {
        return abs(a - b) > 2;
    }
    bool check(int l, int r) {
        for (int i = 0; i < M; ++ i )
            if (sum[r][i] - sum[l - 1][i] != 0 && sum[r][i] - sum[l - 1][i] != k)
                return false;
        return true;
    }
    
    int countCompleteSubstrings(string word, int k) {
        this->n = word.size(), this->k = k;
        {
            memset(sum, 0, sizeof sum);
            for (int i = 1; i <= n; ++ i ) {
                for (int j = 0; j < M; ++ j )
                    sum[i][j] = sum[i - 1][j];
                sum[i][word[i - 1] - 'a'] ++ ;
            }
            
            init();
        }
        
        int res = 0;
        for (int i = 1, j = 1; j <= n; ++ j ) {
            if (j > 1 && split(word[j - 1], word[j - 1 - 1])) {
                init(); // 提前收缩区间
                i = j;
            }
            // 更新当前末尾 并收缩区间
            add(word[j - 1]);
            while (i <= j && invalid()) {
                sub(word[i - 1]);
                i ++ ;
            }
            
            // ok, 现在 [i, j] 是一个 [每一种的数量不超k & 不违背字母序差值过大的区间了]
            // 并且此时 符合条件的字母个数不会超过 vars 个 => 枚举?
            //
            // ATTENTION 条件必不可少 j-x*k+1 >= l
            for (int x = 1; x <= vars && j - x * k + 1 >= i; ++ x ) {
                int l = j - x * k + 1, r = j;
                if (check(l, r))
                    res ++ ;
            }
        }
        
        return res;
    }
};
```

### [2954. 统计感冒序列的数目](https://leetcode.cn/problems/count-the-number-of-infection-sequences/)

组合计数应用题 注意去重的推导和实现思路

```c++
using LL = long long;
const static int N = 1e5 + 10, MOD = 1e9 + 7;

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

LL f[N], g[N];  // 阶乘 & 逆元
bool flag = false;
void init() {
    if (flag)
        return;
    flag = true;
    f[0] = g[0] = 1;
    for (int i = 1; i < N; ++ i ) {
        f[i] = f[i - 1] * i % MOD;
        g[i] = g[i - 1] * qpow(i, MOD - 2) % MOD;
    }
}

class Solution {
public:
    // 直观看没有太好的思路 考虑尝试数学解法 [组合数学]
    //
    // ATTENTION 假设连续 0 的数量为 k
    // - 如果只有一边都可以发生传染，那么只有一种传染序列
    // - 如果两边都可以，那么每一次都可以选择从左或从右传染，除了最后一次，因此有 2^{k−1} 种序列
    //
    // 则 分区间统计累乘即可 ==> 实际上会有重复情况，因为在不同区间里也只能一次选其中的一个
    // ==> 重复元素排列问题 【计算细节】
    
    LL comb(int a, int b) {
        return f[a] * g[a - b] % MOD * g[b] % MOD;
    }
    
    int numberOfSequence(int n, vector<int>& sick) {
        init();
        sort(sick.begin(), sick.end());
        sick.push_back(n);  // 边界哨兵

        LL res = 1;
        int tot = 0, last = -1;
        for (auto x : sick) {
            int k = x - last - 1;
            if (k > 0) {
                LL t = 0;
                if (last == -1 || x == n) {
                    // 特殊情况 只能从某一个方向转移过来
                    t = 1;
                } else {
                    // 可以从 左/右 转移过来 => 2^(k-1)
                    t = qpow(2, k - 1);
                }
                // 【ATTENTION: 计算逻辑】
                // 在总长为 tot+len 的序列中，选择 len 个位置填充 (内部的填充方法有 t 种)
                res = res * comb(tot + k, k) % MOD * t % MOD;
            }
            last = x, tot += k;
        }

        return res;
    }
};
```
