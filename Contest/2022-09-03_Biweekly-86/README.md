## [比赛链接](https://leetcode.cn/contest/biweekly-contest-86/)

>   virtual 123 / 4401


### [2395. 和相等的子数组](https://leetcode.cn/problems/find-subarrays-with-equal-sum/)



```c++
class Solution {
public:
    using LL = long long;
    
    bool findSubarrays(vector<int>& nums) {
        unordered_set<LL> S;
        int n = nums.size();
        for (int i = 0; i < n - 1; ++ i ) {
            LL s = nums[i] + nums[i + 1];
            if (S.count(s)) {
                return true;
            }
            S.insert(s);
        }
        return false;
    }
};
```


### [2396. 严格回文的数字](https://leetcode.cn/problems/strictly-palindromic-number/)



```c++
class Solution {
public:
    string get(int x, int d) {
        if (!x)
            return "0";
        string ret;
        while (x)
            ret.push_back(x % d), x /= d;
        return ret;
    }
    bool isStrictlyPalindromic(int n) {
        for (int i = 2; i <= n - 2; ++ i ) {
            string s = get(n, i);
            int m = s.size();
            for (int j = 0, k = m - 1; j < k; ++ j , -- k )
                if (s[j] != s[k])
                    return false;
        }
        return true;
    }
};
```

有数学证明 永远会 false

```c++
class Solution {
public:
    bool isStrictlyPalindromic(int n) {
        return false;
    }
};
```



### [2397. 被列覆盖的最多行数](https://leetcode.cn/problems/maximum-rows-covered-by-columns/)

比较简单的状压枚举 DP

重点在于学习 Gosper's Hack 算法 (可以在 $O(1)$ 的时间复杂度内找到下一个大小为固定值的集合)

```c++
class Solution {
public:
    // 显然状压
    const static int N = 13, M = 1 << 12;
    
    int g[N];
    int f[N][M];

    vector<int> GospersHack(int k, int n) {
        vector<int> xs;

        int cur = (1 << k) - 1;
        int limit = 1 << n;
        while (cur < limit) {
            // do something
            xs.push_back(cur);

            // algorithm
            int lb = cur & -cur;
            int r = cur + lb;
            cur = ((r ^ cur) >> __builtin_ctz(lb) + 2) | r;
            // 或: cur = (((r ^ cur) >> 2) / lb) | r;
        }
        return xs;
    }
    
    int maximumRows(vector<vector<int>>& matrix, int numSelect) {
        int n = matrix.size(), m = matrix[0].size();
        
        for (int i = 1; i <= n; ++ i ) {
            int st = 0;
            auto & line = matrix[i - 1];
            for (int j = 0; j < m; ++ j )
                if (line[j])
                    st += 1 << j;
            g[i] = st;
        }
        
        vector<int> xs;
        // for (int i = 0; i < 1 << m; ++ i )
        //     if (__builtin_popcount(i) == numSelect)
        //         xs.push_back(i);
        xs = GospersHack(numSelect, m);

        memset(f, 0, sizeof f);
        for (int i = 1; i <= n; ++ i ) {
            int st = g[i];
            for (auto j : xs)
                f[i][j] = f[i - 1][j] + ((st & j) == st ? 1 : 0);
        }
        int res = 0;
        for (auto i : xs)
            res = max(res, f[n][i]);
        return res;
    }
};
```

### [2398. 预算内的最多机器人数目](https://leetcode.cn/problems/maximum-number-of-robots-within-budget/)

显然有 二分 + 单调队列

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 5e4 + 10;
    
    int n;
    vector<int> ts, cs;
    LL s[N], b;
    
    int q[N];
    bool check(int k) {
        int hh = 0, tt = -1;
        for (int i = 1; i < k; ++ i ) {
            while (hh <= tt && ts[q[tt] - 1] <= ts[i - 1])
                tt -- ;
            q[ ++ tt] = i;
        }
        
        for (int i = k; i <= n; ++ i ) {
            while (hh <= tt && q[hh] <= i - k)
                hh ++ ;
            while (hh <= tt && ts[q[tt] - 1] <= ts[i - 1])
                tt -- ;
            q[ ++ tt] = i;
            
            LL t = (LL)ts[q[hh] - 1] + (s[i] - s[i - k]) * k;
            if (t <= b)
                return true;
        }
        return false;
    }
    
    int maximumRobots(vector<int>& chargeTimes, vector<int>& runningCosts, long long budget) {
        this->ts = chargeTimes, this->cs = runningCosts;
        this->n = ts.size(), this->b = budget;
        s[0] = 0;
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + cs[i - 1];
        
        int l = 1, r = n;
        while (l < r) {
            int mid = l + r >> 1;
            if (check(mid)) // 如果可以运行 mid 个
                l = mid + 1;
            else
                r = mid;
        }
        if (check(l))
            return l;
        return l - 1;
    }
};
```

推理知可直接 双指针 + 单调队列

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 5e4 + 10;
    
    int n;
    vector<int> ts, cs;
    
    int q[N];

    int maximumRobots(vector<int>& chargeTimes, vector<int>& runningCosts, long long budget) {
        this->ts = chargeTimes, this->cs = runningCosts;
        this->n = ts.size();
        
        LL s = 0;
        int hh = 0, tt = -1;
        int res = 0;
        for (int l = 0, r = 0; r < n; ++ r ) {
            // 1. 加入 r
            s += cs[r];
            //      维护区间最值
            while (hh <= tt && ts[q[tt]] <= ts[r])
                tt -- ;
            q[ ++ tt] = r;

            // 2. 收缩 l
            //      收缩的同时更新区间最值
            // ATTENTION 注意判断条件 细节
            while (hh <= tt && ts[q[hh]] + (r - l + 1) * s > budget) {
                if (l == q[hh])     // ATTENTION 思想
                    hh ++ ;
                s -= cs[l ++ ];
            }
            res = max(res, r - l + 1);
        }
        return res;
    }
};
```

