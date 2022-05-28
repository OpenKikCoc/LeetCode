## [比赛链接](https://leetcode.cn/contest/biweekly-contest-77/)

>   virtual rank: 76 / 4211


### [2255. 统计是给定字符串前缀的字符串数目](https://leetcode.cn/problems/count-prefixes-of-a-given-string/)

略

```c++
class Solution {
public:
    int countPrefixes(vector<string>& words, string s) {
        int res = 0;
        for (auto & w : words) {
            if (s.size() < w.size())
                continue;
            bool flag = true;
            for (int i = 0; i < w.size(); ++ i )
                if (s[i] != w[i]) {
                    flag = false;
                    break;
                }
            if (flag)
                res ++ ;
        }
        return res;
    }
};
```


### [2256. 最小平均差](https://leetcode.cn/problems/minimum-average-difference/)

略

```c++
class Solution {
public:
    using LL = long long;
    int minimumAverageDifference(vector<int>& nums) {
        int n = nums.size();
        vector<LL> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + (LL)nums[i - 1];
        LL p = -1, res = 1e18;
        for (int i = 1; i <= n; ++ i ) {
            int l = s[i] / i, r = n - i ? (s[n] - s[i]) / (n - i) : 0;
            if (p == -1 || abs(l - r) < res)
                p = i - 1, res = abs(l - r);
        }
        return p;
    }
};
```

### [2257. 统计网格图中没有被保卫的格子数](https://leetcode.cn/problems/count-unguarded-cells-in-the-grid/)

显然记录坐标，二分即可

```c++
class Solution {
public:
    // m * n <= 1e5
    using PII = pair<int, int>;
    
    vector<vector<bool>> st;
    
    int countUnguarded(int m, int n, vector<vector<int>>& guards, vector<vector<int>>& walls) {
        this->st = vector<vector<bool>>(m, vector<bool>(n));
        vector<vector<PII>> r(m), c(n);
        for (int i = 0; i < m; ++ i )
            r[i].push_back({-1, 0}), r[i].push_back({n, 0});
        for (int i = 0; i < n; ++ i )
            c[i].push_back({-1, 0}), c[i].push_back({m, 0});
        for (auto & g : guards) {
            int x = g[0], y = g[1];
            st[x][y] = true;
            r[x].push_back({y, 1});
            c[y].push_back({x, 1});
        }
        for (auto & w : walls) {
            int x= w[0], y = w[1];
            st[x][y] = true;
            r[x].push_back({y, -1});
            c[y].push_back({x, -1});
        }
        for (int i = 0; i < m; ++ i )
            sort(r[i].begin(), r[i].end());
        for (int i = 0; i < n; ++ i )
            sort(c[i].begin(), c[i].end());
        
        int res = 0;
        for (int i = 0; i < m; ++ i )
            for (int j = 0; j < n; ++ j ) {
                if (st[i][j])
                    continue;
                // cout << " I = " << i << " j = " << j << endl;
                
                {
                    auto it = lower_bound(r[i].begin(), r[i].end(), PII{j, 0});
                    if ((*it).second == 1) {
                        continue;
                    }
                    it -- ;
                    if ((*it).second == 1) {
                        continue;
                    }
                }
                {
                    auto it = lower_bound(c[j].begin(), c[j].end(), PII{i, 0});
                    if ((*it).second == 1) {
                        continue;
                    }
                    it -- ;
                    if ((*it).second == 1) {
                        continue;
                    }
                }
                res ++ ;
            }
        return res;
    }
};
```

实际上，我们可以直接用 bit 位表示某个位置的 `上下左右` 是否有守卫，进而把时间复杂度优化到 $O(nm)$

