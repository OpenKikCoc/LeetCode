## [比赛链接](https://leetcode.cn/contest/season/2022-spring/ranking/team/)


### [LCP 55. 采集果实](https://leetcode.cn/problems/PTXy4P/)

模拟即可

```c++
class Solution {
public:
    int getMinimumTime(vector<int>& time, vector<vector<int>>& fruits, int limit) {
        int n = fruits.size(), m = time.size();
        int res = 0;
        for (auto & f : fruits) {
            int type = f[0], num = f[1], t = time[type];
            res += (num + limit - 1) / limit * t;
        }
        return res;
    }
};
```


### [LCP 56. 信物传送](https://leetcode.cn/problems/6UEx57/)

01-bfs 即可

```c++
class Solution {
public:
    // 10000 * 4;
    using PII = pair<int, int>;
    const static int N = 1e4 + 10, M = N << 2;
    
    int h[N], e[M], w[M], ne[M], idx = 0;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n, m;
    int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
    int vis[N];
    
    int conveyorBelt(vector<string>& g, vector<int>& start, vector<int>& end) {
        init();
        this->n = g.size(), m = g[0].size();
        unordered_map<char, int> hash;
        hash['^'] = 0, hash['v'] = 2, hash['<'] = 3, hash['>'] = 1;
        
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                int a = i * m + j;
                char c = g[i][j];
                for (int k = 0; k < 4; ++ k ) {
                    int ni = i + dx[k], nj = j + dy[k], b = ni * m + nj;
                    if (ni < 0 || ni >= n || nj < 0 || nj >= m)
                        continue;
                    // cout << " from " << "["<< a / m << "," << a % m << "] to " <<  "["<< b / m << "," << b % m << "] = " << (hash[c] != k) << endl;
                    add(a, b, hash[c] != k);
                }
            }
        
        int st = start[0] * m + start[1], ed = end[0] * m + end[1];
        deque<PII> q;
        memset(vis, 0, sizeof vis);
        q.push_back({st, 0});
        
        while (!q.empty()) {
            auto [u, d] = q.front(); q.pop_front();
            if (vis[u])
                continue;
            vis[u] = true;
            if (u == ed)
                return d;
            for (int i = h[u]; ~i; i = ne[i]) {
                int j = e[i], c = w[i];
                if (c == 0)
                    q.push_front({j, d});
                else
                    q.push_back({j, d + 1});
            }
        }
        return -1;
    }
};
```

### [LCP 57. 打地鼠](https://leetcode.cn/problems/ZbAuEH/)

递推dp 注意初始化即可

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = 9, W = 3;
    
    int f[N][M];
    bool st[M];
    
    bool check(int a, int b, int d) {
        return abs(a / W - b / W) + abs(a % W - b % W) <= d;
    }
    
    int getMaximumNumber(vector<vector<int>>& moles) {
        sort(moles.begin(), moles.end());
        memset(f, 0xcf, sizeof f);
        
        vector<int> ts;
        {
            ts.push_back(0);
            for (auto & m : moles)
                ts.push_back(m[0]);
            sort(ts.begin(), ts.end());
            ts.erase(unique(ts.begin(), ts.end()), ts.end());
        }
        
        int res = 0, n = ts.size(), m = moles.size(), p = 0;
        {
            // 特殊处理
            memset(st, 0, sizeof st);
            while (p < m && moles[p][0] == ts[0])
                st[moles[p][1] * W + moles[p][2]] = true, p ++ ;
            f[0][4] = st[4];
            res = max(res, f[0][4]);
        }
            
        for (int i = 1; i < n; ++ i ) {
            memset(st, 0, sizeof st);
            while (p < m && moles[p][0] == ts[i])
                st[moles[p][1] * W + moles[p][2]] = true, p ++ ;
            for (int j = 0; j < M; ++ j ) {
                // stay unchanged
                f[i][j] = max(f[i][j], f[i - 1][j] + st[j]);
                int x = j / W, y = j % W;
                
                // move
                for (int k = 0; k < M; ++ k )
                    if (check(j, k, ts[i] - ts[i - 1]))
                        f[i][j] = max(f[i][j], f[i - 1][k] + st[j]);
                res = max(res, f[i][j]);
            }
        }
        
        return res;
    }
};
```

### [LCP 58. 积木拼接](https://leetcode.cn/problems/De4qBB/) [TAG]

正解

```c++
class Solution {
public:
    // 底部和顶部   侧面
    // 1 * 5 * 8 * (4 * 3 * 2 * 8 * 8 * 8) = 40 * 24 * 512 = 500000 50w
    const static int N = 11;
    void mirror(vector<string> & state) {
        for (int i = 0; i < m; ++ i )
            for (int j = 0, k = m - 1; j < k; ++ j , -- k )
                swap(state[i][j], state[i][k]);
    }
    void rotate(vector<string> & state) {
        for (int i = 0; i < m; ++ i )
            for (int j = 0; j < i; ++ j )
                swap(state[i][j], state[j][i]);
        mirror(state);
    }

