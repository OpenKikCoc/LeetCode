## [比赛链接](https://leetcode.cn/contest/biweekly-contest-135/)


### [3222. 求出硬币游戏的赢家](https://leetcode.cn/problems/find-the-winning-player-in-coin-game/)



```c++
class Solution {
public:
    string losingPlayer(int x, int y) {
        int f = 0;  // 0: bob last round
        
        while (x >= 1 && y >= 4)
            x -- , y -= 4, f ^= 1;
        
        if (f)
            return "Alice";
        return "Bob";
    }
};
```


### [3223. 操作后字符串的最短长度](https://leetcode.cn/problems/minimum-length-of-string-after-operations/)



```c++
class Solution {
public:
    const static int N = 26;
    
    int idxs[N];
    
    int minimumLength(string s) {
        memset(idxs, 0, sizeof idxs);
        int n = s.size();
        for (auto c : s)
            idxs[c - 'a'] ++ ;
        
        int res = n;
        for (int i = 0; i < N; ++ i )
            res -= (idxs[i] - 1) / 2 * 2;
        return res;
    }
};
```

### [3224. 使差值相等的最少数组改动次数](https://leetcode.cn/problems/minimum-array-changes-to-make-differences-equal/)

推导 标准差分应用

```c++
class Solution {
public:
    // 重要条件... nums[i] <= k 所以必定有可行解
    // 
    // 考虑: 如果枚举最终差值 反过来遍历原数组计算 复杂度无法承受
    //  => 考虑对于每一对数字 使其差值为 x 的开销... => 区间累加 差分数组
    
    const static int N = 1e5 + 10;
    
    int d[N];
    
    int minChanges(vector<int>& nums, int k) {
        memset(d, 0, sizeof d);
        
        int n = nums.size();
        for (int i = 0, j = n - i - 1; i < j; ++ i , -- j ) {
            int a = nums[i], b = nums[j];
            if (a > b)
                swap(a, b);
            int diff = b - a;
            // 1. 差值为 diff 的代价为 0
            // 2. [...a...b...]
            //  - 差值为 [0, max(k-b, b, a, k-a)] (排除diff) 的代价为1
            //  - 其他为 2
            
            int mx = max({k - b, b, a, k - a});
            d[0] ++ , d[diff] -- ;
            d[diff + 1] ++ , d[mx + 1] -- ;
            d[mx + 1] += 2, d[k + 1] -= 2;
        }
        
        int tot = n;
        int res = tot;
        for (int i = 0; i <= k; ++ i ) {
            if (i)
                d[i] += d[i - 1];
            res = min(res, d[i]);   // ATTENTION 直接用 d[i]
        }
        
        return res;
    }
};
```

### [3225. 网格图操作后的最大分数 ](https://leetcode.cn/problems/maximum-score-from-grid-operations/) [TAG]

题意分析 + 分情况讨论

重复做

```c++
class Solution {
public:
    // 根据题意分析 "且左边或者右边的格子至少一个格子为黑色" 指的是紧密相邻 abs(j1-j2) == 1
    //
    // 考虑 f[i][j] 为前i列 第i列涂j个的最大得分
    // => 【题意分析 & 复杂分情况讨论】
    // 1. 对于一段连续染色区间 最优解下 染色长度必然是 先上升后下降 1,x,..MAX..,x,1
    //      => 要么涂得更多，获得更高的分数
    //         要么干脆不涂，保证不丢两边挣来的分数
    //      因此，整个图案只有突起没有凹陷
    //      => 【增加一维表示当前相对之前列是 0-up/1-down】
    // 2. 必然有一列是全涂满的 (每个上升下降区间的最高段一定到顶)
    // 3. 不会出现连续三列空列 因为这种情况下中间的一列没有任何收益 与全涂黑是等效的
    //      => 对于 f[i] 只需要考虑上一次 f[i-1, i-2, i-3] 涂了即可
    // 
    
    using LL = long long;
    const static int N = 110;
    const static LL INF = 1e18;
    
    LL s[N][N];
    LL get(int j, int u, int d) {
        if (u <= d)
            return s[d][j] - s[u][j];
        return 0;
    }
    
    LL f[N][N][2];  // 0增长/1下降
    // 在增长的过程中，新带来的收益是前一列的区间和
    // 而下降的过程中，新带来的收益是后一列的区间和
    
    long long maximumScore(vector<vector<int>>& grid) {
        int n = grid.size();    // 正方形
        
        // 预处理 前缀和
        memset(s, 0, sizeof s);
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= n; ++ j )
                s[i][j] = s[i - 1][j] + grid[i - 1][j - 1];
        
        memset(f, 0xcf, sizeof f);
        for (int j = 0; j < N; ++ j )
            f[1][j][0] = 0;
        
        for (int i = 2; i <= n; ++ i ) {
            // 可以优化 略
            // static LL t[N][2];
            // memcpy(t, f, sizeof f);
            // memset(f, 0xcf, sizeof f);
            
            for (int x = 0; x <= n; ++ x )
                for (int y = 0; y <= n; ++ y )          // 本个
                    for (int p = 0; p < 2; ++ p )
                        for (int q = 0; q < 2; ++ q ) { // 本个
                            LL w = f[i - 1][x][p];
                            if (!p)
                                w += get(i - 1, x, y);
                            if (q)
                                w += get(i, y, x);
                            f[i][y][q] = max(f[i][y][q], w);
                        }
        }
        
        LL res = 0;
        for (int j = 0; j <= n; ++ j )
            for (int p = 0; p < 2; ++ p )
                res = max(res, f[n][j][p]);
        return res;
    }
};
```
