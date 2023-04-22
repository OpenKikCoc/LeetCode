## [比赛链接](https://leetcode.cn/contest/season/2023-spring/)


### [1. 补给马车](https://leetcode.cn/contest/season/2023-spring/problems/hqCnmP/)



```c++
class Solution {
public:
    vector<int> supplyWagon(vector<int>& supplies) {
        int tar = supplies.size() / 2;
        
        while (supplies.size() > tar) {
            int p = -1, minv = 1e9, n = supplies.size();
            for (int i = 1; i < n; ++ i )
                if (p == -1 || supplies[i] + supplies[i - 1] < minv)
                    p = i, minv = supplies[i] + supplies[i - 1];
            
            vector<int> t;
            for (int i = 0; i < n; ++ i )
                if (i == p - 1)
                    t.push_back(minv), i ++ ;
                else
                    t.push_back(supplies[i]);
            supplies = t;
        }
        return supplies;
    }
};
```


### [2. 探险营地](https://leetcode.cn/contest/season/2023-spring/problems/0Zeoeg/)

模拟即可

```c++
class Solution {
public:
    int adventureCamp(vector<string>& expeditions) {
        unordered_set<string> S;
        int p = -1, mx = 0;
        for (int k = 0; k < expeditions.size(); ++ k ) {
            auto & s = expeditions[k];
            
            int n = s.size(), c = 0;
            string t;
            for (int i = 0; i < n; ++ i ) {
                if (s[i] == '-') {
                    if (!S.count(t))
                        S.insert(t), c ++ ;
                    t.clear();
                    i ++ ;
                } else {
                    t.push_back(s[i]);
                }
            }
            if (t.size() && !S.count(t))
                S.insert(t), c ++ ;
            
            // cout << " k = " << k << " new c = " << c << endl;
            if (k == 0 || c == 0)
                continue;
            
            if (p == -1 || c > mx)
                p = k, mx = c;
        }
        
        return p;
    }
};
```

### [3. 最强祝福力场](https://leetcode.cn/contest/season/2023-spring/problems/xepqZ5/)

标准做法显然是扫描线

数据范围比较小（矩形数量很少）显然可以离散化之后直接二维前缀和求解

```c++
class Solution {
public:
    // 矩形数量不超过 100 => 都可以暴力做了
    // 考虑：如果 side 长度为奇数怎么半？直接全部 * 2
    using LL = long long;
    const static int N = 1010;
    
    int find(vector<LL> & s, LL x) {
        return lower_bound(s.begin(), s.end(), x) - s.begin() + 1;
    }
    
    int g[N][N];
    
    int fieldOfGreatestBlessing(vector<vector<int>>& forceField) {
        vector<LL> xs, ys;
        for (auto & f : forceField) {
            LL x = 2ll * f[0], y = 2ll * f[1], w = 2ll * f[2];
            xs.push_back(x - w / 2), xs.push_back(x + w / 2);
            ys.push_back(y - w / 2), ys.push_back(y + w / 2);
        }
        sort(xs.begin(), xs.end()); xs.erase(unique(xs.begin(), xs.end()), xs.end());
        sort(ys.begin(), ys.end()); ys.erase(unique(ys.begin(), ys.end()), ys.end());
        
        memset(g, 0, sizeof g);
        for (auto & f : forceField) {
            LL x = 2ll * f[0], y = 2ll * f[1], w = 2ll * f[2];
            LL u = find(xs, x - w / 2), d = find(xs, x + w / 2);
            LL l = find(ys, y - w / 2), r = find(ys, y + w / 2);
            g[u][l] ++ , g[u][r + 1] -- , g[d + 1][l] -- , g[d + 1][r + 1] ++ ;
        }
        
        int n = xs.size(), m = ys.size();
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                g[i][j] += g[i][j - 1] + g[i - 1][j] - g[i - 1][j - 1];
        
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                res = max(res, g[i][j]);
        return res;
    }
};
```

### [4. 传送卷轴](https://leetcode.cn/contest/season/2023-spring/problems/rdmXM7/)

比较显然的思路是：

-   先以终点为起点求 “翻转后的某个位置要走的距离 dt”

-   随后求出对应的 “原位置下翻转后要走的距离 d”
-   在不超过 x 的上限下求能否从 S 走到 T （显然有两种思路 二分 / 并查集）