    vector<vector<string>> g;
    int n, m;
    bool st[6];
    bool has[N][N][N];
    vector<string> hash[N][N];
    vector<string> generateShape(int i, int change) {
        auto shape = g[i];
        // flip
        if (change / 4)
            mirror(shape);
        for (int i = 0; i < change % 4; ++ i )
            rotate(shape);
        return hash[i][change] = shape;
    }
    bool candraw(int u, vector<string> & shape) {
        if (u == 0) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[i][j][0])
                        return false;
        } else if (u == 1) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[i][0][j])
                        return false;
        } else if (u == 2) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[0][i][j])
                        return false;
        } else if (u == 3) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[i][m - 1][j])
                        return false;
        } else if (u == 4) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[m - 1][i][j])
                        return false;
        } else if (u == 5) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[i][j][m - 1])
                        return false;
        }
        return true;
    }
    void draw(int u, vector<string> & shape, bool flag) {
        if (u == 0) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                        has[i][j][0] = flag;
        } else if (u == 1) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                         has[i][0][j] = flag;
        } else if (u == 2) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                        has[0][i][j] = flag;
        } else if (u == 3) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                        has[i][m - 1][j] = flag;
        } else if (u == 4) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                        has[m - 1][i][j] = flag;
        } else if (u == 5) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                        has[i][j][m - 1] = flag;
        }
    }

    // [d, l, b, r, f, u]
    bool dfs(int u) {
        if (u == 6)
            return true;
        for (int i = 0; i < n; ++ i )
            if (!st[i]) {
                st[i] = true;
                for (int j = 0; j < 8; ++ j ) {
                    auto & shape = hash[i][j];
                    if (candraw(u, shape)) {
                        draw(u, shape, true);
                        if (dfs(u + 1))
                            return true;
                        draw(u, shape, false);
                    }
                }
                st[i] = false;
            }
        return false;
    }
    
    bool composeCube(vector<vector<string>>& shapes) {
        this->g = shapes;
        n = g.size();
        m = g[0].size();
        
        // precheck
        {
            int tot = 0;
            for (auto & shape : g)
                for (auto s : shape)
                    for (auto c : s)
                        if (c == '1')
                            tot ++ ;
            if (tot != m * m * m - (m - 2) * (m - 2) * (m - 2))
                return false;
        }
        
        memset(has, 0, sizeof has);
        memset(st, 0, sizeof st);

        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < 8; ++ j )
                hash[i][j] = generateShape(i, j);

        return dfs(0);
    }
};
```

比赛的时候一个细节出错的地方：

**问题在于：把 shape 作为全局变量来执行 draw 操作。在回溯时 shape 已经被下一层递归修改，【而非本层构造的内容】。所以恢复现场必然又问题。**

```c++
// WA 29 代码
class Solution {
public:
    // 底部和顶部   侧面
    // 1 * 5 * 8 * (4 * 3 * 2 * 8 * 8 * 8) = 40 * 24 * 512 = 500000 50w
    const static int N = 11;
    
    vector<vector<string>> g;
    bool has[N][N][N];
    
    int n, m;
    bool st[6];
    
    void mirror(vector<string> & state) {
        for (int i = 0; i < m; ++ i )
            for (int j = 0, k = m - 1; j < k; ++ j , -- k )
                swap(state[i][j], state[i][k]);
    }
    void rotate(vector<string> & state) {
        for (int i = 0; i < m; ++ i )
            for (int j = 0; j < i; ++ j )
                swap(state[i][j], state[j][i]);
        mirror(state);
    }
    
    bool xs[N][N];
    vector<string> shape;
    void fixshape(int i, int change) {
        this->shape = g[i];
        // flip
        if (change / 4)
            mirror(shape);
        for (int i = 0; i < change % 4; ++ i )
            rotate(shape);
    }
    
    bool candraw(int u) {
        if (u == 0) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[i][j][0])
                        return false;
        } else if (u == 1) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[i][0][j])
                        return false;
        } else if (u == 2) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[0][i][j])
                        return false;
        } else if (u == 3) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[i][m - 1][j])
                        return false;
        } else if (u == 4) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[m - 1][i][j])
                        return false;
        } else if (u == 5) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1' && has[i][j][m - 1])
                        return false;
        }
        return true;
    }
    void draw(int u, bool flag) {
        if (u == 0) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                        has[i][j][0] = flag;
        } else if (u == 1) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                         has[i][0][j] = flag;
        } else if (u == 2) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                        has[0][i][j] = flag;
        } else if (u == 3) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                        has[i][m - 1][j] = flag;
        } else if (u == 4) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                        has[m - 1][i][j] = flag;
        } else if (u == 5) {
            for (int i = 0; i < m; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (shape[i][j] == '1')
                        has[i][j][m - 1] = flag;
        }
    }
    
    // [d, l, b, r, f, u]
    bool dfs(int u) {
        if (u == 6)
            return true;
        for (int i = 0; i < n; ++ i )
            if (!st[i]) {
                st[i] = true;
                for (int j = 0; j < 8; ++ j ) {
                    fixshape(i, j);
                    if (candraw(u)) {
                        draw(u, true);
                        if (dfs(u + 1))
                            return true;
                        draw(u, false); // WA: 此时的 shape 已经不是本层递归中构造的，故恢复现场必错
                    }
                }
                st[i] = false;
            }
        return false;
    }
    
    void printShape() {
        for (auto s : shape)
            cout << s << endl;
        cout << endl;
    }
    
    bool composeCube(vector<vector<string>>& shapes) {
        this->g = shapes;
        m = g[0].size();
        
        // precheck
        {
            int tot = 0;
            for (auto & shape : g)
                for (auto & s : shape)
                    for (auto c : s)
                        if (c == '1')
                            tot ++ ;
            if (tot != m * m * m - (m - 2) * (m - 2) * (m - 2))
                return false;
        }
        n = g.size();
        
        memset(st, 0, sizeof st);
        return dfs(0);
    }
};
```

### [LCP 59. 搭桥过河](https://leetcode.cn/problems/NfY1m5/)



```c++

```

### [LCP 60. 力扣泡泡龙](https://leetcode.cn/problems/WInSav/)



```c++

```

