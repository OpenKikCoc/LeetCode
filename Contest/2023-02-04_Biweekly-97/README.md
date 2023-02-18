## [比赛链接](https://leetcode.cn/contest/biweekly-contest-97/)


### [2553. 分割数组中数字的数位](https://leetcode.cn/problems/separate-the-digits-in-an-array/)



```c++
class Solution {
public:
    vector<int> separateDigits(vector<int>& nums) {
        vector<int> res;
        for (auto x : nums) {
            string s = to_string(x);
            for (auto c : s)
                res.push_back(c - '0');
        }
        return res;
    }
};
```


### [2554. 从一个范围内选择最多整数 I](https://leetcode.cn/problems/maximum-number-of-integers-to-choose-from-a-range-i/)



```c++
class Solution {
public:
    int maxCount(vector<int>& banned, int n, int maxSum) {
        unordered_set<int> S;
        for (auto x : banned)
            S.insert(x);
        
        int t = maxSum, res = 0;
        for (int i = 1; i <= n; ++ i ) {
            if (S.count(i))
                continue;
            if (t >= i) {
                t -= i, res ++ ;
            } else {
                break;
            }
        }
        return res;
    }
};
```

### [2555. 两个线段获得的最多奖品](https://leetcode.cn/problems/maximize-win-from-two-segments/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int l[N], r[N];
    
    int maximizeWin(vector<int>& prizePositions, int k) {
        int n = prizePositions.size();
        for (int i = 1, j = 1; j <= n; ++ j ) {
            while (i < j && prizePositions[i - 1] < prizePositions[j - 1] - k)
                i ++ ;
            l[j] = j - i + 1;
        }
        for (int i = 1; i <= n; ++ i )
            l[i] = max(l[i - 1], l[i]);
            
        for (int i = n, j = n; j > 0; -- j ) {
            while (i > j && prizePositions[i - 1] > prizePositions[j - 1] + k)
                i -- ;
            r[j] = i - j + 1;
        }
        for (int i = n; i >= 1; -- i )
            r[i] = max(r[i + 1], r[i]);
        
        int res = 0;
        for (int i = 0; i <= n; ++ i )
            res = max(res, l[i] + r[i + 1]);
        return res;
    }
};
```

### [2556. 二进制矩阵中翻转最多一次使路径不连通](https://leetcode.cn/problems/disconnect-path-in-a-binary-matrix-by-at-most-one-flip/) [TAG]

有向图的必经点

```c++
class Solution {
public:
    // 思考与转化：
    //      如果建立有向图，显然求【必经点】
    //      又因本题特殊，有 DAG 性质，可以直接
    //      => https://www.cnblogs.com/PPXppx/p/11590709.html
    using LL = long long;
    
    bool isPossibleToCutPath(vector<vector<int>>& grid) {
        const int MOD = rand() % 1000000 + 1e9 + 7; // ATTENTION 添加随机种子
        int n = grid.size(), m = grid[0].size();
        
        LL f[n + 2][m + 2], g[n + 2][m + 2];
        memset(f, 0, sizeof f), memset(g, 0, sizeof g);
        
        // 计算方案数
        f[1][1] = g[n][m] = 1;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                if (i == 1 && j == 1)
                    continue;
                if (grid[i - 1][j - 1] == 1)
                    f[i][j] = (f[i - 1][j] + f[i][j - 1]) % MOD;
            }
        for (int i = n; i > 0; -- i )
            for (int j = m; j > 0; -- j ) {
                if (i == n && j == m)
                    continue;
                if (grid[i - 1][j - 1] == 1)
                    g[i][j] = (g[i + 1][j] + g[i][j + 1]) % MOD;
            }
        
        if (f[n][m] == 0)
            return true;
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                if (i == 1 && j == 1)
                    continue;
                if (i == n && j == m)
                    continue;
                LL t = f[i][j] * g[i][j] % MOD;
                if (t == f[n][m])
                    return true;
            }
        
        return false;
    }
};
```
