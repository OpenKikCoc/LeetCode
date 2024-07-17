## [比赛链接](https://leetcode.cn/contest/biweekly-contest-5/)


### [1133. 最大唯一数](https://leetcode.cn/problems/largest-unique-number/)

略

```c++
class Solution {
public:
    int largestUniqueNumber(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (auto v : nums)
            mp[v] ++ ;
        int res = -1;
        for (auto v : nums)
            if (mp[v] == 1)
                res = max(res, v);
        return res;
    }
};
```


### [1134. 阿姆斯特朗数](https://leetcode.cn/problems/armstrong-number/)

略

```c++
class Solution {
public:
    bool isArmstrong(int n) {
        int t = n;
        int s = 0, w = 0;
        {
            int tt = t;
            while (tt)
                tt /= 10, w ++ ;
        }
        while (t) {
            s += pow(t % 10, w);
            t /= 10;
        }
        return s == n;
    }
};
```

### [1135. 最低成本联通所有城市](https://leetcode.cn/problems/connecting-cities-with-minimum-cost/)

MST 模版题 略

```c++
class Solution {
public: 
    vector<int> fa;
    int find(int x) {
        if (fa[x] != x)
            fa[x] = find(fa[x]);
        return fa[x];
    }
    
    int minimumCost(int n, vector<vector<int>>& connections) {
        int m = connections.size();
        fa = vector<int>(n + 1);
        for (int i = 1; i <= n; ++ i )
            fa[i] = i;
        
        sort(connections.begin(), connections.end(), [](const vector<int> & a, vector<int> & b) {
            return a[2] < b[2];
        });
        
        int part = n, res = 0;
        for (int i = 0; i < m; ++ i ) {
            int a = connections[i][0], b = connections[i][1], c = connections[i][2];
            int pa = find(a), pb = find(b);
            if (pa != pb) {
                fa[pa] = pb;
                part -- ;
                res += c;
            }
        }
        
        return part == 1 ? res : -1;
    }
};
```

### [1136. 平行课程](https://leetcode.cn/problems/parallel-courses/)

拓扑排序板子题 略

```c++
class Solution {
public:
    const static int N = 5010;
    
    int h[N], e[N], ne[N], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    int d[N], q[N];
    int f[N];
    
    int topo() {
        int hh = 0, tt = -1;
        for (int i = 1; i <= n; ++ i )
            if (!d[i])
                q[ ++ tt] = i;
        while (hh <= tt) {
            int t = q[hh ++ ];
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                if ( -- d[j] == 0)
                    q[ ++ tt] = j;
            }
        }
        if (hh != n)
            return -1;
        
        int res = 0;
        for (int i = n - 1; i >= 0; -- i ) {
            int t = q[i];
            f[t] = 1;   // min
            for (int j = h[t]; ~j; j = ne[j]) {
                int k = e[j];
                f[t] = max(f[t], f[k] + 1);
            }
            res = max(res, f[t]);
        }
        return res;
    }
    
    int minimumSemesters(int n, vector<vector<int>>& relations) {
        init();
        memset(f, 0, sizeof f);
        this->n = n;
        for (auto & re : relations)
            add(re[0], re[1]), d[re[1]] ++ ;
        return topo();
    }
};
```

这类转移较简单的可以直接在 topo 中计算

如

```c++
class Solution {
public:
    int minimumSemesters(int N, vector<vector<int>>& relations) {
        vector<int> v[N + 1];
        vector<int> d(N + 1), f(N + 1, N + 1);
        for (auto e : relations) {
            v[e[0]].push_back(e[1]);
            d[e[1]] ++;
        }
        queue<int> Q;
        for (int i = 1; i <= N; ++ i)
            if (d[i] == 0) {
                Q.push(i);
                f[i] = 1;
            }
        while (!Q.empty()) {
            int x = Q.front();
            Q.pop();
            for (auto y : v[x])
                if (! -- d[y]) {
                    Q.push(y);
                    f[y] = f[x]+1;
                }
        }
        int ans = 0;
        for (int i = 1; i <= N; ++ i)
            ans = max(ans, f[i]);
        if (ans == N + 1) return -1;
        return ans;
    }
};
```

