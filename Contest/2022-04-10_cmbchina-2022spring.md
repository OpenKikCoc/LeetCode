## [比赛链接](https://leetcode.cn/contest/cmbchina-2022spring/)

>   virtual rank: 76 / 1529


### [招商银行-01. 文本编辑程序设计](https://leetcode.cn/contest/cmbchina-2022spring/problems/fWcPGC/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    bool st[N];
    string deleteText(string article, int index) {
        int n = article.size();
        {
            for (int i = index; i >= 0; -- i )
                if (article[i] != ' ')
                    st[i] = true;
                else
                    break;
        }
        {
            for (int i = index; i < n; ++ i )
                if (article[i] != ' ')
                    st[i] = true;
                else
                    break;
        }
        for (int i = 0; i < n; ++ i )
            if (st[i])
                article[i] = ' ';
        
        stringstream ss(article);
        string s, res;
        while (ss >> s) {
            res += s + ' ';
        }
        if (res.size())
            res.pop_back();
        return res;
    }
};
```


### [招商银行-02. 公园规划](https://leetcode.cn/contest/cmbchina-2022spring/problems/ReWLAw/)

显然统计度数即可

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    int d[N];
    
    int numFlowers(vector<vector<int>>& roads) {
        int n = roads.size() + 1;
        for (auto & e : roads)
            d[e[0]] ++ , d[e[1]] ++ ;
        
        int res = 0;
        for (int i = 0; i < n; ++ i )
            res = max(res, d[i] + 1);
        return res;
    }
};
```

###[招商银行-03. 点燃木棒](https://leetcode.cn/contest/cmbchina-2022spring/problems/Dk2Ytp/) 

重点在于坐标转换，完成后直接 bfs 即可

```c++
class Solution {
public:
    const static int N = 2510, M = 10100, INF = 0x3f3f3f3f;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int maxv, left;
    bool mark[M], st[N];
    
    int dist[N], q[M << 2];
    int bfs(int s) {
        memset(st, 0, sizeof st);
        memset(dist, 0x3f, sizeof dist);
        
        int hh = 0, tt = -1;
        q[ ++ tt] = s, dist[s] = 0;
        
        int cnt = 0;
        while (hh <= tt) {
            int t = q[hh ++ ];
            
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                cnt ++ ;
                if (dist[j] > dist[t] + 1) {
                    dist[j] = dist[t] + 1;
                    q[ ++ tt] = j;
                }
            }
        }
        
        // cout << " cnt = " << cnt << " left = " << left << endl;
        if (cnt != left)
            return INF;
        
        int t = 0;
        for (int i = 0; i < maxv; ++ i )
            // 只有有火柴的才需要关注
            if (dist[i] != INF)
                t = max(t, dist[i]);
        // cout << " s = " << s << " t = " << t << endl;
        return t;
    }
    
    vector<int> lightSticks(int n, int m, vector<int>& indices) {
        init();
        this->maxv = (n + 1) * (m + 1), left = (n + 1) * m * 2 + n * (m + 1) * 2 - indices.size() * 2;
        
        for (auto & x : indices)
            mark[x] = true;
        for (int i = 0; i <= n; ++ i )
            for (int j = 0; j <= m; ++ j ) {
                {
                    int ni = i, nj = j + 1;
                    if (nj <= m) {
                        int id = (i * m + i * (m + 1)) + j;
                        if (!mark[id]) {
                            // cout << " i = " << i << " j = " << j << " dir = 1" << " id = " << id << endl;
                            int a = i * (m + 1) + j, b = ni * (m + 1) + nj;
                            // cout << " ... a = " << a << " b = " << b << endl;
                            add(a, b), add(b, a);
                        }
                    }
                }
                {
                    int ni = i + 1, nj = j;
                    if (ni <= n) {
                        int id = ((i + 1) * m + i * (m + 1)) + j;
                        if (!mark[id]) {
                            // cout << " i = " << i << " j = " << j << " dir = 2" << " id = " << id << endl;
                            int a = i * (m + 1) + j, b = ni * (m + 1) + nj;
                            // cout << " ... a = " << a << " b = " << b << endl;
                            add(a, b), add(b, a);
                        }
                    }
                }
            }
        
        // 最终形成一个可能有环的图
        vector<int> res;
        int dis = INF;
        for (int i = 0; i < maxv; ++ i ) {
            int t = bfs(i);
            if (t == INF)
                continue;
            // cout << " i = " << i << " t = " << t << endl;
            if (t < dis)
                dis = t, res = {i};
            else if (t == dis)
                res.push_back(i);
        }
        // cout << endl << endl;
        return res;
    }
};
```

### [招商银行-04. 商店促销活动](https://leetcode.cn/contest/cmbchina-2022spring/problems/OK3hsO/) [TAG]

比较细节的线性DP

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    const static LL INF = 1e18;

    LL f[N][4][3];

    template<class T>
    bool freshmin(T& a, const T& b) { return a > b ? a = b, 1 : 0;}

    int goShopping(vector<int>& a, vector<int>& b) {
        int n = a.size();
        
        // 映射坐标 因为显然要按b排序下
        vector<int> p(n);
        for (int i = 0; i < n; ++i)
            p[i] = i;
        sort(p.begin(), p.end(), [&](int i, int j) { return b[i] > b[j]; });
        
        LL res = INF;
        
        // 1. 钦定 a 取不了 3 个，最后统计 res 的时候不能到 3
        {
            // 扩大 避免精度损失
            for (int i = 0; i < n; ++i)
                a[i] = a[i] * 10, b[i] = b[i] * 10;

            for (int i = 0; i <= n; ++i)
                for (int s = 0; s <= 3; ++s)        // 0，1，2代表 a 前面买过0，1，2件，3是代表打折
                    for (int t = 0; t <= 2; ++t)    // 0，1，2代表 b 前面选多少个
                        f[i][s][t] = INF;
            f[0][0][0] = 0;
            for (int i = 0; i < n; ++i)
                for (int s = 0; s <= 3; ++s)
                    for (int t = 0; t <= 2; ++t) {
                        if (f[i][s][t] == INF)
                            continue;
                        // a 里买
                        freshmin(f[i + 1][min(s + 1, 3)][t], f[i][s][t] + a[p[i]]);
                        // b 里买
                        freshmin(f[i + 1][s][(t + 1) % 3], f[i][s][t] + (t == 2 ? 0 : b[p[i]]));
                    }
        }
        for (int s = 0; s < 3; ++s)
            for (int t = 0; t <= 2; ++t)
                freshmin(res, f[n][s][t]);

        // 2. 钦定 a 必须取 3 个，最后统计时必须为 3
        {
            // ATTENTION a 打七折
            for (int i = 0; i < n; ++i)
                a[i] = a[i] / 10 * 7, b[i] = b[i] / 10 * 10;
            for (int i = 0; i <= n; ++i)
                for (int s = 0; s <= 3; ++s)
                    for (int t = 0; t <= 2; ++t)
                        f[i][s][t] = INF;
            f[0][0][0] = 0;
            for (int i = 0; i < n; ++i)
                for (int s = 0; s <= 3; ++s)
                    for (int t = 0; t <= 2; ++t) {
                        if (f[i][s][t] == INF)
                            continue;
                        freshmin(f[i + 1][min(s + 1, 3)][t], f[i][s][t] + a[p[i]]);
                        freshmin(f[i + 1][s][(t + 1) % 3],
                                 f[i][s][t] + (t == 2 ? 0 : b[p[i]]));
                    }
        }
        for (int t = 0; t <= 2; ++t)
            freshmin(res, f[n][3][t]);

        return res /= 10;
    }
};
```
