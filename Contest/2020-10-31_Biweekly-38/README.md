## [比赛链接](https://leetcode.cn/contest/biweekly-contest-38/)


### [1636. 按照频率将数组升序排序](https://leetcode.cn/problems/sort-array-by-increasing-frequency/)

利用 STL 即可

```c++
    unordered_map<int, int> mp;
        for(auto & v : nums) ++mp[v];
        // cnt up, value down
        set<pair<int, int>> s;
        for(auto & [k, v] : mp) s.insert({v, -k});
        vector<int> res;
        for(auto & p : s) {
            int cnt = p.first, val = -p.second;
            while(cnt--) res.push_back(val);
        }
        return res;
   }
```

也可以不用 set 直接用 vector

```c++
    vector<int> frequencySort(vector<int>& nums) {
        map<int, int> mp;
        for(int x : nums) mp[x] += 1;
        vector<pair<int, int>> vp;
        for(auto p : mp) vp.push_back({p.second, -p.first});
        vector<int> ans;
        sort(vp.begin(), vp.end());
        for(auto p : vp)
            for(int i = 0; i < p.first; i += 1) ans.push_back(-p.second);
        return ans;
    }
```


### [1637. 两点之间不包含任何点的最宽垂直面积](https://leetcode.cn/problems/widest-vertical-area-between-two-points-containing-no-points/)

排序统计 x 坐标即可

```c++
    int maxWidthOfVerticalArea(vector<vector<int>>& points) {
        vector<int> xs;
        for(auto & p : points) xs.push_back({p[0]});
        sort(xs.begin(), xs.end());
        int n = xs.size();  // n >= 2
        int d = 0;
        for(int i = 1; i < n; ++i) d = max(d, xs[i] - xs[i-1]);
        return d;
    }
```

### [5541. 统计只差一个字符的子串数目](https://leetcode.cn/problems/count-substrings-that-differ-by-one-character/)

枚举就能过

```c++
    bool check(string a, string b) {
        int dif = 0, n = a.size();
        for(int i = 0; i < n; ++i) {
            if(a[i] != b[i]) ++dif;
            if(dif > 1) return false;
        }
        return dif == 1;
    }
    int countSubstrings(string s, string t) {
        int ns = s.size(), nt = t.size();
        int ml = min(ns, nt), res = 0;
        for(int len = 1; len <= ml; ++len)
            for(int i = 0; i+len-1 < ns; ++i)
                for(int j = 0; j+len-1 < nt; ++j) {
                    string a = s.substr(i, len), b = t.substr(j, len);
                    if(check(a, b)) ++res;
                }
        return res;
    }
```

枚举优化：【枚举不同点 向两端扩展】

```c++
    int countSubstrings(string s, string t) {
        int n = s.size(), m = t.size();
        int mlen = min(n, m);
        int ans = 0;
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < m; ++j) {
                if (s[i] == t[j])
                    continue;
                int l = 0;
                while (i - (l + 1) >= 0 && j - (l + 1) >= 0 && s[i - (l + 1)] == t[j - (l + 1)])
                    l++;
                int r = 0;
                while (i + (r + 1) < n && j + (r + 1) < m && s[i + (r + 1)] == t[j + (r + 1)])
                    r++;
                ans += (l + 1) * (r + 1);
            }
        return ans;
    }
```

### [1639. 通过给定词典构造目标字符串的方案数](https://leetcode.cn/problems/number-of-ways-to-form-a-target-string-given-a-dictionary/) [TAG]

线性 dp

```c++
    const int mod = 1e9+7;
    int numWays(vector<string>& words, string target) {
        int n = words[0].size(), m = target.size();
        vector<vector<int>> cnt(n+1, vector<int>(26));
        vector<vector<long long>> f(n+1, vector<long long>(m+1));
        for(auto & w : words)
            for(int i = 0; i < n; ++i)
                ++cnt[i+1][w[i]-'a'];
        f[0][0] = 1;
        for(int i = 1; i <= n; ++i)
            for(int j = 0; j <= m; ++j)
                if(j == 0) f[i][j] = f[i-1][j];
                else f[i][j] = (f[i-1][j] + f[i-1][j-1]*cnt[i][target[j-1]-'a']) % mod;
        return f[n][m];
    }
```

```c++
    const int mod = 1e9+7;
    int numWays(vector<string>& words, string target) {
        int n = words[0].size(), m = target.size();
        vector<vector<int>> cnt(n+1, vector<int>(26));
        vector<vector<long long>> f(n+1, vector<long long>(m+1));
        for(auto & w : words)
            for(int i = 0; i < n; ++i)
                ++cnt[i+1][w[i]-'a'];
        for(int i = 0; i <= n; ++i) f[i][0] = 1;
        for(int i = 1; i <= n; ++i)
            for(int j = 1; j <= m; ++j)
                f[i][j] = (f[i-1][j] + f[i-1][j-1]*cnt[i][target[j-1]-'a']) % mod;
        return f[n][m];
    }
```
