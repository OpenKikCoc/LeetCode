## [比赛链接](https://leetcode.cn/contest/biweekly-contest-66/)

>   virtual rank: 178 / 2803


### [2085. 统计出现过一次的公共字符串](https://leetcode.cn/problems/count-common-words-with-one-occurrence/)



```c++
class Solution {
public:
    int countWords(vector<string>& words1, vector<string>& words2) {
        unordered_map<string, int> h1, h2;
        for (auto & s : words1)
            h1[s] ++ ;
        for (auto & s : words2)
            h2[s] ++ ;
        int res = 0;
        for (auto & [k, v] : h1)
            if (v == 1 && h2[k] == 1)
                res ++ ;
        return res;
    }
};
```

### [2086. 从房屋收集雨水需要的最少水桶数](https://leetcode.cn/problems/minimum-number-of-buckets-required-to-collect-rainwater-from-houses/)

自己贪心

```c++
class Solution {
public:
    int minimumBuckets(string street) {
        int n = street.size(), res = 0;
        vector<bool> st(n);
        for (int i = 1; i < n - 1; ++ i )
            if (street[i] == '.' && street[i - 1] == 'H' && street[i + 1] == 'H')
                street[i] = '*', st[i - 1] = st[i + 1] = true, res ++ ;
        for (int i = 2; i < n - 2; ++ i )
            if (street[i] == '*' && street[i - 2] == '*' && street[i + 2] == '*')
                street[i] = '.', res -- ;
        for (int i = 0; i < n; ++ i )
            if (street[i] == '.') {
                bool need = false;
                if (i - 1 >= 0 && street[i - 1] == 'H' && !st[i - 1])
                    need = true, st[i - 1] = true;
                if (i + 1 < n && street[i + 1] == 'H' && !st[i + 1])
                    need = true, st[i + 1] = true;
                if (need)
                    res ++ ;
            }
        for (int i = 0; i < n; ++ i )
            if (street[i] == 'H' && !st[i])
                return -1;
        return res;
    }
};
```

标准解是贪心在右侧选 且是判断 `H` 的位置

```c++
class Solution {
public:
    int minimumBuckets(string street) {
        int n = street.size(), res = 0;
        vector<bool> st(n);
        for (int i = 0; i < n; ++ i )
            // trick: 思维 先考虑 `H`
            if (street[i] == 'H') {
                if (i - 1 >= 0 && st[i - 1])
                    continue;
                // 优先放右边
                if (i + 1 < n && street[i + 1] == '.')
                    st[i + 1] = true, res ++ ;
                else if (i - 1 >= 0 && street[i - 1] == '.')
                    st[i - 1] = true, res ++ ;
                else
                    return -1;
            }
        
        return res;
    }
};
```

### [2087. 网格图中机器人回家的最小代价](https://leetcode.cn/problems/minimum-cost-homecoming-of-a-robot-in-a-grid/)

略

```c++
class Solution {
public:
    int minCost(vector<int>& startPos, vector<int>& homePos, vector<int>& rowCosts, vector<int>& colCosts) {
        int x = startPos[0], y = startPos[1], tx = homePos[0], ty = homePos[1];
        int n = rowCosts.size(), m = colCosts.size(), res = 0;
        for (int i = min(x, tx); i <= max(x, tx); ++ i )
            if (i != x)
                res += rowCosts[i];
        for (int i = min(y, ty); i <= max(y, ty); ++ i )
            if (i != y)
                res += colCosts[i];
        return res;
    }
};
```

### [2088. 统计农场中肥沃金字塔的数目](https://leetcode.cn/problems/count-fertile-pyramids-in-a-land/)

简单但经典

-   前缀和+模拟

```c++
class Solution {
public:
    int n, m;
    vector<vector<int>> g;
    
    int check(int x, int y) {
        if (!g[x][y])
            return 0;
        int ret = 0;
        {
            int w = 1, c = 0;
            int nx = x, ny = y;
            while (nx <= n && ny <= m && g[nx][ny] >= w)
                nx ++ , ny ++ , w += 2, c ++ ;
            ret += c - 1;
        }
        {
            int w = 1, c = 0;
            int nx = x, ny = y;
            while (nx >= 1 && ny <= m && g[nx][ny] >= w)
                nx -- , ny ++ , w += 2, c ++ ;
            ret += c - 1;
        }
        return ret;
    }
    
    int countPyramids(vector<vector<int>>& grid) {
        n = grid.size(), m = grid[0].size();
        g = vector<vector<int>>(n + 1, vector<int>(m + 1));
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                if (grid[i - 1][j - 1])
                    g[i][j] = g[i][j - 1] + 1;
        
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                res += check(i, j);
        return res;
    }
};
```

-   类似最大正方形

```c++
class Solution {
public:
    const static int N = 1010;

    int f[N][N];
    int n, m;
    vector<vector<int>> g;

    int work() {
        memset(f, -1, sizeof f);
        int ret = 0;
        for (int i = n - 1; i >= 0; -- i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j]) {
                    if (i == n - 1|| j == 0 || j == m - 1)
                        f[i][j] = 0;
                    else {
                        f[i][j] = min({f[i + 1][j - 1], f[i + 1][j], f[i + 1][j + 1]}) + 1;
                        ret += f[i][j];
                    }
                }
        return ret;
    }

    int countPyramids(vector<vector<int>>& grid) {
        this->g = grid;
        n = g.size(), m = g[0].size();

        int res = work();
        reverse(g.begin(), g.end());
        res += work();
        return res;
    }
};
```

