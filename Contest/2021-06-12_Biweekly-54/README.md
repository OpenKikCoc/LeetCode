## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-54/)


### [1893. 检查是否区域内所有整数都被覆盖](https://leetcode-cn.com/problems/check-if-all-the-integers-in-a-range-are-covered/)

略

```c++
class Solution {
public:
    bool isCovered(vector<vector<int>>& ranges, int left, int right) {
        vector<bool> st(55);
        for (auto & ve : ranges)
            for (int i = ve[0]; i <= ve[1]; ++ i )
                st[i] = true;
        for (int i = left; i <= right; ++ i )
            if (!st[i])
                return false;
        return true;
    }
};
```


### [1894. 找到需要补充粉笔的学生编号](https://leetcode-cn.com/problems/find-the-student-that-will-replace-the-chalk/)

略 不二分直接线性扫描也能过

```c++
class Solution {
public:
    using LL = long long;
    int chalkReplacer(vector<int>& chalk, int k) {
        int n = chalk.size();
        vector<LL> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + chalk[i - 1];
        k %= s[n];
        
        int l = 1, r = n;
        while (l < r) {
            int m = l + r >> 1;
            if (s[m] <= k)
                l = m + 1;
            else
                r = m;
        }
        return l - 1;
    }
};
```

### [1895. 最大的幻方](https://leetcode-cn.com/problems/largest-magic-square/)

前缀和处理 遍历即可

```c++
class Solution {
public:
    using LL = long long;
    vector<vector<int>> g;
    int n, m;
    vector<vector<LL>> sr, sd, sadd, ssub;  // i + j, i - j + m
    
    void init() {
        sr = sd = vector<vector<LL>>(n + 1, vector<LL>(m + 1));
        sadd = vector<vector<LL>>(n + m + 1, vector<LL>(n + 1));
        ssub = vector<vector<LL>>(n + m + 1, vector<LL>(m + 1));
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                LL v = g[i - 1][j - 1];
                sr[i][j] = sr[i][j - 1] + v;
                sd[i][j] = sd[i - 1][j] + v;
                sadd[i + j][i] = sadd[i + j][i - 1] + v;
                ssub[i - j + m][j] = ssub[i - j + m][j - 1] + v;
            }
    }
    
    bool f(int x, int y, int k) {
        int l = y - k, u = x - k;
        int v = sr[x][y] - sr[x][l];
        for (int i = x - 1; i > u; -- i )
            if (sr[i][y] - sr[i][l] != v)
                return false;
                
        for (int j = y; j > l; -- j )
            if (sd[x][j] - sd[u][j] != v)
                return false;
                
        if (sadd[x + l + 1][x] - sadd[u + y + 1][u] != v ||
            ssub[x - y + m][y] - ssub[u - l + m][l] != v)
            return false;
        return true;
    }
    
    bool check(int k) {
        for (int i = k; i <= n; ++ i )
            for (int j = k; j <= m; ++ j )
                if (f(i, j, k))
                    return true;
        return false;
    }
    
    int largestMagicSquare(vector<vector<int>>& grid) {
        this->g = grid;
        n = g.size(), m = g[0].size();
        init();
        
        for (int k = min(n, m); k; -- k )
            if (check(k))
                return k;
        return 0;   // never
    }
};
```

其实暴力就能过，写前缀和写了不少时间

```c++
// 暴力
typedef long long LL;

class Solution {
public:
    bool check(vector<vector<int>>& g, int a, int b, int c, int d) {
        LL sum = 0;
        for (int i = a; i <= c; i ++ ) {
            LL s = 0;
            for (int j = b; j <= d; j ++ ) s += g[i][j];
            if (sum && sum != s) return false;
            sum = s;
        }

        for (int i = b; i <= d; i ++ ) {
            LL s = 0;
            for (int j = a; j <= c; j ++ ) s += g[j][i];
            if (sum != s) return false;
        }

        LL s = 0;
        for (int i = a, j = b; i <= c; i ++, j ++ )
            s += g[i][j];
        if (s != sum) return false;

        s = 0;
        for (int i = a, j = d; i <= c; i ++, j -- )
            s += g[i][j];
        return s == sum;
    }

    int largestMagicSquare(vector<vector<int>>& g) {
        int n = g.size(), m = g[0].size();
        for (int k = min(n, m); k; k -- )
            for (int i = 0; i + k - 1 < n; i ++ )
                for (int j = 0; j + k - 1 < m; j ++ )
                    if (check(g, i, j, i + k - 1, j + k - 1))
                        return k;
        return 1;
    }
};
```



### [1896. 反转表达式值的最少操作次数](https://leetcode-cn.com/problems/minimum-cost-to-change-the-final-value-of-expression/) [TAG]

>   经典

**中缀表达式 + 树形DP**

最终变成：要求表达式树的值，但对于中缀表达式的形式可以直接借助栈，无需完整建树

```c++
class Solution {
public:
    stack<vector<int>> num; // 取0 取1分别需要操作多少次
    stack<char> op;
    
    int get_min(vector<int> s) {
        int x = INT_MAX;
        for (auto v : s)
            x = min(x, v);
        return x;
    }
    
    void eval() {
        auto a = num.top(); num.pop();
        auto b = num.top(); num.pop();
        char c = op.top(); op.pop();
        
        if (c == '&') {
            // 得到 0 需 {0, 0}, {0, 1}, {1, 0}, 或改变符号后 {0, 0} + 1
            vector<int> s0 = {a[0] + b[0], a[0] + b[1], a[1] + b[0], a[0] + b[0] + 1};
            // 得到 1 ...
            vector<int> s1 = {a[1] + b[1], a[1] + b[0] + 1, a[0] + b[1] + 1, a[1] + b[1] + 1};
            num.push({get_min(s0), get_min(s1)});
        } else {
            vector<int> s0 = {a[0] + b[0], a[0] + b[1] + 1, a[1] + b[0] + 1, a[0] + b[0] + 1};
            vector<int> s1 = {a[1] + b[1], a[0] + b[1], a[1] + b[0], a[1] + b[1] + 1};
            num.push({get_min(s0), get_min(s1)});
        }
    }
    
    int minOperationsToFlip(string expression) {
        for (auto c : expression)
            if (isdigit(c)) {
                if (c == '0')
                    num.push({0, 1});
                else
                    num.push({1, 0});
            } else if (c == '(') {
                op.push(c);
            } else if (c == ')') {
                while (op.top() != '(')
                    eval();
                op.pop();   // (
            } else {
                // 一般字符
                // 中缀表达式 故先把前面算完
                while (op.size() && op.top() != '(')
                    eval();
                op.push(c);
            }
        
        while (op.size())
            eval();
        // 一定有一个是0(即什么都不修改时的值) 而非0的较大的数即为所求
        return max(num.top()[0], num.top()[1]);
    }
};
```
