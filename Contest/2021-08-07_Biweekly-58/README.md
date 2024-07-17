## [比赛链接](https://leetcode.cn/contest/biweekly-contest-58)


### [5193. 删除字符使字符串变好](https://leetcode.cn/problems/delete-characters-to-make-fancy-string/)

线性处理皆可 略

```c++
class Solution {
public:
    string makeFancyString(string s) {
        string res;
        int n = s.size();
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n && s[j] == s[i])
                j ++ ;
            int d = min(j - i, 2);
            while (d -- )
                res.push_back(s[i]);
            i = j - 1;
        }
        return res;
    }
};
```


### [5827. 检查操作是否合法](https://leetcode.cn/problems/check-if-move-is-legal/)

任意方向合法均可 主要是理解题意

加强写模拟题的速度

```c++
class Solution {
public:
    vector<vector<char>> b;
    int n, m;
    int dx[8] = {-1, -1, -1, 0, 1, 1, 1, 0}, dy[8] = {-1, 0, 1, 1, 1, 0, -1, -1};
    
    bool cango(int x, int y, char ch) {
        return x >= 0 && x < n && y >= 0 && y < m && b[x][y] == ch;
    }
    
    bool checkMove(vector<vector<char>>& board, int r, int c, char color) {
        this->b = board;
        this->n = b.size(), m = b[0].size();
        // 根据题意无需此判断
        // if (b[r][c] != '.')
        //     return false;
        
        char ch = (color == 'B' ? 'W' : 'B');
        for (int i = 0; i < 8; ++ i ) {
            int x = r + dx[i], y = c + dy[i], c = 0;
            while (cango(x, y, ch)) {
                c ++ ;
                x += dx[i], y += dy[i];
            }
            if (c > 0 && cango(x, y, color)) {
                return true;
            }
        }
        return false;
    }
};
```

其他写法

```c++
class Solution {
public:
    int dx[8] = { 0, 0, 1, -1, -1, -1, 1, 1 };
    int dy[8] = { 1, -1, 0, 0, 1, -1, 1, -1 };
    bool checkMove(vector<vector<char>>& g, int x, int y, char c) {
        int n = g.size(), m = g[0].size();
        char t = c == 'B' ? 'W' : 'B';
        for (int i = 0; i < 8; i++) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            if (g[nx][ny] == t) {
                while (1) {
                    nx = nx + dx[i], ny = ny + dy[i];
                    if (nx < 0 || nx >= n || ny < 0 || ny >= m) break;
                    if (g[nx][ny] == t) continue;
                    else if (g[nx][ny] == '.') break;
                    else {
                        return 1;
                    }
                }
            }
        }
        return 0;
    }
};
```



### [5828. K 次调整数组大小浪费的最小总空间](https://leetcode.cn/problems/minimum-total-space-wasted-with-k-resizing-operations/)

显然需要预处理【区间最值】和【区间和】

随后 200 的数据范围写线性 dp 即可

自己写了 RMQ 实际上可以直接区间 dp 来求区间最值

**唯一需要注意的点是初始化思路**

```c++
class Solution {
public:
    const static int N = 210, M = 9;
    
    vector<int> w;
    int n;
    int s[N];
    int f[N][M], g[N][N];
    
    void init() {
        for (int j = 0; j < M; ++ j )
            for (int i = 1; i + (1 << j) - 1 <= n; ++ i )
                if (!j)
                    f[i][j] = w[i - 1];
                else
                    f[i][j] = max(f[i][j - 1], f[i + (1 << j - 1)][j - 1]);
                
        memset(s, 0, sizeof s);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + w[i - 1];
    }
    
    int query(int l, int r) {
        int len = r - l + 1;
        int k = log(len) / log(2);
        return max(f[l][k], f[r - (1 << k) + 1][k]);
    }
    
    int get(int l, int r) {
        int tot = s[r] - s[l - 1];
        int mxv = query(l, r);
        return mxv * (r - l + 1) - tot;
    }
    
    int minSpaceWastedKResizing(vector<int>& nums, int k) {
        this->w = nums;
        this->n = w.size();
        init();
        
        // 把整个数组分成 k + 1 个区间
        // 可以直接写到 k 是因为 g[i][0] 本已代表一个区间
        memset(g, 0x3f, sizeof g);
        for (int j = 0; j <= k; ++ j )
            g[0][j] = 0;
        for (int i = 1; i <= n; ++ i ) {
            g[i][0] = get(1, i);
            for (int j = 1; j <= i; ++ j )
                for (int t = 0; t < i; ++ t )
                    g[i][j] = min(g[i][j], g[t][j - 1] + get(t + 1, i));
        }
        return g[n][k];
    }
};
```

