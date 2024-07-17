#  [741. 摘樱桃](https://leetcode.cn/problems/cherry-pickup/)

## 题意



## 题解



```c++
class Solution {
public:
    const int INF = 2e9;
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        
        vector<vector<vector<int>>> f(n + m + 1, vector<vector<int>>(n + 1, vector<int>(m + 1, -INF)));
        
        f[1][0][0] = 0;

        for (int k = 2; k <= n + m; ++ k )
            for (int x1 = 1; x1 <= k ; ++ x1 )
                for (int x2 = 1; x2 <= k; ++ x2 ) {
                    int y1 = k - x1, y2 = k - x2;
                    if (x1 < 1 || x1 > n || y1 < 1 || y1 > m)
                        continue;
                    if (x2 < 1 || x2 > n || y2 < 1 || y2 > m)
                        continue;
                    
                    if (grid[x1 - 1][y1 - 1] == -1 || grid[x2 - 1][y2 - 1] == -1)
                        continue;
                    
                    auto & t = f[k][x1][x2];
                    t = max(t, f[k - 1][x1][x2]);
                    t = max(t, f[k - 1][x1 - 1][x2]);
                    t = max(t, f[k - 1][x1][x2 - 1]);
                    t = max(t, f[k - 1][x1 - 1][x2 - 1]);
                    int v = 0;
                    if (grid[x1 - 1][y1 - 1] == 1)
                        ++ v ;
                    if (grid[x2 - 1][y2 - 1] == 1)
                        ++ v ;
                    if (x1 == x2 && v)
                        -- v ;
                    t += v;
                }
        return max(f[n + m][n][m], 0);
    }
};
```

```c++
const int N = 55;
int f[N][N][N * 2];

class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size();
        memset(f, -0x3f, sizeof f);
        if (grid[0][0] != -1) f[1][1][2] = grid[0][0];
        for (int k = 3; k <= n * 2; k ++ )
            for (int i = max(1, k - n); i <= min(n, k - 1); i ++ )
                for (int j = max(1, k - n); j <= min(n, k - 1); j ++ ) {
                    if (grid[i - 1][k - i - 1] == -1 || grid[j - 1][k - j - 1] == -1) continue;
                    int t = grid[i - 1][k - i - 1];
                    if (i != j) t += grid[j - 1][k - j - 1];
                    for (int a = i - 1; a <= i; a ++ )
                        for (int b = j - 1; b <= j; b ++ )
                            f[i][j][k] = max(f[i][j][k], f[a][b][k - 1] + t);
                }
        return max(0, f[n][n][n * 2]);
    }
};
```



```python3

```