```c++
class Solution {
public:
    // m * n <= 1e5
    using PII = pair<int, int>;
    
    vector<vector<int>> st;
    
    // 入参把 n m swap 了
    int countUnguarded(int n, int m, vector<vector<int>>& guards, vector<vector<int>>& walls) {
        st = vector<vector<int>>(n, vector<int>(m));
        for (auto & g : guards)
            st[g[0]][g[1]] = 15;
        for (auto & w : walls)
            st[w[0]][w[1]] = 16;    // 只要后四bit位全0即可
        
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (st[i][j] < 16) {
                    if (i)
                        st[i][j] |= st[i - 1][j] & 1;
                    if (j)
                        st[i][j] |= st[i][j - 1] & 2;
                }
        for (int i = n - 1; i >= 0; -- i )
            for (int j = m - 1; j >= 0; -- j )
                if (st[i][j] < 16) {
                    if (i < n - 1)
                        st[i][j] |= st[i + 1][j] & 4;
                    if (j < m - 1)
                        st[i][j] |= st[i][j + 1] & 8;
                }
        
        int res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                res += !st[i][j];
        return res;
    }
};
```



### [2258. 逃离火灾](https://leetcode.cn/problems/escape-the-spreading-fire/)

较显然的：二分答案

注意预处理距离，然后再判断。而非在判断内执行多源BFS

```c++
class Solution {
public:
    using PII = pair<int, int>;
    using LL = long long;
    const static int N = 2e4 + 10, INF = 1e9;
    
    int n, m;
    vector<vector<int>> g;
    vector<vector<LL>> d, t;
    
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    PII q[N];
    
    LL mid;
    vector<vector<bool>> st;
    
    bool dfs(int x, int y) {
        st[x][y] = true;
        if (x == n - 1 && y == m - 1)
            return t[x][y] + mid <= d[x][y];
        if (t[x][y] + mid >= d[x][y])
            return false;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                continue;
            if (g[nx][ny] != 0 || st[nx][ny])
                continue;
            if (dfs(nx, ny))
                return true;
        }
        return false;
    }
    
    // 能否可以到达目标点
    // ==> 有一条 t + mid <= d 的路径
    bool check() {
        st = vector<vector<bool>>(n, vector<bool>(m));
        return dfs(0, 0);
        // return true;
    }
    
    int maximumMinutes(vector<vector<int>>& grid) {
        this->g = grid, this->n = g.size(), this->m = g[0].size();
        
        {
            this->d = vector<vector<LL>>(n, vector<LL>(m, (LL)2e9));
            int hh = 0, tt = -1;
            for (int i = 0; i < n; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (grid[i][j] == 1)
                        q[ ++ tt] = {i, j}, d[i][j] = 0;
            
            while (hh <= tt) {
                auto [x, y] = q[hh ++ ];
                for (int i = 0; i < 4; ++ i ) {
                    int nx = x + dx[i], ny = y + dy[i];
                    if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                        continue;
                    if (g[nx][ny] != 0)
                        continue;
                    if (d[nx][ny] > d[x][y] + 1) {
                        d[nx][ny] = d[x][y] + 1;
                        q[ ++ tt] = {nx, ny};
                    }
                }
            }
        }
        {
            this->t = vector<vector<LL>>(n, vector<LL>(m, (LL)2e9));
            int hh = 0, tt = -1;
            q[ ++ tt] = {0, 0}, t[0][0] = 0;
            while (hh <= tt) {
                auto [x, y] = q[hh ++ ];
                for (int i = 0; i < 4; ++ i ) {
                    int nx = x + dx[i], ny = y + dy[i];
                    if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                        continue;
                    if (g[nx][ny] != 0)
                        continue;
                    if (t[nx][ny] > t[x][y] + 1) {
                        t[nx][ny] = t[x][y] + 1;
                        q[ ++ tt] = {nx, ny};
                    }
                }
            }
        }
        
        
        LL l = 0, r = INF + 1;
        while (l < r) {
            mid = l + (r - l) / 2;
            if (check())
                l = mid + 1;
            else
                r = mid;
        }
        return l - 1;
    }
};
```
