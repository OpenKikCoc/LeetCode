## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-59/)


### [1974. 使用特殊打字机键入单词的最少时间](https://leetcode-cn.com/problems/minimum-time-to-type-word-using-special-typewriter/)

线性扫描即可 略

```c++
class Solution {
public:
    const static int N = 26;
    
    int g[N][N];
    
    void init() {
        for (int i = 0; i < N; ++ i )
            for (int j = 0; j < N; ++ j )
                g[i][j] = min(abs(i - j), 26 - abs(i - j));
    }
    
    int minTimeToType(string word) {
        init();
        
        int last = 0, res = 0;
        for (int i = 0; i < word.size(); ++ i ) {
            res += g[last][word[i] - 'a'] + 1;
            last = word[i] - 'a';
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    int minTimeToType(string word) {
        char L = 'a';
        int ans = 0;
        for (char c : word) {
            int x = abs(c - L);
            ans += min(x, 26 - x) + 1;
            L = c;
        }
        return ans;
    }
};
```

### [1975. 最大方阵和](https://leetcode-cn.com/problems/maximum-matrix-sum/)

简单推理易知，总是能【通过传递的方式】同时使两个位置的值取反

显然扫一遍统计即可

```c++
// 虚拟比赛代码
class Solution {
public:
    using LL = long long;
    
    int n;
    
    long long maxMatrixSum(vector<vector<int>>& matrix) {
        this->n = matrix.size();
        LL s = 0, ns = 0, mv = INT_MAX, msv = INT_MIN, c = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < n; ++ j ) {
                LL t = matrix[i][j];
                if (t >= 0)
                    s += t, mv = min(mv, t);
                else
                    ns += t, msv = max(msv, t), c ++ ;
            }
        if (c & 1) {
            if (-msv > mv)
                s = s - ns - mv - mv;
            else
                s = s - (ns - msv) + msv;
        } else
            s -= ns;
        return s;
    }
};
```

```c++
// 进一步简化 by Heltion
class Solution {
public:
    long long maxMatrixSum(vector<vector<int>>& matrix) {
        int n = 0, mn = 100000;
        long long sum = 0;
        for (auto& v : matrix) for (int x : v) {
            sum += abs(x);
            if (x < 0) n += 1;
            mn = min(abs(x), mn);
        }
        if (n & 1) return sum - mn * 2;
        return sum;
    }
};
```

### [1976. 到达目的地的方案数](https://leetcode-cn.com/problems/number-of-ways-to-arrive-at-destination/)

最短路计数 `dijkstra` 即可

注意 `PLI long long` WA 1

```c++
class Solution {
public:
    using LL = long long;
    using PLI = pair<LL, int>; // long long
    const static int N = 210, M = 80010;
    const LL INF = 2e18, MOD = 1e9 + 7;
    
    int n;
    int h[N], e[M], w[M], ne[M], idx;
    
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    LL d[N], c[N];
    bool st[N];
    
    void dijkstra(int s) {
        // memset(d, 0x3f, sizeof d); 因为0x3f3f3f3f不够用
        for (int i = 0; i < N; ++ i ) d[i] = INF;
        memset(c, 0, sizeof c);
        memset(st, 0, sizeof st);
        
        d[s] = 0, c[s] = 1;
        priority_queue<PLI, vector<PLI>, greater<PLI>> heap;
        heap.push({0, s});
        
        while (heap.size()) {
            auto [dis, u] = heap.top(); heap.pop();
            if (st[u])
                continue;
            st[u] = true;
            
            for (int i = h[u]; ~i; i = ne[i]) {
                int v = e[i];
                LL cost = w[i];
                if (d[v] > d[u] + cost) {
                    d[v] = d[u] + cost;
                    c[v] = c[u];
                    heap.push({d[v], v});
                } else if (d[v] == d[u] + cost)
                    c[v] = (c[v] + c[u]) % MOD;
            }
        }
    }
    
    int countPaths(int n, vector<vector<int>>& roads) {
        init();
        this->n = n;
        for (auto & r : roads)
            add(r[0], r[1], r[2]), add(r[1], r[0], r[2]);
        
        dijkstra(0);
        return c[n - 1];
    }
};
```

### [1977. 划分数字的方案数](https://leetcode-cn.com/problems/number-of-ways-to-separate-numbers/) [TAG]

经典 dp 优化

较显然的，可以得知状态定义及转移方程

分析知当前取值需对上一个结尾的数的所有情况求和，故【维护一个前缀和数组】

另外当长度相等时需考虑字符串比较，此时需【预处理 `LCP` 】

```c++
class Solution {
public:
    using LL = long long;
    const int MOD = 1e9 + 7;
    
    string s;
    vector<vector<int>> f, sum, lcp;
    
    // [r1结束长度为l的串] 是否 >= [r2结束长度为l的串]
    bool check(int r1, int r2, int l) {
        int l1 = r1 - l + 1, l2 = r2 - l + 1;
        if (l1 <= 0 || l2 <= 0)
            return false;
        int t = lcp[l1][l2];
        return t >= l || s[l1 + t - 1] > s[l2 + t - 1];
    }
    
    int numberOfCombinations(string num) {
        this->s = num;
        int n = s.size();
        f = sum = lcp = vector<vector<int>>(n + 1, vector<int>(n + 1));
        
        // lcp
        for (int i = n; i; -- i )
            for (int j = n; j; -- j )
                if (s[i - 1] != s[j - 1])
                    lcp[i][j] = 0;
                else {
                    lcp[i][j] = 1;
                    if (i < n && j < n)
                        lcp[i][j] += lcp[i + 1][j + 1];
                }
        
        // 初始化
        f[0][0] = 1;
        for (int i = 0; i <= n; ++ i )
            sum[0][i] = 1;  // sum[0][i] = sum[0][i - 1]
        
        // f[i][j] 前i个数 最后一个长度为j的方案数
        // sum[i][j] 以i结尾 长度不超过j的方案数总和
        for (int i = 1; i <= n; ++ i ) {
            for (int j = 1; j <= i; ++ j ) {
                int k = i - j;
                // 前缀和优化 将[枚举k结尾长度]的On降为O1
                if (s[k + 1 - 1] == '0')
                    f[i][j] = 0;    // 本段包含前缀0 非法
                else {
                    // case 1 长度小于j的都合法
                    f[i][j] = sum[k][j - 1];
                    // for (int t = 0; t < j; ++ t )
                    //     f[i][j] += f[k][t];
                    
                    // case 2 长度等于j的要比较大小
                    if (check(i, k, j))
                        f[i][j] = (f[i][j] + f[k][j]) % MOD;
                }
                // 更新
                sum[i][j] = (sum[i][j - 1] + f[i][j]) % MOD;
            }
            // 更新 根据定义，且j在内层循环所以必须这么写
            for (int j = i + 1; j <= n; ++ j )
                sum[i][j] = sum[i][j - 1];
        }
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            res = (res + f[n][i]) % MOD;    // add
        return res;
    }
};
```
