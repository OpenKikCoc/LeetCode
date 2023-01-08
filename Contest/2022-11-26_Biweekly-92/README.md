## [比赛链接](https://leetcode.cn/contest/biweekly-contest-92/)

>   virtual rank: 125 / 3055


### [2481. 分割圆的最少切割次数](https://leetcode.cn/problems/minimum-cuts-to-divide-a-circle/)

注意 n 为 1 的特判

```c++
class Solution {
public:
    int numberOfCuts(int n) {
        if (n == 1)
            return 0;
        if (n & 1)
            return n;
        return n / 2;
    }
};
```


### [2482. 行和列中一和零的差值](https://leetcode.cn/problems/difference-between-ones-and-zeros-in-row-and-column/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int a[N], b[N], c[N], d[N];
    
    vector<vector<int>> onesMinusZeros(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        memset(a, 0, sizeof a), memset(b, 0, sizeof b), memset(c, 0, sizeof c), memset(d, 0, sizeof d);
        
        for (int i = 0; i < n; ++ i ) {
            int t = 0;
            for (int j = 0; j < m; ++ j )
                if (grid[i][j])
                    t ++ ;
            a[i] = t;
            c[i] = m - t;
        }
        for (int j = 0; j < m; ++ j ) {
            int t = 0;
            for (int i = 0; i < n; ++ i )
                if (grid[i][j])
                    t ++ ;
            b[j] = t;
            d[j] = n - t;
        }
        
        vector<vector<int>> res = vector<vector<int>>(n, vector<int>(m));
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                res[i][j] = a[i] + b[j] - c[i] - d[j];
        return res;
    }
};
```

### [2483. 商店的最少代价](https://leetcode.cn/problems/minimum-penalty-for-a-shop/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int c[N], s[N];
    
    int bestClosingTime(string customers) {
        int n = customers.size();
        s[0] = 0;
        for (int i = 1; i <= n; ++ i ) {
            auto x = customers[i - 1];
            if (x == 'Y')
                c[i] = 1;
            else
                c[i] = 0;
            s[i] = s[i - 1] + c[i];
        }
        
        int cost = 1e9, res = -1;
        for (int i = 0; i <= n; ++ i ) {    // can be 0
            int t = (i - s[i]) + (s[n] - s[i]);
            if (t < cost)
                cost = t, res = i;
        }
        return res;
    }
};
```

### [2484. 统计回文子序列数目](https://leetcode.cn/problems/count-palindromic-subsequences/)



```c++
class Solution {
public:
    // 长度为 5 则可能性有 1000 种
    const static int N = 1e4 + 10, M = 100, MOD = 1e9 + 7;
    using LL = long long;
    
    int c[10];
    LL l[N][M], r[N][M];
    
    int countPalindromes(string s) {
        {
            memset(l, 0, sizeof l);
            memset(r, 0, sizeof r);
        }
        
        int n = s.size();
        
        // l
        {
            memset(c, 0, sizeof c);
            for (int i = 0; i < n; ++ i ) {
                int t = s[i] - '0';
                for (int j = 0; j < 10; ++ j )
                    l[i][j * 10 + t] = (l[i][j * 10 + t] + c[j]) % MOD;
                c[t] ++ ;
                
                if (i) {
                    for (int j = 0; j < M; ++ j )
                        l[i][j] = (l[i][j] + l[i - 1][j]) % MOD;
                }
            }
        }
        // r
        {
            memset(c, 0, sizeof c);
            for (int i = n - 1; i >= 0; -- i ) {
                int t = s[i] - '0';
                for (int j = 0; j < 10; ++ j )
                    r[i][j * 10 + t] = (r[i][j * 10 + t] + c[j]) % MOD;
                c[t] ++ ;
                
                if (i < n - 1) {
                    for (int j = 0; j < M; ++ j )
                        r[i][j] = (r[i][j] + r[i + 1][j]) % MOD;
                }
            }
        }
        
        LL res = 0;
        for (int i = 2; i < n - 2; ++ i ) {
            int t = s[i] - '0';
            int last = res;
            for (int j = 0; j < M; ++ j ) {
                // if (l[i - 1][j] || r[i + 1][j])
                    // cout << " i = " << i << " j = " << j << " l = " << l[i - 1][j] << " r = " << r[i + 1][j] << endl;
                res = (res + l[i - 1][j] * r[i + 1][j] % MOD) % MOD;
            }
            // cout << " i = " << i << " res = " << res << " add " << res - last << endl;
        }
        return res;
    }
};
```
