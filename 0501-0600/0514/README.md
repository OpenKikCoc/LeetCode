#  [514. 自由之路](https://leetcode.cn/problems/freedom-trail/)

## 题意



## 题解

```c++
class Solution {
public:
    int findRotateSteps(string ring, string key) {
        int n = ring.size(), m = key.size();
        ring = ' ' + ring, key = ' ' + key;
        vector<vector<int>> f(m + 1, vector<int>(n + 1, 1e8));
        f[0][1] = 0;
        for (int i = 1; i <= m; i ++ )
            for (int j = 1; j <= n; j ++ )
                if (key[i] == ring[j]) {
                    for (int k = 1; k <= n; k ++ ) {
                        int t = abs(k - j);
                        f[i][j] = min(f[i][j], f[i - 1][k] + min(t, n - t) + 1);
                    }
                }

        int res = 1e8;
        for (int i = 1; i <= n; i ++ ) res = min(res, f[m][i]);
        return res;
    }
};
```

```c++
class Solution {
public:
    const int inf = 0x3f3f3f3f;
    // 优化写法
    int findRotateSteps(string ring, string key) {
        int m = ring.size(), n = key.size();
        vector<vector<int>> es(26);
        for (int i = 0; i < m; ++ i ) es[ring[i] - 'a'].push_back(i);

        vector<vector<int>> f(n + 1, vector<int>(m, inf));
        f[0][0] = 0;
        for (int i = 1; i <= n; ++ i )
            for (auto & j : es[key[i - 1] - 'a'])
                if (i == 1)
                    f[i][j] = min(f[i][j], f[0][0]     + min(abs(j - 0), m - abs(j - 0)) + 1);
                else for(auto & k : es[key[i-2]-'a'])
                    f[i][j] = min(f[i][j], f[i - 1][k] + min(abs(j - k), m - abs(j - k)) + 1);
        int res = inf;
        for (auto i : es[key.back() - 'a']) res = min(res, f[n][i]);
        return res;
    }

    // 预处理 ring : 对于每一个位置 x ，由可由某几个位置转移过来
    // f[i][j] 匹配到第 i 个字符，处于位置 j 的最小代价
    // f[i][j] = if(字符相等 可以转换) min(f[i-1][v] + )
    int findRotateSteps2(string ring, string key) {
        int m = ring.size(), n = key.size();
        vector<vector<int>> dis(m, vector<int>(m, inf));
        vector<vector<vector<int>>> es(m, vector<vector<int>>(26));
        for (int i = 0; i < m; ++ i )
            for (int j = 0; j < m; ++ j )
                dis[i][j] = min(abs(j - i), m - abs(j - i)), es[i][ring[j] - 'a'].push_back(j);
        vector<vector<int>> f(n + 1, vector<int>(m, inf));
        f[0][0] = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 0; j < m; ++ j ) if (key[i - 1] == ring[j]) {
                int nc = key[i - 1] - 'a', lc = i > 1 ? key[i - 2] - 'a' : ring[0] - 'a';
                for (auto & k : es[j][lc]) f[i][j] = min(f[i][j], f[i - 1][k] + dis[j][k] + 1);
            }
        
        int res = inf;
        for (int i = 0; i < m; ++ i )
            if (ring[i] == key.back()) res = min(res, f[n][i]);
        return res;
    }
};
```



```python3

```

