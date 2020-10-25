## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-212)

rating 147 / 4226

### [5546. 按键持续时间最长的键](https://leetcode-cn.com/problems/slowest-key/)

遍历即可

```c++
    char slowestKey(vector<int>& r, string k) {
        int v = 0, idx = -1, n = r.size(), l = 0;
        for(int i = 0; i < n; ++i) {
            if(r[i] - l >= v) v = r[i]-l, idx = i;
            l = r[i];
        }
        return k[idx];
    }
```


### [5547. 等差子数组](https://leetcode-cn.com/problems/arithmetic-subarrays/)

模拟即可

```c++
    bool check(vector<int> & t) {
        int n = t.size();
        if(n <= 2) return true;
        int d = t[1] - t[0];
        for(int i = 2; i < n; ++i)
            if(t[i] - t[i-1] != d) return false;
        return true;
    }
    vector<bool> checkArithmeticSubarrays(vector<int>& nums, vector<int>& l, vector<int>& r) {
        vector<bool> res;
        int n = nums.size(), m = l.size();
        for(int i = 0; i < m; ++i) {
            int ll =l[i], rr = r[i];
            vector<int> t;
            for(int i = ll; i <= rr; ++i) t.push_back(nums[i]);
            sort(t.begin(), t.end());
            if(check(t)) res.push_back(true);
            else res.push_back(false);
        }
        return res;
    }
```

### [5548. 最小体力消耗路径](https://leetcode-cn.com/problems/path-with-minimum-effort/)

路径中单边最大值最小

此题范围二分即可过

还可以:

1. 并查集 将所有边按照长度进行排序并依次添加进并查集，直到左上角和右下角连通为止
2. 最短路 使用任一单源最短路径的算法，只需要在维护当前路径长度时，将其修改为题目中的定义即可

```c++
    const int inf = 0x3f3f3f3f;
    int n, m;
    vector<vector<int>> g;
    vector<vector<bool>> vis;
    bool f;
    vector<int> dx = {-1, 0, 0, 1}, dy = {0, -1, 1, 0};
    void dfs(int x, int y, int d) {
        vis[x][y] = true;
        if(x == n-1 && y == m-1) f = true;
        if(f) return;
        for(int i = 0; i < 4; ++i) {
            int nx = x + dx[i], ny = y + dy[i];
            if(nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            //if(abs(g[nx][ny] - g[x][y]) > d) {cout << "g[nx][ny] = " << g[nx][ny] << " g[x][y]="<<g[x][y] << " d=" << d << endl;}
            if(vis[nx][ny] || abs(g[nx][ny] - g[x][y]) > d) continue;
            dfs(nx, ny, d);
        }
    }
    bool check(int d) {
        f = false;
        vis = vector<vector<bool>>(n, vector<bool>(m));
        dfs(0, 0, d);
        //if(f) cout << "yes" << endl;
        //else cout << "no" << endl;
        return f;
    }
    int minimumEffortPath(vector<vector<int>>& heights) {
        g = heights;
        n = g.size(), m = g[0].size();
        int l = 0, r = 1e6;
        while(l < r) {
            int mid = l + (r-l) / 2;
            //cout << "l=" << l << " r="<< r << " mid=" << mid << endl;
            if(check(mid)) r = mid;
            else l = mid+1;
        }
        return l;
    }
```

### [5156. 矩阵转换后的秩](https://leetcode-cn.com/problems/rank-transform-of-a-matrix/) [TAG]

思路：并查集+拓扑排序

