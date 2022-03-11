## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-70/)

>   virtual rank: 76 / 3640


### [2144. 打折购买糖果的最小开销](https://leetcode-cn.com/problems/minimum-cost-of-buying-candies-with-discount/)

略

```c++
class Solution {
public:
    int minimumCost(vector<int>& cost) {
        sort(cost.begin(), cost.end());
        reverse(cost.begin(), cost.end());
        int n = cost.size(), res = 0;
        for (int i = 0; i < n; i += 3 ) {
            int a = cost[i], b = (i + 1 < n ? cost[i + 1] : 0);
            res += a + b;
        }
        return res;
    }
};
```


### [2145. 统计隐藏数组数目](https://leetcode-cn.com/problems/count-the-hidden-sequences/)

略 注意 `minv = maxv = 0`

```c++
class Solution {
public:
    using LL = long long;
    
    int numberOfArrays(vector<int>& dif, int lower, int upper) {
        int n = dif.size() + 1;
        LL x = 0, minv = 0, maxv = 0;
        for (auto v : dif) {
            x += v;
            minv = min(minv, x);
            maxv = max(maxv, x);
        }
        LL res = ((LL)upper - lower) - (maxv - minv) + 1;
        if (res > 0)
            return res;
        return 0;
    }
};
```

### [2146. 价格范围内最高排名的 K 样物品](https://leetcode-cn.com/problems/k-highest-ranked-items-within-a-price-range/)

bfs 略

```c++
class Solution {
public:
    using TIII = tuple<int, int, int>;
    
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    
    vector<vector<int>> highestRankedKItems(vector<vector<int>>& grid, vector<int>& pricing, vector<int>& start, int k) {
        int n = grid.size(), m = grid[0].size();
        vector<vector<bool>> st(n, vector<bool>(m));
        vector<TIII> ve;
        queue<TIII> q;
        if (grid[start[0]][start[1]] == 0)
            return {};
        q.push({start[0], start[1], 0});
        while (q.size()) {
            auto [x, y, d] = q.front(); q.pop();
            if (st[x][y])
                continue;
            st[x][y] = true;
            if (grid[x][y] >= pricing[0] && grid[x][y] <= pricing[1])
                ve.push_back({x, y, d});
            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= n || ny < 0 || ny >= m || !grid[nx][ny] || st[nx][ny])
                    continue;
                q.push({nx, ny, d + 1});
            }
        }
        
        sort(ve.begin(), ve.end(), [&](const TIII & a, const TIII & b) {
            auto [ax, ay, ad] = a;
            auto [bx, by, bd] = b;
            if (ad != bd)
                return ad < bd;
            if (grid[ax][ay] != grid[bx][by])
                return grid[ax][ay] < grid[bx][by];
            if (ax != bx)
                return ax < bx;
            return ay < by;
        });
        
        vector<vector<int>> res;
        for (int i = 0; i < k && i < ve.size(); ++ i ) {
            auto [x, y, d] = ve[i];
            vector<int> t = {x, y};
            res.push_back(t);
        }
        return res;
    }
};
```

### [2147. 分隔长廊的方案数](https://leetcode-cn.com/problems/number-of-ways-to-divide-a-long-corridor/)

简单乘法计数即可

```c++
class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;
    
    int numberOfWays(string a) {
        int n = a.size();
        LL res = 1;
        vector<int> ve;
        for (int i = 0; i < n; ++ i )
            if (a[i] == 'S')
                ve.push_back(i);
        int m = ve.size();
        if (m & 1 || m == 0)
            return 0;
            
        for (int i = 1; i + 1 < m; i += 2) {
            LL d = ve[i + 1] - ve[i];
            // cout << " a = " << ve[i] << " b = " << ve[i + 1] << " d = " << d << endl;
            res = res * d % MOD;
        }
        return res;
    }
};
```
