## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-197/)

### [1512. 好数对的数目](https://leetcode-cn.com/problems/number-of-good-pairs/)

前后两个数字相等即为好数对 球数组有多少好数对 暴力即可

```c++
    int numIdenticalPairs(vector<int>& nums) {
        int n = nums.size(), res = 0;
        for(int i = 0; i < n; ++i) {
            for(int j = 0; j < i; ++j) if(nums[i] == nums[j]) ++res;
        }
        return res;
    }
```

### [1513. 仅含 1 的子串数](https://leetcode-cn.com/problems/number-of-substrings-with-only-1s/)

最长1串 每次计算该串子串个数求和即可 记得取模

```c++
    const int mod = 1e9+7;
    long long get(long long x) {
        return x*(x+1)/2;
    }
    int numSub(string s) {
        int n = s.size();
        long long res = 0;
        int cnt = 0;
        for(int i = 0; i < n; ++i) {
            if(s[i] == '0') {
                if(cnt == 0) continue;
                res += get(cnt)%mod;
                cnt = 0;
            } else ++cnt;
        }
        if(cnt) res += get(cnt)%mod;
        return res%mod;
    }
```

### [1514. 概率最大的路径](https://leetcode-cn.com/problems/path-with-maximum-probability/)

单源最短路 略

```c++
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start, int end) {
        vector<vector<pair<int, double>>> g(n);
        int m = edges.size();
        for (int i = 0; i < m; i ++) {
            g[edges[i][0]].push_back({edges[i][1], succProb[i]});
            g[edges[i][1]].push_back({edges[i][0], succProb[i]});
        }
        vector<double> d(n, 0);
        d[start] = 1.0;
        priority_queue<pair<double, int>> pq;
        pq.push({1.0, start});
        while (!pq.empty()) {
            auto u = pq.top();
            pq.pop();
            int v = u.second;
            double p = u.first;
            if (v == end) break;
            for (auto x : g[v]) {
                int y = x.first;
                double pp = x.second;
                if (pp * p > d[y]) {
                    d[y] = pp * p;
                    pq.push({d[y], y});
                }
            }
        }
        return d[end];
    }
```

### [1515. 服务中心的最佳位置](https://leetcode-cn.com/problems/best-position-for-a-service-centre/) [TAG]

三分求凸函数极值

```c++
    using ld = double;
    const ld pi = 3.1415926535897932384626;
    double getMinDistSum(vector<vector<int>>& p) {
        ld x = 0, y = 0;
        int n = p.size();
        for (int i = 0; i < n; ++i) {
            x += p[i][0];
            y += p[i][1];
        }
        x /= n;
        y /= n;
        
        auto go = [&](ld x, ld y) {
            ld ret = 0;
            for (int i = 0; i < n; ++i)
                ret += sqrt((x-p[i][0])*(x-p[i][0])+(y-p[i][1])*(y-p[i][1]));
            return ret;
        };
        
        ld T = 100;
        const ld eps = 1e-8;
        while (T > eps) {
            T *= 0.99;
            ld rd = (rand()%10000+1)/10000.0;
            ld a = 2*pi*rd;
            ld tx = x+T*cos(a), ty = y+T*sin(a);
            auto d = go(tx, ty)-go(x, y);
            if (d < 0) {
                x = tx, y = ty;
            }
        }
        
        return go(x, y);
    }
// liuzhou_101
```
