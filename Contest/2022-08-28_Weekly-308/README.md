## [比赛链接](https://leetcode.cn/contest/weekly-contest-308/)


### [2389. 和有限的最长子序列](https://leetcode.cn/problems/longest-subsequence-with-limited-sum/)



```c++
class Solution {
public:
    vector<int> answerQueries(vector<int>& nums, vector<int>& queries) {
        int n = nums.size(), m = queries.size();
        sort(nums.begin(), nums.end());
        vector<int> res(m);
        for (int i = 0; i < m; ++ i ) {
            int c = 0, s = 0, t = queries[i];
            for (auto x : nums)
                if (s + x <= t)
                    s += x, c ++ ;
                else
                    break;
            res[i] = c;
        }
        return res;
    }
};
```


### [2390. 从字符串中移除星号](https://leetcode.cn/problems/removing-stars-from-a-string/)



```c++
class Solution {
public:
    string removeStars(string s) {
        stack<char> stk;
        for (auto c : s)
            if (c == '*') {
                if (stk.empty()) {}
                else
                    stk.pop();
            } else
                stk.push(c);
        string res;
        while (stk.size())
            res.push_back(stk.top()), stk.pop();
        reverse(res.begin(), res.end());
        return res;
    }
};
```

### [2391. 收集垃圾的最少总时间](https://leetcode.cn/problems/minimum-amount-of-time-to-collect-garbage/)

可以更简单 略

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    int n;
    int s[N];
    
    int get(vector<PII> & xs) {
        if (xs.empty())
            return 0;
        int time = s[xs.back().first];
        int tot = 0;
        for (auto x : xs)
            tot += x.second;
        return time + tot;
    }
    
    int garbageCollection(vector<string>& garbage, vector<int>& travel) {
        this->n = garbage.size();
        
        s[0] = 0;
        for (int i = 1; i < n; ++ i )
            s[i] = s[i - 1] + travel[i - 1];
        
        vector<PII> ms, ps, gs;
        for (int i = 0; i < n; ++ i ) {
            int cm = 0, cp = 0, cg = 0;
            for (auto c : garbage[i])
                if (c == 'M')
                    cm ++ ;
                else if (c == 'P')
                    cp ++ ;
                else if (c == 'G')
                    cg ++ ;
            if (cm)
                ms.push_back({i, cm});
            if (cp)
                ps.push_back({i, cp});
            if (cg)
                gs.push_back({i, cg});
        }
        
        return get(ms) + get(ps) + get(gs);
    }
};
```

### [2392. 给定条件下构造矩阵](https://leetcode.cn/problems/build-a-matrix-with-conditions/)



```c++
class Solution {
public:
    const static int N = 410, M = 10010;
    
    int k;
    int r[N], c[N];
    
    int q[N], d[N];
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    bool get(vector<vector<int>> & cs, int t[]) {
        init();
        memset(t, -1, sizeof t);
        memset(d, 0, sizeof d);
        for (auto & c : cs)
            add(c[0], c[1]), d[c[1]] ++ ;
        int hh = 1, tt = 0;
        for (int i = 1; i <= k; ++ i )
            if (!d[i])
                q[ ++ tt] = i, t[i] = tt;;
        
        while (hh <= tt) {
            int u = q[hh ++ ];
            for (int i = h[u]; ~i; i = ne[i]) {
                int j = e[i];
                if (! -- d[j])
                    q[ ++ tt] = j, t[j] = tt;
            }
        }
        
        for (int i = 1; i <= k; ++ i )
            if (d[i])
                return true;
        
        for (int i = 1; i <= k; ++ i )
            if (t[i] == -1)
                t[i] = ++ tt ;
        return false;
    }
    
    vector<vector<int>> buildMatrix(int k, vector<vector<int>>& rowConditions, vector<vector<int>>& colConditions) {
        this->k = k;
        
        if (get(rowConditions, r) || get(colConditions, c))
            return {};
        
        vector<vector<int>> res(k, vector<int>(k));
        for (int i = 1; i <= k; ++ i )
            res[r[i] - 1][c[i] - 1] = i;
        return res;
    }
};
```