超时很多次，一开始是以为后面的二分判断超时，其实是【把第一步的 dfs 改为 bfs 即可】

注意各处的判断细节

```c++
using PII = pair<int, int>;
const static int N = 210, M = N * N, INF = 0x3f3f3f3f;
vector<string> g;
int n, m;
int tx, ty, sx, sy;

int dt[N][N];
int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
void bfs(int x, int y) {
    queue<PII> q;
    q.push({x, y}), dt[x][y] = 0;
    while (q.size()) {
        auto [x, y] = q.front(); q.pop();
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                continue;
            if (g[nx][ny] == '#' || dt[nx][ny] <= dt[x][y] + 1)
                continue;
            dt[nx][ny] = dt[x][y] + 1; q.push({nx, ny});
        }
    }
}
int d[N][N];

int pa[M];
void init() {
    int cap = M;
    for (int i = 0; i < M; ++ i )
        pa[i] = i;
}
int find(int x) {
    if (pa[x] != x)
        pa[x] = find(pa[x]);
    return pa[x];
}
void merge(int a, int b) {
    int fa = find(a), fb = find(b);
    pa[fa] = fb;
}

class Solution {
public:
    int challengeOfTheKeeper(vector<string>& maze) {
        g = maze;
        n = g.size(), m = g[0].size();
        memset(dt, 0x3f, sizeof dt);
        memset(d, 0x3f, sizeof d);  // 枚举被翻转的位置，求被翻转后的最短距离
        
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                if (g[i][j] == 'T')
                    tx = i, ty = j;
                if (g[i][j] == 'S')
                    sx = i, sy = j;
            }
        
        bfs(tx, ty);    // TLE 的貌似一直是这里，而不是后面的校验部分
        
        // dt 记录 “如果经过传送 且传送到 [i,j]，则后续需要再走的距离”
        // >INF/2 的部分都是永远无法到达目的地 或者 为 #
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j] == '.') {               // 传送前的位置 ATTENTION 空地才能施放，起点不能
                    int t = 0;
                    // 水平翻转
                    {
                        int x = n - 1 - i, y = j;
                        if (g[x][y] != '#')         // 传送后的位置 必须不是墙【可以是原来的起点】
                            t = max(t, dt[x][y]);
                    }
                    {
                        int x = i, y = m - 1 - j;
                        if (g[x][y] != '#')         // 传送后的位置 必须不是墙【可以是原来的起点】
                            t = max(t, dt[x][y]);
                    }
                    d[i][j] = t;                    // ATTENTION 要用 t 取两个传送位置的 max，否则会 wa
                }
        d[tx][ty] = 0;    // ATTENTION
        
        // 随后从 S 出发，要走一条 "max 最小" 的路径，看这个 max 是多少
        // 二分 TLE: r 边界最多 400+400
        
        // 考虑并查集
        static bool st[N][N];
        memset(st, 0, sizeof st);
        init();
        priority_queue<PII, vector<PII>, greater<PII>> q;
        q.push({0, sx * m + sy}); st[sx][sy] = true;
        for (int t = 0; t <= 1e5; ++ t ) {
            // cout << " t = " << t << " " << q.size() << endl;
            while (q.size()) {
                auto [v, id] = q.top();
                if (v > t)
                    break;
                q.pop();
                merge(sx * m + sy, id);
                int x = id / m, y = id % m;
                for (int i = 0; i < 4; ++ i ) {
                    int nx = x + dx[i], ny = y + dy[i];
                    if (nx < 0 || ny >= n || ny < 0 || ny >= m)
                        continue;
                    if (d[nx][ny] >= INF / 2 || g[nx][ny] == '#' || st[nx][ny])
                        continue;
                    q.push({d[nx][ny], nx * m + ny}); st[nx][ny] = true;
                }
            }
            
            if (find(sx * m + sy) == find(tx * m + ty))
                return t;
            if (q.empty()) {
                // cout << n << ' ' << m << " bingo" << endl;
                return -1;
            }
        }
        
        return -1;
    }
};
```

###[5. 魔法棋盘](https://leetcode.cn/contest/season/2023-spring/problems/1ybDKD/) [TAG]



```c++
```

