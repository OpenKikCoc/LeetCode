## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-56/)


### [1925. 统计平方和三元组的数目](https://leetcode-cn.com/problems/count-square-sum-triples/)

暴力即可

```c++
class Solution {
public:
    int countTriples(int n) {
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= n; ++ j )
                for (int k = 1; k <= n; ++ k )
                    if (i * i + j * j == k * k)
                        res ++ ;
        return res;
    }
};
```


### [1926. 迷宫中离入口最近的出口](https://leetcode-cn.com/problems/nearest-exit-from-entrance-in-maze/)

多源bfs即可

加点的细节写错WA了几发。。。

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 110;
    const int INF = 0x3f3f3f3f;
    
    vector<vector<char>> g;
    vector<vector<int>> d;
    int n, m;
    PII q[N * N];
    
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    
    int nearestExit(vector<vector<char>>& maze, vector<int>& entrance) {
        this->g = maze;
        this->n = g.size(), m = g[0].size();
        d = vector<vector<int>>(n, vector<int>(m, INF));
        
        int sx = entrance[0], sy = entrance[1];
        
        int hh = 0, tt = -1;
        for (int i = 0; i < n; ++ i ) {
            if (!(i == sx && 0 == sy) && g[i][0] == '.')
                q[ ++ tt] = {i, 0}, d[i][0] = 0;
            if (!(i == sx && m - 1 == sy) && g[i][m - 1] == '.')
                q[ ++ tt] = {i, m - 1}, d[i][m - 1] = 0;
        }
        for (int i = 0; i < m; ++ i ) {
            if (!(0 == sx && i == sy) && g[0][i] == '.')
                q[ ++ tt] = {0, i}, d[0][i] = 0;
            if (!(n - 1 == sx && i == sy) && g[n - 1][i] == '.')
                q[ ++ tt] = {n - 1, i}, d[n - 1][i] = 0;
        }
        
        while (hh <= tt) {
            auto [x, y] = q[hh ++ ];
            
            if (g[x][y] == '+')
                continue;
            g[x][y] = '+';
            if (x == sx && y == sy)
                break;
            
            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx >= 0 && nx < n && ny >= 0 && ny < m && g[nx][ny] == '.') {
                    // ATTENTION if 一定要写 否则加太多点 数组越界
                    if (d[x][y] + 1 < d[nx][ny])
                        q[ ++ tt] = {nx, ny}, d[nx][ny] = d[x][y] + 1;
                }
            }
        }
        
        if (d[sx][sy] > INF / 2)
            return -1;
        return d[sx][sy];
    }
};
```

也可以单源最短路

```c++
#define x first
#define y second

typedef pair<int, int> PII;

class Solution {
public:
    int nearestExit(vector<vector<char>>& g, vector<int>& s) {
        int n = g.size(), m = g[0].size(), INF = 1e8;
        int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
        vector<vector<int>> dist(n, vector<int>(m, INF));
        queue<PII> q;
        q.push({s[0], s[1]});
        dist[s[0]][s[1]] = 0;
        while (q.size()) {
            auto t = q.front();
            q.pop();
            
            for (int i = 0; i < 4; i ++ ) {
                int x = t.x + dx[i], y = t.y + dy[i];
                if (x >= 0 && x < n && y >= 0 && y < m && g[x][y] == '.' && dist[x][y] > dist[t.x][t.y] + 1) {
                    dist[x][y] = dist[t.x][t.y] + 1;
                    if (x == 0 || x == n - 1 || y == 0 || y == m - 1) return dist[x][y];
                    q.push({x, y});
                }
            }
        }
        return -1;
    }
};
```

### [1927. 求和游戏](https://leetcode-cn.com/problems/sum-game/)

简单博弈 推导易知：

1. 对于前后都有的可填充位置一一模仿

2. 单个方向多余的位值分给两个人

3. 如果alice总有办法使得前后不等 返回true

4. 其余返回false


```c++
class Solution {
public:
    bool sumGame(string num) {
        int n = num.size();
        int c1 = 0, c2 = 0;
        int s1 = 0, s2 = 0;
        for (int i = 0; i < n / 2; ++ i )
            if (num[i] != '?')
                s1 += num[i] - '0';
            else
                c1 ++ ;
        for (int i = n / 2; i < n; ++ i )
            if (num[i] != '?')
                s2 += num[i] - '0';
            else
                c2 ++ ;
        int sd = abs(s1 - s2), cd = abs(c1 - c2);
        int t1 = (cd + 1) / 2, t2 = cd / 2;
        if (t1 * 9 > sd || t2 * 9 < sd)
            return true;
        return false;
    }
};
```

另一种思路（比较麻烦）：

分情况讨论

```c++
class Solution {
public:
    bool sumGame(string num) {
        int sum = 0, cnt = 0, n = num.size();
        for (int i = 0; i < n / 2; i ++ ) {
            if (num[i] == '?') cnt ++ ;
            else sum += num[i] - '0';
        }
        for (int i = n / 2; i < n; i ++ ) {
            if (num[i] == '?') cnt -- ;
            else sum -= num[i] - '0';
        }

        if (!sum) return cnt;
        if (sum < 0) sum *= -1, cnt *= -1;
        if (cnt >= 0) return true;
        cnt *= -1;
        if (cnt % 2) return true;
        if (cnt / 2 * 9 == sum) return false;
        return true;
    }
};
```

### [1928. 规定时间内到达终点的最小花费](https://leetcode-cn.com/problems/minimum-cost-to-reach-destination-in-time/) [TAG]

经典问题：

无向连通图（有无自环无所谓），二维最短路问题

===> 拆点，每个点在每个时间下的状态单独作为一个点

对于本题共计 1e6 个点，直接拆点跑最短路即可

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1010, M = N << 1;
    const int INF = 0x3f3f3f3f;
    
    vector<int> c;
    int n, mt;
    int h[N], e[M], w[M], ne[M], idx;
    bool st[N][N];
    int d[N][N];
    
    void init() {
        memset(h, -1, sizeof h);
        memset(st, 0, sizeof st);//
        memset(d, 0x3f, sizeof d);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int minCost(int maxTime, vector<vector<int>>& edges, vector<int>& passingFees) {
        init();
        
        this->c = passingFees;
        this->n = c.size();
        this->mt = maxTime;
        for (auto & eg : edges) {
            int a = eg[0], b = eg[1], c = eg[2];
            add(a, b, c), add(b, a, c);
        }
        
        d[0][0] = c[0];
        queue<PII> q;
        q.push({0, 0});
        
        while (q.size()) {
            auto [x, y] = q.front(); q.pop();
            st[x][y] = false;
            
            for (int i = h[x]; ~i; i = ne[i]) {
                int nx = e[i], ny = y + w[i];
                if (ny > mt)
                    continue;
                if (d[nx][ny] > d[x][y] + c[nx]) {
                    d[nx][ny] = d[x][y] + c[nx];
                    if (!st[nx][ny])
                        st[nx][ny] = true, q.push({nx, ny});
                }
            }
        }
        
        int res = INF;
        for (int i = 0; i <= mt; ++ i )
            res = min(res, d[n - 1][i]);
        return res == INF ? -1 : res;
    }
};
```