也可以不写 RMQ 如

```c++
// yxc
class Solution {
public:
    int minSpaceWastedKResizing(vector<int>& nums, int k) {
        k ++ ;
        int n = nums.size(), INF = 1e9;
        vector<vector<int>> f(n + 1, vector<int>(k + 1, INF));
        vector<int> s(n + 1);
        for (int i = 1; i <= n; i ++ ) s[i] = s[i - 1] + nums[i - 1];
        f[0][0] = 0;
        for (int i = 1; i <= n; i ++ )
            for (int j = 1; j <= i && j <= k; j ++ )
                for (int u = i, h = 0; u; u -- ) {
                    h = max(h, nums[u - 1]);
                    f[i][j] = min(f[i][j], f[u - 1][j - 1] + h * (i - u + 1) - (s[i] - s[u - 1]));
                }
        return f[n][k];
    }
};
```

官方题解预处理 `O(n^2)` 的做法

```c++
class Solution {
public:
    int minSpaceWastedKResizing(vector<int>& nums, int k) {
        int n = nums.size();

        // 预处理数组 g
        // 思路
        vector<vector<int>> g(n, vector<int>(n));
        for (int i = 0; i < n; ++i) {
            // 记录子数组的最大值
            int best = INT_MIN;
            // 记录子数组的和
            int total = 0;
            for (int j = i; j < n; ++j) {
                best = max(best, nums[j]);
                total += nums[j];
                g[i][j] = best * (j - i + 1) - total;
            }
        }
        
        vector<vector<int>> f(n, vector<int>(k + 2, INT_MAX / 2));
        for (int i = 0; i < n; ++i)
            for (int j = 1; j <= k + 1; ++j)
                for (int i0 = 0; i0 <= i; ++i0)
                    f[i][j] = min(f[i][j], (i0 == 0 ? 0 : f[i0 - 1][j - 1]) + g[i0][i]);

        return f[n - 1][k + 1];
    }
};
```



### [5220. 两个回文子字符串长度的最大乘积](https://leetcode.cn/problems/maximum-product-of-the-length-of-two-palindromic-substrings/) [TAG]

非常好的 manacher 应用题 重复做

以及【前缀和后缀分解】的经典思路

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    char b[N];
    int p[N];
    
    void manacher(int n) {
        p[0] = 1;
        int id = 0, mx = 0;
        for (int i = 1; i < n; ++ i ) {
            p[i] = mx > i ? min(p[2 * id - i], mx - i) : 1;
            while (i >= p[i] && b[i - p[i]] == b[i + p[i]])
                p[i] ++ ;
            if (i + p[i] > mx)
                id = i, mx = i + p[i];
        }
    }
    
    long long maxProduct(string s) {
        int n = s.size();
        for (int i = 0; i < n; ++ i )
            b[i] = s[i];
        b[n] = 0;
        
        manacher(n);
        
        vector<int> f(n), g(n);
        // i 指前缀下标
        // j 指当前扫到的中心
        // 非常巧妙的双指针优化
        for (int i = 0, j = 0, mx = 0; i < n; ++ i ) {
            while (j + p[j] - 1 < i) {
                mx = max(mx, p[j]);
                j ++ ;
            }
            mx = max(mx, i - j + 1);
            f[i] = mx;
        }
        for (int i = n - 1, j = n - 1, mx = 0; i >= 0; -- i ) {
            while (j - p[j] + 1 > i) {
                mx = max(mx, p[j]);
                j -- ;
            }
            mx = max(mx, j - i + 1);
            g[i] = mx;
        }
        
        LL res = 0;
        for (int i = 0; i < n - 1; ++ i )
            res = max(res, (LL)(f[i] * 2 - 1) * (g[i + 1] * 2 - 1));
        return res;
    }
};
```
