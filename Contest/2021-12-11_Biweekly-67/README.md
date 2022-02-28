## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-67/)

> virtual rank: 85 / 2923


### [2099. 找到和最大的长度为 K 的子序列](https://leetcode-cn.com/problems/find-subsequence-of-length-k-with-the-largest-sum/)

排序即可 略

```c++
class Solution {
public:
    using PII = pair<int, int>;
    vector<int> maxSubsequence(vector<int>& nums, int k) {
        int n = nums.size();
        vector<PII> ve;
        for (int i = 0; i < n; ++ i )
            ve.push_back({nums[i], i});
        sort(ve.begin(), ve.end());
        reverse(ve.begin(), ve.end());
        
        vector<int> t;
        for (int i = 0; i < k; ++ i )
            t.push_back(ve[i].second);
        sort(t.begin(), t.end());
        
        vector<int> res;
        for (int i = 0; i < k; ++ i )
            res.push_back(nums[t[i]]);
        return res;
    }
};
```


### [2100. 适合打劫银行的日子](https://leetcode-cn.com/problems/find-good-days-to-rob-the-bank/)

前后缀分解 略

```c++
class Solution {
public:
    vector<int> goodDaysToRobBank(vector<int>& security, int time) {
        int n = security.size();
        vector<int> l(n + 2), r(n + 2);
        l[1] = r[n] = 1;
        for (int i = 2; i <= n; ++ i )
            l[i] = (security[i - 2] >= security[i - 1] ? l[i - 1] : 0) + 1;
        for (int i = n - 1; i >= 1; -- i )
            r[i] = (security[i] >= security[i - 1] ? r[i + 1] : 0) + 1;
        
        vector<int> res;
        for (int i = 1; i <= n; ++ i )
            if (l[i] >= time + 1 && r[i] >= time + 1)
                res.push_back(i - 1);
        return res;
    }
};
```

### [2101. 引爆最多的炸弹](https://leetcode-cn.com/problems/detonate-the-maximum-bombs/)

显然建有向图即可

M 设置小了 WA 一发

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 110, M = 10010;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    bool st[N];
    int dfs(int u) {
        st[u] = true;
        int c = 1;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (!st[j])
                c += dfs(j);
        }
        return c;
    }
    
    int maximumDetonation(vector<vector<int>>& bombs) {
        init();
        n = bombs.size();
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < n; ++ j )
                if (i != j) {
                    LL a = abs(bombs[i][0] - bombs[j][0]), b = abs(bombs[i][1] - bombs[j][1]), c = bombs[i][2];
                    if (a * a + b * b <= c * c)
                        add(i, j);
                }
        
        int res = 0;
        for (int i = 0; i < N; ++ i ) {
            memset(st, 0, sizeof st);
            res = max(res, dfs(i));
        }
        return res;
    }
};
```

### [2102. 序列顺序查询](https://leetcode-cn.com/problems/sequentially-ordinal-rank-tracker/)

显然可以 set + bit 维护

**注意分数从高到低找第 p 个，所以 add 时 N - score 即可**

```c++
class SORTracker {
public:
    const static int N = 1e5 + 10;

    int tr[N];
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int c) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += c;
    }
    int sum(int x) {
        int res = 0;
        for (int i = x; i; i -= lowbit(i))
            res += tr[i];
        return res;
    }
    
    set<string> ss[N];
    int p;
    SORTracker() {
        for (int i = 0; i < N; ++ i )
            ss[i].clear();
        p = 0;
        memset(tr, 0, sizeof tr);
    }
    
    void add(string name, int score) {
        ss[N - score].insert(name);
        add(N - score, 1);
    }
    
    string get() {
        p ++ ;
        int l = 1, r = N;
        while (l < r) {
            int m = l + r >> 1;
            if (sum(m) < p)
                l = m + 1;
            else
                r = m;
        }
        int left = p - sum(l - 1);
        
        for (auto & s : ss[l]) {
            if ( -- left == 0)
                return s;
        }
            
        return "";
    }
};

/**
 * Your SORTracker object will be instantiated and called as such:
 * SORTracker* obj = new SORTracker();
 * obj->add(name,score);
 * string param_2 = obj->get();
 */
```

或者一个迭代器维护即可

```c++
class SORTracker {
public:
    using PIS = pair<int, string>;
    
    set<PIS> S;
    set<PIS>::iterator it;
    
    SORTracker() {
        S.insert({0, ""});  // 哨兵
        it = S.begin();
    }
    
    void add(string name, int score) {
        auto t = PIS{-score, name};
        S.insert(t);
        // 一次只会加入一个 性质
        if (t < *it)
            it -- ;
    }
    
    string get() {
        return it ++ ->second;
    }
};

/**
 * Your SORTracker object will be instantiated and called as such:
 * SORTracker* obj = new SORTracker();
 * obj->add(name,score);
 * string param_2 = obj->get();
 */
```

