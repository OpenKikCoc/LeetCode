## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-266/)

>   virtual rank: 85 / 4385


### [2062. 统计字符串中的元音子字符串](https://leetcode-cn.com/problems/count-vowel-substrings-of-a-string/)

模拟即可

```c++
class Solution {
public:
    bool check(string s) {
        bool a = false, e = false, i = false, o = false, u = false;
        for (auto c : s)
            if (c == 'a')
                a = true;
            else if (c == 'e')
                e = true;
            else if (c == 'i')
                i = true;
            else if (c == 'o')
                o = true;
            else if (c == 'u')
                u = true;
            else
                return false;
        return a && e && i && o && u;
    }
    
    int countVowelSubstrings(string word) {
        int n = word.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i; j < n; ++ j )
                if (check(word.substr(i, j - i + 1)))
                    res ++ ;
        return res;
    }
};
```

可以 find 加速

```c++
class Solution {
public:
    int f(string s) {
        string p = "aeiou";
        vector<int> b(5);
        for (char c : s) {
            int x = p.find(c);
            if (x < 0) { return 0; }
            b[x] = 1;
        }
        for (int i = 0; i < 5; ++ i )
            if (!b[i]) return 0;
        return 1;
    }
    int countVowelSubstrings(string s) {
        int n = s.size();
        int r = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i; j < n; ++ j )
                if (f(s.substr(i, j - i + 1))) ++r;
        return r;
    }
};
```

### [2063. 所有子字符串中的元音](https://leetcode-cn.com/problems/vowels-of-all-substrings/)

简单 dp 优化即可

```c++
class Solution {
public:
    using LL = long long;
    
    bool check(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
    
    long long countVowels(string word) {
        int n = word.size();
        vector<LL> cnt(n + 1);
        for (int i = 1; i <= n; ++ i )
            cnt[i] = cnt[i - 1] + check(word[i - 1]);
        
        LL res = 0, s = 0;
        // [j, i]
        for (int i = 1; i <= n; ++ i ) {
            // for (int j = 1; j <= i; ++ j ) {
            //     res += cnt[i] - cnt[j - 1];
            // }
            res += cnt[i] * i - s;
            s += cnt[i];
        }
        return res;
    }
};
```

有更简单的思路，其实只要判断当前是否是元音，并以当前为中点左右扩展边界即可

```c++
// int65536
class Solution {
public:
    using LL = long long;

    long long countVowels(string s) {
        LL r = 0;
        int n = s.size();
        string p = "aeiou";
        for (int i = 0; i < n; ++ i )
            if (p.find(s[i]) != -1)
            	r += (LL)(i + 1) * (n - i);
        return r;
    }
};
```



### [2064. 分配给商店的最多商品的最小值](https://leetcode-cn.com/problems/minimized-maximum-of-products-distributed-to-any-store/)

显然二分 注意边界 RE

```c++
class Solution {
public:
    bool check(vector<int> & qs, int n, int m) {
        int c = 0;
        for (auto x : qs)
            c += (x + m - 1) / m;
        return c > n;
    }
    
    int minimizedMaximum(int n, vector<int>& qs) {
        // l = 1, otherwise: runtime error: division by zero (solution.cpp)
        // Case: n = 1, qs = [1]
        int l = 1, r = 1e9;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (check(qs, n, m))
                l = m + 1;
            else
                r = m;
        }
        return l;
    }
};
```

### [2065. 最大化一张图中的路径价值](https://leetcode-cn.com/problems/maximum-path-quality-of-a-graph/)

题目数据范围约束【4 ^ 10】显然可以爆搜，随便加个记忆化（甚至不加？）直接过

注意 dfs 内部细节

```c++
class Solution {
public:
    using TIII = tuple<int, int, int>;
    const static int N = 1010, M = 4010;    // ATTENTION: edges.length <= 2000
    
    int h[N], e[M], w[M], ne[M], idx = 0;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    vector<int> vs;
    int mt, res = 0, sum = 0;
    unordered_set<int> S;
    set<TIII> hash;
    
    void dfs(int u, int t, int sum) {
        if (t > mt)
            return;
        auto item = TIII{u, t, sum};
        if (hash.find(item) != hash.end())
            return;
        hash.insert(item);
        
        if (u == 0)
            res = max(res, sum);
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            bool f = S.count(j);
            if (f) {
                dfs(j, t + w[i], sum);
            } else {
                S.insert(j);
                dfs(j, t + w[i], sum + vs[j]);
                S.erase(j);
            }
        }
    }
    
    int maximalPathQuality(vector<int>& values, vector<vector<int>>& edges, int maxTime) {
        init();
        for (auto & es : edges)
            add(es[0], es[1], es[2]), add(es[1], es[0], es[2]);
        
        this->vs = values, this->mt = maxTime;
        this->res = vs[0];
        S.insert(0);  // ATTENTION
        dfs(0, 0, vs[0]);
        return res;
    }
};
```
