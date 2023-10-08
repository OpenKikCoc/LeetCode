## [比赛链接](https://leetcode.cn/contest/weekly-contest-362/)


### [2848. 与车相交的点](https://leetcode.cn/problems/points-that-intersect-with-cars/)



```c++
class Solution {
public:
    const static int N = 110;
    
    bool st[N];
    
    int numberOfPoints(vector<vector<int>>& nums) {
        memset(st, 0, sizeof st);
        for (auto & xs : nums)
            for (int i = xs[0]; i <= xs[1]; ++ i )
                st[i] = true;
        int res = 0;
        for (int i = 0; i < N; ++ i )
            if (st[i])
                res ++ ;
        return res;
    }
};
```


### [2849. 判断能否在给定时间到达单元格](https://leetcode.cn/problems/determine-if-a-cell-is-reachable-at-a-given-time/)



```c++
class Solution {
public:
    bool isReachableAtTime(int sx, int sy, int fx, int fy, int t) {
        int dx = abs(sx - fx), dy = abs(sy - fy);
        
        if (dx == 0 && dy == 0)
            return t != 1;
        
        // a 是斜着走的最小个数，b 是直着走的最小个数
        // 对于 a 可以凭空多出至少一个距离；对于 b 可以凭空多出至少一个距离
        // int a = min(dx, dy), b = max(dx, dy) - min(dx, dy);
        
        return t >= max(dx, dy);
    }
};
```

### [2850. 将石头分散到网格图的最少移动次数](https://leetcode.cn/problems/minimum-moves-to-spread-stones-over-grid/)

状压 重点在于状态定义

```c++
class Solution {
public:
    // 3*3 的图是固定的，就极大降低了复杂度，且保证有解
    const static int N = 10, M = 1 << N;
    
    int d[N][N];
    int f[M];
    
    int minimumMoves(vector<vector<int>>& grid) {
        // 考虑枚举: 每一个格子从另一个位置搬过来一个方块，方案是否合法，合法的话记录开销
        // 如何表示状态: 全排列 => no 因为可能是一对多
        // 
        // [ATTENTION] 分别记录缺少的位置 ls 与多出的位置 rs（重要：后者多出几个就作为几个位置）
        // 则 ls.size() == rs.size() 随后即是一个匹配问题 => 状压
        
        vector<int> ls, rs;
        memset(d, 0, sizeof d);
        for (int i = 0; i < 9; ++ i ) {
            int x1 = i / 3, y1 = i % 3;
            for (int j = 0; j < 9; ++ j ) {
                int x2 = j / 3, y2 = j % 3;
                d[i][j] = abs(x1 - x2) + abs(y1 - y2);
            }
            if (grid[x1][y1] == 0)
                ls.push_back(i);
            if (grid[x1][y1] > 1)
                for (int j = 0; j < grid[x1][y1] - 1; ++ j )    // ATTENTION
                    rs.push_back(i);
        }
        
        int n = ls.size();          // ls.size() == rs.size()
        memset(f, 0x3f, sizeof f);  // +inf
        f[0] = 0;
        for (int i = 1; i < 1 << n; ++ i ) {
            int tot = __builtin_popcount(i);
            int a = ls[tot - 1];
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1) {
                    int b = rs[j];
                    f[i] = min(f[i], f[i ^ (1 << j)] + d[a][b]);
                }
        }
        
        return f[(1 << n) - 1];
    }
};
```

### [2851. 字符串转换](https://leetcode.cn/problems/string-transformation/) [TAG]

矩阵快速幂应用 结合KMP

```c++
using LL = long long;
const static int MOD = 1e9 + 7;

// ------------------------------ Matrix Related ------------------------------
struct Matrix {
    int n, m;
    LL A[2][2];
    Matrix(int n, int m) : n(n), m(m) {
        memset(A, 0, sizeof A);
    }
};

Matrix operator*(Matrix & a, Matrix & b) {
    Matrix c(a.n, b.m);
    for (int i = 0; i < a.n; ++ i )
        for (int j = 0; j < b.m; ++ j )
            for (int k = 0; k < a.m; ++ k )
                c.A[i][j] = (c.A[i][j] + a.A[i][k] * b.A[k][j] % MOD) % MOD;
    return c;
}

Matrix power(Matrix & a, LL b) {
    Matrix y(a.n, a.m);
    for (int i = 0; i < y.n; ++ i )
        y.A[i][i] = 1;
    while (b) {
        if (b & 1)
            y = y * a;
        a = a * a;
        b >>= 1;
    }
    return y;
}

// ------------------------------ KMP Related ------------------------------
vector<int> get_next(string p, int m) {
    vector<int> nxt(m + 1);
    for (int i = 2, j = 0; i <= m; i ++ ) {
        while (j && p[i] != p[j + 1])
            j = nxt[j];
        if (p[i] == p[j + 1])
            j ++ ;
        nxt[i] = j;
    }
    return nxt;
}

int find_indexes(string text, string pattern) {
    int n = text.size(), m = pattern.size();
    string s = ' ' + text, p = ' ' + pattern;
    auto nxt = get_next(p, m);
    
    int count = 0;
    for (int i = 1, j = 0; i <= n; ++ i ) {
        auto c = text[i];
        while (j && s[i] != p[j + 1])
            j = nxt[j];
        if (s[i] == p[j + 1])
            j ++ ;
        if (j == m) {
            count ++ ;
            j = nxt[j];
        }
    }
    return count;
}

class Solution {
public:
    // 矩阵推导: https://leetcode.cn/problems/string-transformation/solutions/2435348/kmp-ju-zhen-kuai-su-mi-you-hua-dp-by-end-vypf/
    
    int numberOfWays(string s, string t, long long k) {
        int n = s.size();
        // [ATTENTION] text 需要去掉 s 的最后一个字符
        int c = find_indexes(s + s.substr(0, n - 1), t);
        Matrix m = Matrix(2, 2);
        m.A[0][0] = c - 1, m.A[0][1] = c;
        m.A[1][0] = n - c, m.A[1][1] = n - 1 - c;
        
        m = power(m, k);
        return m.A[0][s != t];
    }
};
```
