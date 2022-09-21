## [比赛链接](https://leetcode.cn/contest/weekly-contest-309/)

>   virtual 40 / 7972


### [2399. 检查相同字母间的距离](https://leetcode.cn/problems/check-distances-between-same-letters/)



```c++
class Solution {
public:
    const static int N = 26;
    
    vector<vector<int>> xs;
    
    bool checkDistances(string s, vector<int>& distance) {
        xs = vector<vector<int>>(N);
        for (int i = 0; i < s.size(); ++ i )
            xs[s[i] - 'a'].push_back(i);
        for (int i = 0; i < N; ++ i )
            if (xs[i].size() && xs[i][1] - xs[i][0] - 1 != distance[i])
                return false;
        return true;
    }
};
```


### [2400. 恰好移动 k 步到达某一位置的方法数目](https://leetcode.cn/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps/)

没取模数值溢出 WA 1

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1010, DIFF = 501, MOD = 1e9 + 7;
    
    // [-500, 1500] instead of [-1000, 2000]
    LL f[N * 2], g[N * 2];
    
    int numberOfWays(int startPos, int endPos, int k) {
        memset(f, 0, sizeof f);
        f[startPos + DIFF] = 1;
        
        for (int _ = 0; _ < k; ++ _ ) {
            memcpy(g, f, sizeof g);
            for (int j = -500; j <= 1500; ++ j )
                f[j + DIFF] = (g[j - 1 + DIFF] + g[j + DIFF + 1]) % MOD;
        }
        return f[endPos + DIFF];
    }
};
```

也可以直接组合数

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1010, MOD = 1e9 + 7;

    int f[N][N];

    int numberOfWays(int startPos, int endPos, int k) {
        int d = abs(startPos - endPos);
        if ((d + k) % 2 || d > k)
            return 0;
        
        for (int i = 0; i <= k; ++ i )
            for (int j = 0; j <= i; ++ j )
                if (!j)
                    f[i][j] = 1;
                else
                    f[i][j] = (f[i - 1][j] + f[i - 1][j - 1]) % MOD;
        // 假定向正方向走 a 步 反方向 k-a 步
        // 则 a - (k - a) = d => a = (d + k) / 2
        // C[k, (d + k) / 2]
        return f[k][(d + k) / 2];
    }
};
```

**一种新的线形求逆元的方式**

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1010, MOD = 1e9 + 7;

    LL f[N], g[N], v[N];

    int C(int n, int m) {
        if (m == 0)
            return 1;
        return f[n] * v[m] % MOD * v[n - m] % MOD;
    }

    int numberOfWays(int startPos, int endPos, int k) {
        int d = abs(startPos - endPos);
        if ((d + k) % 2 || d > k)
            return 0;
        
        // 假定向正方向走 a 步 反方向 k-a 步
        // 则 a - (k - a) = d => a = (d + k) / 2
        // C[k, (d + k) / 2]
        f[0] = g[0] = v[0] = 1;
        f[1] = g[1] = v[1] = 1;
        for (int i = 2; i < N; ++ i ) {
            f[i] = f[i - 1] * i % MOD;
            g[i] = MOD - (LL)MOD / i * g[MOD % i] % MOD;
            v[i] = v[i - 1] * g[i] % MOD;
        }
        return C(k, (d + k) / 2);
    }
};
```



### [2401. 最长优雅子数组](https://leetcode.cn/problems/longest-nice-subarray/)



```c++
class Solution {
public:
    const static int N = 32;
    
    int c[N];
    void add(int x) {
        for (int i = 0; i < N; ++ i )
            if (x >> i & 1)
                c[i] ++ ;
    }
    bool invalid() {
        for (int i = 0; i < N; ++ i )
            if (c[i] > 1)
                return true;
        return false;
    }
    void del(int x) {
        for (int i = 0; i < N; ++ i )
            if (x >> i & 1)
                c[i] -- ;
    }
    
    int longestNiceSubarray(vector<int>& nums) {
        memset(c, 0, sizeof c);
        int n = nums.size();
        
        int res = 0;
        for (int l = 0, r = 0; r < n; ++ r ) {
            add(nums[r]);
            while (l <= r && invalid()) {
                del(nums[l ++ ]);
            }
            res = max(res, r - l + 1);
        }
        return res;
    }
};
```

### [2402. 会议室 III](https://leetcode.cn/problems/meeting-rooms-iii/)

数据范围显然可以暴力

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 110;
    
    LL last[N], cnt[N]; // start end 比较大 要用 LL
    
    void init() {
        memset(last, 0, sizeof last);
        memset(cnt, 0, sizeof cnt);
    }
    
    int mostBooked(int n, vector<vector<int>>& meetings) {
        init();
        sort(meetings.begin(), meetings.end());
        
        for (auto & m : meetings) {
            int l = m[0], r = m[1];
            int p = -1;
            for (int i = 0; i < n; ++ i )
                if (last[i] <= l) {
                    p = i;
                    break;
                }
            if (p == -1) {
                for (int i = 0; i < n; ++ i )
                    if (p == -1 || last[i] < last[p])
                        p = i;
                last[p] += r - l;
            } else {
                last[p] = r;
            }
            cnt[p] ++ ;
        }
        
        int p = -1;
        for (int i = 0; i < n; ++ i )
            if (p == -1 || cnt[i] > cnt[p])
                p = i;
        return p;
    }
};
```

双堆模拟是更优的做法

```c++
class Solution {
public:
    using LL = long long;
    using PLI = pair<LL, int>;
    const static int N = 110;

    int cnt[N];

    int mostBooked(int n, vector<vector<int>>& meetings) {
        sort(meetings.begin(), meetings.end());
        priority_queue<int, vector<int>, greater<>> idle;
        priority_queue<PLI, vector<PLI>, greater<>> working;
        
        for (int i = 0; i < n; ++ i )
            idle.push(i);
        
        for (auto & m : meetings) {
            LL l = m[0], r = m[1], p = -1;
            while (!working.empty() && working.top().first <= l)
                idle.push(working.top().second), working.pop();
            if (idle.empty()) {
                auto [e, i] = working.top(); working.pop();
                r = e + r - l;
                p = i;
            } else {
                p = idle.top(); idle.pop();
            }
            cnt[p] ++ ;
            working.push({r, p});
        }
        int p = -1;
        for (int i = 0; i < n; ++ i )
            if (p == -1 || cnt[i] > cnt[p])
                p = i;
        return p;
    }
};
```

