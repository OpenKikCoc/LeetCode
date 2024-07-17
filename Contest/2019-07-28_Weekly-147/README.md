## [比赛链接](https://leetcode.cn/contest/weekly-contest-147/)


### [1137. 第 N 个泰波那契数](https://leetcode.cn/problems/n-th-tribonacci-number/)

模拟即可 略

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 40;
    
    LL f[N];
    
    void init() {
        f[0] = 0, f[1] = f[2] = 1;
        for (int i = 3; i < N; ++ i )
            f[i] = f[i - 3] + f[i - 2] + f[i - 1];
    }
    
    int tribonacci(int n) {
        init();
        return f[n];
    }
};
```


### [1138. 字母板上的路径](https://leetcode.cn/problems/alphabet-board-path/)

注意不能越界访问即可 略

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 6;
    
    int b[N][N];
    unordered_map<int, PII> mp;
    
    void init() {
        memset(b, -1, sizeof b);
        for (int i = 0, k = 0; i < 6 && k < 26; ++ i )
            for (int j = 0; j < 5 && k < 26; ++ j , ++ k )
                b[i][j] = k, mp[k] = {i, j};
    }
    
    bool check(int x, int y) {
        return x >= 0 && x < 6 && y >= 0 && y < 5 && x * 5 + y < 26;
    }
    
    // ATTENTION 不能出界
    string get(int x, int y, int nx, int ny) {
        string ret;
        while (x != nx || y != ny) {
            if (x != nx) {
                if (nx - x > 0) {
                    char c = 'D';
                    while (x != nx && check(x + 1, y)) {
                        ret.push_back(c);
                        x ++ ;
                    }
                } else {
                    char c = 'U';
                    while (x != nx && check(x - 1, y)) {
                        ret.push_back(c);
                        x -- ;
                    }
                }
            }
            if (y != ny) {
                if (ny - y > 0) {
                    char c = 'R';
                    while (y != ny && check(x, y + 1)) {
                        ret.push_back(c);
                        y ++ ;
                    }
                } else {
                    char c = 'L';
                    while (y != ny && check(x, y - 1)) {
                        ret.push_back(c);
                        y -- ;
                    }
                }
            }
        }
        
        ret.push_back('!');
        return ret;
    }
    
    string alphabetBoardPath(string target) {
        init();
        string res;
        int x = 0, y = 0;
        for (auto c : target) {
            auto [nx, ny] = mp[c - 'a'];
            res += get(x, y, nx, ny);
            x = nx, y = ny;
        }
        
        return res;
    }
};
```

**也可以巧妙 trick 简化对于 `z` 的特殊处理**

```c++
class Solution {
public:
    string alphabetBoardPath(string target) {
        // 模拟 注意‘z’必须先左后下，先上后右
        string res;
        int x = 0, y = 0;
        for (char c : target) {
            int t = c - 'a', nx = t / 5, ny = t % 5;
            if (ny < y)
                for (int _ = 0; _ < y - ny; _ ++)
                    res += 'L';
            if (nx > x)
                for (int _ = 0; _ < nx - x; _ ++)
                    res += 'D';
            if (nx < x)
                for (int _ = 0; _ < x - nx; _ ++)
                    res += 'U';
            if (ny > y)
                for (int _ = 0; _ < ny - y; _ ++)
                    res += 'R';
            res += '!';
            x = nx, y = ny;
        }
        return res;
    }
};
```



### [1139. 最大的以 1 为边界的正方形](https://leetcode.cn/problems/largest-1-bordered-square/)

显然前缀和 略

```c++
class Solution {
public:
    const static int N = 110;
    
    int n, m;
    int sl[N][N], su[N][N];
    
    bool check(int k) {
        for (int i = k; i <= n; ++ i )
            for (int j = k; j <= m; ++ j ) {
                int dv = sl[i][j], rv = su[i][j];
                int uv = sl[i - k + 1][j], lv = su[i][j - k + 1];
                if (dv >= k && rv >= k && uv >= k && lv >= k)
                    return true;
            }
        return false;
    }
    
    int largest1BorderedSquare(vector<vector<int>>& grid) {
        this->n = grid.size(), this->m = grid[0].size();
        memset(sl, 0, sizeof sl);
        memset(su, 0, sizeof su);
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                if (grid[i - 1][j - 1])
                    sl[i][j] = sl[i][j - 1] + 1;
                else
                    sl[i][j] = 0;
        for (int j = 1; j <= m; ++ j )
            for (int i = 1; i <= n; ++ i )
                if (grid[i - 1][j - 1])
                    su[i][j] = su[i - 1][j] + 1;
                else
                    su[i][j] = 0;
        
        for (int k = min(n, m); k; -- k )
            if (check(k))
                return k * k;
        return 0;
    }
};
```

### [1140. 石子游戏 II](https://leetcode.cn/problems/stone-game-ii/)

博弈 + 记忆化

注意状态定义与其他人略有不同，因此返回时 `(s[n] + t) / 2`

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 110;
    const int INF = 0x3f3f3f3f;
    
    int n;
    int s[N];
    map<PII, int> hash;
    
    int dp(int x, int m) {
        if (x == n)
            return 0;
        PII pi = {x, m};
        if (hash.count(pi))
            return hash[pi];
        
        int t = -INF, top = min(n, x + 2 * m);
        for (int i = x + 1; i <= top; ++ i )
            t = max(t, s[i] - s[x] - dp(i, max(m, i - x)));
        
        return hash[pi] = t;
    }
    
    int stoneGameII(vector<int>& piles) {
        this->n = piles.size();
        memset(s, 0, sizeof s);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + piles[i - 1];
        
        int t = dp(0, 1);
        
        return (s[n] + t) / 2;
    }
};
```
