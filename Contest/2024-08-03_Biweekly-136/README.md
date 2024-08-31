## [比赛链接](https://leetcode.cn/contest/biweekly-contest-136/)


### [3238. 求出胜利玩家的数目](https://leetcode.cn/problems/find-the-number-of-winning-players/)



```c++
class Solution {
public:
    int winningPlayerCount(int n, vector<vector<int>>& pick) {
        sort(pick.begin(), pick.end());
        
        int res = 0, m = pick.size();
        for (int i = 0; i < m; ++ i ) {
            int t = pick[i][0], j = i;
            
            static int cnt[11];
            memset(cnt, 0, sizeof cnt);
            while (j < m && pick[j][0] == t)
                cnt[pick[j][1]] ++ , j ++ ;
            
            bool f = false;
            for (int k = 0; k < 11; ++ k )
                if (cnt[k] > t) {
                    f = true;
                    break;
                }
            if (f)
                res ++ ;
            
            i = j - 1;
        }
        return res;
    }
};
```


### [3239. 最少翻转次数使二进制矩阵回文 I](https://leetcode.cn/problems/minimum-number-of-flips-to-make-binary-grid-palindromic-i/)



```c++
class Solution {
public:
    // 每一个cell会对另外两个cells产生影响, 如果是要求 row & col:
    // [i, j] -> [m-i-1, j], [i,n-j-1] 同时 [m-i-1,n-j-1] 也需要和这三个数保持一致
    // => 遍历所有 i,j 找到对应的 maxcount 即知道填什么
    //
    // 但是题意要求的是 row | col, palindromic
    // 枚举两类情况
    
    int minFlips(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int res = m * n;
        {
            // row
            int cnt = 0;
            for (int i = 0; i < m; ++ i )
                for (int j = 0, k = n - 1; j < k; ++ j , -- k )
                    cnt += grid[i][j] != grid[i][k];
            res = min(res, cnt);
        }
        {
            // col
            int cnt = 0;
            for (int j = 0; j < n; ++ j )
                for (int i = 0, k = m - 1; i < k; ++ i , -- k )
                    cnt += grid[i][j] != grid[k][j];
            res = min(res, cnt);
        }
        return res;
    }
};
```

### [3240. 最少翻转次数使二进制矩阵回文 II ](https://leetcode.cn/problems/minimum-number-of-flips-to-make-binary-grid-palindromic-ii/) [TAG]

分情况讨论 注意条件判断和实现细节

```c++
class Solution {
public:
    // 本题要求 row&col palindromic => 四个位置完全相同
    // 以及: 1 的总数可以被 4 整除
    int minFlips(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        
        int res = 0;
        // ATTENTION 遍历的细节实现 (直接枚举 i,j 容易出问题 需要理清楚)
        // 下面直接枚举 i,j
        for (int i = 0; i < m / 2; ++ i )
            for (int j = 0; j < n / 2; ++ j ) {
                int c1 = grid[i][j] + grid[i][n - 1 - j] + grid[m - 1 - i][j] + grid[m - 1 - i][n - 1 - j];
                res += min(c1, 4 - c1);
            }
        // 对于中间点 必须为0
        if ((m & 1) && (n & 1))
            res += grid[m / 2][n / 2] == 1;
        
        // 考虑中间行/列 【分情况讨论】
        // 1. one*2 是 4 的倍数，则可以把 diff 全变成 0             => cost = diff
        // 2. one*2 不是 4 的倍数，由于其必定为偶数 必定差2个
        //    -> 如果 diff>0 则可以将任意一对 01 变成 11，开销同样是  => cost = diff
        //    -> 如果 diff=0 则需要将11变为00 或00变为11
        //                  (后者00可能不存在 不妨11变00)          => cost = diff + 2 = 2
        int one = 0, diff = 0;
        if (m & 1) {
            for (int j = 0, k = n - 1; j < k; ++ j , -- k )
                if (grid[m / 2][j] == grid[m / 2][k])
                    one += grid[m / 2][j] == 1;
                else
                    diff ++ ;
        }
        if (n & 1) {
            for (int i = 0, k = m - 1; i < k; ++ i , -- k )
                if (grid[i][n / 2] == grid[k][n / 2])
                    one += grid[i][n / 2] == 1;
                else
                    diff ++ ;
        }
        return res + (diff ? diff : (one & 1) * 2);
    }
};
```

### [3241. 标记所有节点需要的时间](https://leetcode.cn/problems/time-taken-to-mark-all-nodes/)

标准换根 注意 dfs_u 初始化操作

```c++
class Solution {
public:
    // 题目要求以每一个node为root的开销 显然是换根dp
    // 当发生换根时 边权可能发生变化(受指向的终点影响)
    // 求解属性为 分支max
    
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int f[N], g[N];
    int d1[N], d2[N], p[N];
    
    void dfs_d(int u, int pa) {
        f[u] = 0;
        d1[u] = d2[u] = 0, p[u] = -1;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i], cost = j & 1 ? 1 : 2;
            if (j == pa)
                continue;
            dfs_d(j, u);
            int dep = f[j] + cost;
            
            if (dep > d1[u]) {
                d2[u] = d1[u], d1[u] = dep;
                p[u] = j;
            } else if (dep > d2[u])
                d2[u] = dep;
        }
        f[u] = d1[u];   // f 其实可以省略
    }
    void dfs_u(int u, int pa) {
        // ATTENTION 这里不能初始化 g 因为本质是在外层初始化的
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i], cost = u & 1 ? 1 : 2; // 逆向 cost
            if (j == pa)
                continue;
            
            if (p[u] == j)
                g[j] = max(g[u], d2[u]) + cost;
            else
                g[j] = max(g[u], d1[u]) + cost;
            
            dfs_u(j, u);
        }
    }
    
    vector<int> timeTaken(vector<vector<int>>& edges) {
        init();
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            add(a, b), add(b, a);
        }
        
        dfs_d(0, -1);
        
        g[0] = 0;
        dfs_u(0, -1);
        
        vector<int> res;
        for (int i = 0; i < edges.size() + 1; ++ i )
            res.push_back(max(f[i], g[i]));
        return res;
    }
};
```
