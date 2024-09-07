## [比赛链接](https://leetcode.cn/contest/weekly-contest-411/)


###  [3258. 统计满足 K 约束的子字符串数量 I](https://leetcode.cn/problems/count-substrings-that-satisfy-k-constraint-i/) 



```c++
class Solution {
public:
    // 或条件不好计算 考虑容斥
    // 本质等于 0满足+1满足-01都满足
    
    string s;
    int n, k;
    
    unordered_map<char, int> h;
    bool check(unordered_set<char> & S) {
        for (auto c : S)
            if (h[c] > k)
                return false;
        return true;
    }
    int get(unordered_set<char> S) {
        int ret = 0;
        h.clear();
        for (int i = 0, j = 0; j < n; ++ j ) {
            h[s[j]] ++ ;
            while (i < j && !check(S))
                h[s[i ++ ]] -- ;
            ret += j - i + 1;
        }
        // cout << " ret = " << ret << endl;
        return ret;
    }
    
    int countKConstraintSubstrings(string s, int k) {
        this->s = s;
        this->n = s.size(), this->k = k;
        
        return get({'0'}) + get({'1'}) - get({'0', '1'});
    }
};
```

实际上没有必要 可以简化

```c++
class Solution {
public:
    int countKConstraintSubstrings(string s, int k) {
        unordered_map<char, int> h;
        int n = s.size(), res = 0;
        for (int i = 0, j = 0; j < n; ++ j ) {
            h[s[j]] ++ ;
            while (i < j && (h['0'] > k && h['1'] > k))
                h[s[i ++ ]] -- ;
            res += j - i + 1;
        }
        return res;
    }
};
```

###  [3259. 超级饮料的最大强化能量](https://leetcode.cn/problems/maximum-energy-boost-from-two-drinks/) 



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL f[N][2];
    // f[i][0] = max(f[i - 1][0], f[i - 2][1]) + a[i];
    // f[i][1] = max(f[i - 1][1], f[i - 2][0]) + b[i];
    
    long long maxEnergyBoost(vector<int>& energyDrinkA, vector<int>& energyDrinkB) {
        int n = energyDrinkA.size();
        memset(f, 0, sizeof f);
        
        f[1][0] = energyDrinkA[0], f[1][1] = energyDrinkB[0];
        for (int i = 2; i <= n; ++ i ) {
            int a = energyDrinkA[i - 1], b = energyDrinkB[i - 1];
            f[i][0] = max(f[i - 1][0], f[i - 2][1]) + a;
            f[i][1] = max(f[i - 1][1], f[i - 2][0]) + b;
        }
        return max(f[n][0], f[n][1]);
    }
};
```

###  [3260. 找出最大的 N 位 K 回文数](https://leetcode.cn/problems/find-the-largest-palindrome-divisible-by-k/) [TAG]

- 找规律 比较麻烦不适用
- 字典序搜索 结合pow预处理和贪心剪枝

```c++
class Solution {
public:
    // n digits... => 很长 显然没有办法枚举回文串
    // 考虑从 k 入手, 其范围数据 [1, 9]
    // - 1: 999...999
    // - 2: 899...998
    // - 3: 999...999
    // - 4: 899.8.998 ?
    //
    // => 转为搜索
    
    const static int N = 1e5 + 10;
    
    int n, m, k;
    
    int p[N];   // 10^x % k 的余数
    void init() {
        p[0] = 1;   // ATTENTION 特殊值
        for (int i = 1; i < N; ++ i )
            p[i] = p[i - 1] * 10 % k;
    }
    
    bool st[N][10];
    string res;
    
    // 从前往后填充到第i个位置 当前的模数为j (没填充的都按0...)
    bool dfs(int i, int j) {
        if (i == m)
            return j == 0;  // 需要整除
        
        st[i][j] = true;
        // 贪心: 倒序填充
        for (int d = 9; d >= 0; -- d ) {
            int j2;
            if (n % 2 && i == m - 1)
                // 奇数长度的中间位置
                j2 = (j + d * p[i]) % k;
            else
                // 其他位置 前后下标对称
                j2 = (j + d * (p[i] + p[n - 1 - i])) % k;
            
            if (!st[i + 1][j2] && dfs(i + 1, j2)) {
                // ATTENTION 细节 不访问之前访问过的点 (因为之前已经贪心有序)
                res[i] = res[n - 1 - i] = '0' + d;
                return true;
            }
        }
        return false;
    }
    
    string largestPalindrome(int n, int k) {
        this->n = n, this->m = (n + 1) / 2, this->k = k;
        this->res = string(n, '0');
        init();
        
        memset(st, 0, sizeof st);
        dfs(0, 0);
        return res;
    }
};
```

###  [3261. 统计满足 K 约束的子字符串数量 II](https://leetcode.cn/problems/count-substrings-that-satisfy-k-constraint-ii/) [TAG]

分析问题的思路

计算拆解 (两部分: 右侧 + 左侧)

本题二分分界点可过 => 可以双指针进一步优化

```c++
class Solution {
public:
    // 核心: 想到对于每一个位置i 记录其左侧最长延伸距离
    
    using LL = long long;
    const static int N = 1e5 + 10;
    
    int left[N];
    LL sum[N];
    
    vector<long long> countKConstraintSubstrings(string s, int k, vector<vector<int>>& queries) {
        int n = s.size();
        
        memset(left, 0, sizeof left), memset(sum, 0, sizeof sum);
        unordered_map<char, int> h;
        for (int i = 1, j = 1; j <= n; ++ j ) {
            h[s[j - 1]] ++ ;
            while (i < j && (h['0'] > k && h['1'] > k))
                h[s[i - 1]] -- , i ++ ;
            left[j] = i;
            sum[j] = sum[j - 1] + j - i + 1;
        }
        
        vector<LL> res;
        for (auto & q : queries) {
            int l = q[0] + 1, r = q[1] + 1;
            // ATTENTION 思考 left 的单调性质: 找到第一个 left[x] >= l 的 x
            int t = lower_bound(left + l, left + r + 1, l) - left;
            // 右侧的部分 + 左侧必然合法的部分
            res.push_back((sum[r] - sum[t/*ATTENTION*/ - 1]) + (LL)(t - l + 1) * (t - l) / 2);
        }
        return res;
    }
};
```
