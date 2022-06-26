## [比赛链接](https://leetcode.cn/contest/weekly-contest-297/)

>   virtual rank: 136 / 5915


### [2303. 计算应缴税款总额](https://leetcode.cn/problems/calculate-amount-paid-in-taxes/)



```c++
class Solution {
public:
    double calculateTax(vector<vector<int>>& bs, int income) {
        double res = 0, last = 0, tot = income;
        for (auto & b : bs) {
            if (fabs(tot) < 1e-5)
                break;
            double u = b[0], p = b[1] / 100.0;
            double w = u - last;
            if (w <= tot)
                res += w * p, tot -= w;
            else
                res += tot * p, tot = 0;
            last = u;
        }
        return res;
    }
};
```


### [2304. 网格中的最小路径代价](https://leetcode.cn/problems/minimum-path-cost-in-a-grid/)



```c++
class Solution {
public:
    const static int N = 55, INF = 0x3f3f3f3f;
    
    int f[N][N];
    vector<vector<int>> g;
    int m, n;
    
    int minPathCost(vector<vector<int>>& grid, vector<vector<int>>& moveCost) {
        this->g = grid;
        this->m = g.size(), this->n = g[0].size();
        
        memset(f, 0x3f, sizeof f);
        
        for (int i = 1; i <= n; ++ i )
            f[1][i] = grid[0][i - 1];
        
        for (int i = 2; i <= m; ++ i )
            for (int j = 1; j <= n; ++ j ) {
                for (int k = 1; k <= n; ++ k )
                    f[i][j] = min(f[i][j], f[i - 1][k] + moveCost[g[i - 2][k - 1]][j - 1] + g[i - 1][j - 1]);
            }
        
        int res = INF;
        for (int i = 1; i <= n; ++ i )
            res = min(res, f[m][i]);
        return res;
    }
};
```

### [2305. 公平分发饼干](https://leetcode.cn/problems/fair-distribution-of-cookies/)



```c++
class Solution {
public:
    const static int N = 9;
    
    int f[2][1 << N], c[1 << N];
    
    int distributeCookies(vector<int>& cs, int k) {
        memset(c, 0, sizeof c);
        int n = cs.size();
        for (int i = 0; i < 1 << n; ++ i )
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1)
                    c[i] += cs[j];
            
        memset(f, 0x3f, sizeof f);
        f[0][0] = 0;
        for (int i = 1; i <= k; ++ i )
            for (int j = 0; j < 1 << n; ++ j )
                for (int k = j; k; k = (k - 1) & j)
                    f[i & 1][j] = min(f[i & 1][j], max(f[(i - 1) & 1][j ^ k], c[k]));
        
        return f[k & 1][(1 << n) - 1];
    }
};
```

### [2306. 公司命名](https://leetcode.cn/problems/naming-a-company/)



```c++
class Solution {
public:
    // 按照开头字母分类，则每一类与其他类之间互换可以得到新名字（容斥：需排除后缀相同的部分）
    
    using LL = long long;
    const static int N = 5e4 + 10;
    
    int tot = 0;
    unordered_map<string, int> hash;
    int get(string s) {
        if (hash.count(s))
            return hash[s];
        return hash[s] = tot ++ ;
    }
    
    bitset<N> has[26];
    
    long long distinctNames(vector<string>& ideas) {
        for (auto & s : ideas) {
            int m = s.size();
            int idx = s[0] - 'a';
            has[idx][get(s.substr(1))] = 1;
        }
        
        LL res = 0;
        for (int i = 0; i < 26; ++ i )
            for (int j = i + 1; j < 26; ++ j ) {
                auto t = has[i] & has[j];
                int ca = has[i].count(), cb = has[j].count(), cc = t.count();
                res += (LL)(ca - cc) * (cb - cc) * 2;
            }
        return res;
    }
};
```
