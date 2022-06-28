## [比赛链接](https://leetcode.cn/contest/weekly-contest-298/)


### [2309. 兼具大小写的最好英文字母](https://leetcode.cn/problems/greatest-english-letter-in-upper-and-lower-case/)



```c++
class Solution {
public:
    string greatestLetter(string s) {
        for (char c = 'Z'; c >= 'A'; -- c ) {
            bool f1 = false, f2 = false;
            for (auto t : s)
                if (t - 'A' == c - 'A')
                    f1 = true;
                else if (t - 'a' == c - 'A')
                    f2 = true;
            if (f1 && f2) {
                string res;
                res.push_back(c);
                return res;
            }
        }
        return "";
    }
};
```


### [2310. 个位数字为 K 的整数之和](https://leetcode.cn/problems/sum-of-numbers-with-units-digit-k/)

完全背包

```c++
class Solution {
public:
    const static int N = 3010, INF = 0x3f3f3f3f;
    
    int f[N];
    
    int minimumNumbers(int num, int k) {
        vector<int> t;
        for (int i = 0; i < 400; ++ i ) {
            int x = i * 10 + k;
            if (x > 0 && x <= 3000)
                t.push_back(x);
        }
        
        int m = t.size();
        memset(f, 0x3f, sizeof f);
        f[0] = 0;
        for (int i = 1; i <= m; ++ i )
            for (int j = t[i - 1]; j < N; ++ j )
                f[j] = min(f[j], f[j - t[i - 1]] + 1);
        
        return (f[num] > INF / 2 ? -1 : f[num]);
    }
};
```

### [2311. 小于等于 K 的最长二进制子序列](https://leetcode.cn/problems/longest-binary-subsequence-less-than-or-equal-to-k/)

```c++
class Solution {
public:
    using LL = long long;
    
    int longestSubsequence(string s, int k) {
        int n = s.size(), res = 0;
        // 先选所有 0 
        for (auto c : s)
            if (c == '0')
                res ++ ;
        
        LL sum = 0;
        for (int i = n - 1; i >= 0 && (n - 1 - i) < 30; -- i ) {
            if (s[i] == '1')
                sum += 1 << (n - 1 - i), res ++ ;
            if (sum > k)
                return res - 1;
        }
        return res;
    }
};
```

1A 重点在于贪心推理

```c++
class Solution {
public:
    using LL = long long;

    int longestSubsequence(string s, int k) {
        int n = s.size();
        
        vector<int> l(n + 2);
        for (int i = 1; i <= n; ++ i )
            l[i] = l[i - 1] + (s[i - 1] == '0');
        
        int res = 0;
        LL sum = 0;
        for (int i = 0, j = 0; j < n; ++ j ) {
            sum = (sum << 1) + (s[j] - '0');
            while (i <= j && sum > (LL)k) {
                if (s[i] - '0')
                    sum -= 1 << (j - i);
                i ++ ;
            }
            res = max(res, j - i + 1 + l[i]);
        }
        return res;
    }
};
```

### [2312. 卖木头块](https://leetcode.cn/problems/selling-pieces-of-wood/)

记忆化搜索即可

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 210;
    
    int n, m;
    vector<vector<int>> ps;
    LL f[N][N], g[N][N];
    
    LL dfs(int x, int y) {
        if (f[x][y] != -1)
            return f[x][y];
        // 此处不能直接使用 f[x][y]
        LL t = g[x][y];
        
        for (int i = 1; i <= x / 2; ++ i )
            t = max(t, dfs(i, y) + dfs(x - i, y));
        for (int i = 1; i <= y / 2; ++ i )
            t = max(t, dfs(x, i) + dfs(x, y - i));
        
        return f[x][y] = t;
    }
    
    long long sellingWood(int n, int m, vector<vector<int>>& prices) {
        this->n = n, this->m = m, this->ps = prices;
        for (auto & p : ps)
            g[p[0]][p[1]] = max(g[p[0]][p[1]], (LL)p[2]);
        for (int i = 1; i < N; ++ i )
            for (int j = 1; j < N; ++ j )
                g[i][j] = max(g[i][j], max(g[i][j - 1], g[i - 1][j]));
        
        memset(f, -1, sizeof f);
        return dfs(n, m);
    }
};
```



```c++
// TLE 200*200
class Solution {
public:
    using LL = long long;
    const static int N = 210;
    
    int n, m;
    vector<vector<int>> ps;
    LL f[N][N];
    
    LL dfs(int x, int y) {
        if (f[x][y] != -1)
            return f[x][y];
        // cout << " x = " << x << " y = " << y << endl;
        LL t = 0;
        for (auto & p : ps)
            if (p[0] <= x && p[1] <= y)
                t = max(t, (LL)p[2]);
        
        for (int i = 1; i <= x / 2; ++ i )
            t = max(t, dfs(i, y) + dfs(x - i, y));
        for (int i = 1; i <= y / 2; ++ i )
            t = max(t, dfs(x, i) + dfs(x, y - i));
        
        return f[x][y] = t;
    }
    
    long long sellingWood(int n, int m, vector<vector<int>>& prices) {
        this->n = n, this->m = m, this->ps = prices;
        memset(f, -1, sizeof f);
        return dfs(n, m);
    }
};
```