```c++
// 记录 liuzhou_101 聚聚的写法
template<class T>
inline bool freshmin(T& a, const T& b) {
    if (a > b) {
        a = b;
        return true;
    } else return false;
}

template<class T>
inline bool freshmax(T& a, const T& b) {
    if (a < b) {
        a = b;
        return true;
    } else return false;
}

struct directed_graph {
    int n;
    vector<vector<int>> v;
    
    directed_graph (int n = 0) {
        init(n);
    }
    void init(int n) {
        assert(n >= 0);
        this->n = n;
        v = vector<vector<int>>(n+1);
    }
    void addedge(int x, int y) {
        assert(1 <= x && x <= n);
        assert(1 <= y && y <= n);
        v[x].push_back(y);
    }
    void erase_multiedges() {
        for (int i = 1; i <= n; ++ i) {
            sort(v[i].begin(), v[i].end());
            v[i].erase(unique(v[i].begin(), v[i].end()), v[i].end());
        }
    }
    
    vector<int> in_degree() {
        vector<int> ret(n+1);
        for (int x = 1; x <= n; ++ x)
            for (auto y : v[x])
                ret[y] ++;
        return ret;
    }
    vector<int> topsort(int bound) {
        vector<int> deg = in_degree();
        vector<int> dp = vector<int>(n + 1);
        
        vector<int> ret;
        queue<int> q;
        for (int i = 1; i <= n; ++ i)
            if (!deg[i]) q.push(i);
        while (!q.empty()) {
            int x = q.front();
            q.pop();
            ret.push_back(x);
            for (auto y : v[x]) {
                dp[y] = max(dp[y], dp[x] + (x <= bound));
                if (!-- deg[y]) q.push(y);
            }
        }
        return dp;
    }
    
    int times;
    vector<int> dfn, low, in;
    vector<int> st;
    int scc;
    vector<int> belong;
    void tarjan(int x) {
        dfn[x] = low[x] = ++ times;
        st.push_back(x);
        in[x] = 1;
        for (auto y : v[x]) {
            if (!dfn[y]) {
                tarjan(y);
                freshmin(low[x], low[y]);
            }
            else if (in[y])
                freshmin(low[x], dfn[y]);
        }
        if (dfn[x] == low[x]) {
            scc ++;
            while (1) {
                int y = st.back();
                st.pop_back();
                in[y] = 0;
                belong[y] = scc;
                if (x == y) break;
            }
        }
    }
    directed_graph strong_connected_component() {
        times = 0;
        dfn = vector<int>(n+1);
        low = vector<int>(n+1);
        in = vector<int>(n+1);
        st = vector<int>();
        scc = 0;
        belong = vector<int>(n+1);
        for (int i = 1; i <= n; ++ i)
            if (!dfn[i]) tarjan(i);
        directed_graph ret(scc);
        for (int x = 1; x <= n; ++ x)
            for (auto y : v[x]) if (belong[x] != belong[y])
                ret.addedge(belong[x], belong[y]);
        // ret.erase_multiedges();
        return ret;
    }
};

template<class T>
auto arr(int n = 0) {
    return vector<T>(n);
}

template<class T, class... Args>
auto arr(int n, Args... args) {
    return vector<decltype(arr<T>(args...))>(n, arr<T>(args...));
}

class Solution {
public:
    vector<vector<int>> matrixRankTransform(vector<vector<int>>& a) {
        int n = a.size(), m = a[0].size();
        
        int N = n*m;
        auto place = [&](int x, int y) {
            return x * m + y + 1;
        };
        
        vector<int> f(N + 1);
        for (int i = 0; i <= N; ++i) f[i] = i;
        function<int(int)> father = [&](int x) {
            return f[x] == x ? x : f[x] = father(f[x]);
        };
        
        for (int i = 0; i < n; ++i) {
            vector<int> p(m);
            for (int j = 0; j < m; ++j) p[j] = j;
            sort(p.begin(), p.end(), [&](int x, int y) {
                    return a[i][x] < a[i][y];
                });
            for (int k = 1; k < m; ++k)
                if (a[i][p[k - 1]] == a[i][p[k]])
                    f[father(place(i, p[k - 1]))] = father(place(i, p[k]));
        }
        for (int j = 0; j < m; ++j) {
            vector<int> p(n);
            for (int i = 0; i < n; ++i) p[i] = i;
            sort(p.begin(), p.end(), [&](int x, int y) {
                    return a[x][j] < a[y][j];
                });
            for (int k = 1; k < n; ++k)
                if (a[p[k - 1]][j] == a[p[k]][j])
                    f[father(place(p[k - 1], j))] = father(place(p[k], j));
        }
        
        directed_graph G(N + 1);
        
        for (int i = 0; i < n; ++i) {
            vector<int> p(m);
            for (int j = 0; j < m; ++j) p[j] = j;
            sort(p.begin(), p.end(), [&](int x, int y) {
                    return a[i][x] < a[i][y];
                });
            for (int k = 1; k < m; ++k)
                if (a[i][p[k - 1]] < a[i][p[k]])
                    G.addedge(father(place(i, p[k - 1])), father(place(i, p[k])));
        }
        
        for (int j = 0; j < m; ++j) {
            vector<int> p(n);
            for (int i = 0; i < n; ++i) p[i] = i;
            sort(p.begin(), p.end(), [&](int x, int y) {
                    return a[x][j] < a[y][j];
                });
            for (int k = 0; k < n; ++k)
                if (k - 1 >= 0 && a[p[k - 1]][j] < a[p[k]][j])
                    G.addedge(father(place(p[k - 1], j)), father(place(p[k], j)));
        }
        
        auto dp = G.topsort(N);
        auto res = arr<int>(n, m);
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < m; ++j)
                res[i][j] = dp[father(place(i, j))] + 1;
        return res;
    }
};
```

比赛想到了拓扑排序【二维点转化一维，每行、每列排序建边】，节点数太多感觉要爆

需要想得到结合并查集减少节点数
