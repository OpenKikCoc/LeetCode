## [比赛链接](https://leetcode.cn/contest/biweekly-contest-91/)

>   virtual rank: 52 / 3535


### [2465. 不同的平均值数目](https://leetcode.cn/problems/number-of-distinct-averages/)



```c++
class Solution {
public:
    int distinctAverages(vector<int>& nums) {
        multiset<int> S(nums.begin(), nums.end());
        set<double> s;
        while (S.size()) {
            if (S.size() == 1) {
                s.insert(*S.begin());
                S.erase(S.begin());
            } else {
                int l = *S.begin(), r = *S.rbegin();
                s.insert(double(l + r) / 2.0);
                S.erase(S.begin()), S.erase(S.find(r));
            }
        }
        return s.size();
    }
};
```


### [2466. 统计构造好字符串的方案数](https://leetcode.cn/problems/count-ways-to-build-good-strings/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10, MOD = 1e9 + 7;
    
    LL f[N];
    
    int countGoodStrings(int low, int high, int zero, int one) {
        memset(f, 0, sizeof f);
        f[0] = 1;
        for (int i = 1; i < N; ++ i ) {
            if (i - zero >= 0)
                f[i] = (f[i] + f[i - zero]) % MOD;
            if (i - one >= 0)
                f[i] = (f[i] + f[i - one]) % MOD;
        }
        LL res = 0;
        for (int i = low; i <= high; ++ i )
            res = (res + f[i]) % MOD;
        return res;
    }
};
```

### [2467. 树上最大得分和路径](https://leetcode.cn/problems/most-profitable-path-in-a-tree/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = N << 1, INF = 0x3f3f3f3f;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int pa[N];
    void dfs_1(int u, int p) {
        pa[u] = p;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == p)
                continue;
            dfs_1(j, u);
        }
    }
    
    int dis[N];
    
    // bob 路线固定 所以要看 alice 怎么走
    vector<int> at;
    int res;
    void dfs_2(int u, int p, int c, int d) {
        int score = 0;
        // 走过 没走过 同时走过
        if (dis[u] != INF && d > dis[u]) {
            score = 0;
        } else if (dis[u] == INF || d < dis[u]) {
            score = at[u];
        } else {
            score = at[u] / 2;
        }
        c += score;
        
        int childcnt = 0;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == p)
                continue;
            dfs_2(j, u, c, d + 1);
            childcnt ++ ;
        }
        if (childcnt == 0) {
            res = max(res, c);
        }
    }
    
    int mostProfitablePath(vector<vector<int>>& edges, int bob, vector<int>& amount) {
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        memset(pa, -1, sizeof pa);
        dfs_1(0, -1);
        
        memset(dis, 0x3f, sizeof dis);
        for (int i = bob, j = 0; ~i; i = pa[i], ++ j )
            dis[i] = j;
        
        this->at = amount;
        res = -INF;
        dfs_2(0, -1, 0, 0);
        return res;
    }
};
```

### [2468. 根据限制分割消息](https://leetcode.cn/problems/split-message-based-on-limit/)



```c++
class Solution {
public:
    const static int N = 1e4 + 10;
    
    int f[N], s[N];
    
    vector<string> splitMessage(string message, int limit) {
        memset(f, 0, sizeof f), memset(s, 0, sizeof s);
        for (int i = 1; i < N; ++ i ) {
            f[i] = to_string(i).size();
            s[i] = s[i - 1] + f[i];
        }
        
        // for (int i = 1; i < 10; ++ i )
        //     cout << s[i] << ' ';
        // cout << endl;
        
        int n = message.size();
        // 考虑枚举最后划分的段数，段数越少越好
        for (int i = 1; i <= n; ++ i ) {
            // < /sz>
            int base = 3 + f[i];
            int w = base * i + s[i] + n;
            string lastStr = to_string(i);
            
            if ((w + limit - 1) / limit == i) {
                // cout << " i = " << i << " w = " << w << " = " << base * i << " " << s[i] << " " << n << endl;
                // bool flag = true;
                vector<string> res;
                for (int j = 1, p = 0; j <= i; ++ j ) {
                    int need = limit - base - f[j];
                    string t;
                    while (p < n && need -- )
                        t.push_back(message[p ++ ]);
                    t += "<" + to_string(j) + "/" + lastStr + ">";
                    res.push_back(t);
                }
                return res;
            }
        }
        return {};
    }
};
```
