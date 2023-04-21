## [比赛链接](https://leetcode.cn/contest/weekly-contest-341/)


### [2643. 一最多的行](https://leetcode.cn/problems/row-with-maximum-ones/)



```c++
class Solution {
public:
    vector<int> rowAndMaximumOnes(vector<vector<int>>& mat) {
        int p = -1, c = 0;
        int n = mat.size(), m = mat[0].size();
        for (int i = 0; i < n; ++ i ) {
            int t = 0;
            for (int j = 0; j < m; ++ j )
                if (mat[i][j])
                    t ++ ;
            if (p == -1 || c < t)
                p = i, c = t;
        }
        return {p, c};
    }
};
```


### [2644. 找出可整除性得分最大的整数](https://leetcode.cn/problems/find-the-maximum-divisibility-score/)



```c++
class Solution {
public:
    const static int N = 1010;
    
    int c[N];
    
    int maxDivScore(vector<int>& nums, vector<int>& divisors) {
        memset(c, 0, sizeof c);
        
        int n = divisors.size();
        for (auto x : nums)
            for (int i = 0; i < n; ++ i )
                if (x % divisors[i] == 0)
                    c[i] ++ ;
        
        int p = 0;
        for (int i = 0; i < n; ++ i )
            if (c[i] > c[p] || c[i] == c[p] && divisors[i] < divisors[p])
                p = i;
        return divisors[p];
    }
};
```

### [2645. 构造有效字符串的最少插入数](https://leetcode.cn/problems/minimum-additions-to-make-valid-string/)



```c++
class Solution {
public:
    int addMinimum(string word) {
        int n = word.size(), p = 0, res = 0;
        for (;;) {
            for (char c = 'a'; c <= 'c'; ++ c )
                if (p < n && word[p] == c)
                    p ++ ;
                else
                    res ++ ;
            if (p == n)
                break;
        }
        return res;
    }
};
```

### [2646. 最小化旅行的价格总和](https://leetcode.cn/problems/minimize-the-total-price-of-the-trips/)

显然可以暴力求路径累计的结果，随后树 DP 即可

也可以树差分 略

```c++
class Solution {
public:
    // 无向图 树说明任意两点路径唯一
    // 比较显然的是每一个旅途都会给一个路径累加 1，求最后总的最小开销
    //  => 树差分 => 数据范围比较小考虑直接暴力？
    const static int N = 55, M = 110;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    vector<int> ps;
    int c[N];
    int path[N], cnt;
    
    bool find(int u, int pa, int v) {
        path[cnt ++ ] = u;
        
        if (u == v)
            return true;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            if (find(j, u, v))
                return true;
        }
        cnt -- ;
        return false;
    }
    
    int f[N][2];    // 原价 半价
    void dfs(int u, int pa) {
        f[u][0] = ps[u] * c[u], f[u][1] = ps[u] / 2 * c[u];
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            dfs(j, u);
            f[u][0] += min(f[j][0], f[j][1]);
            f[u][1] += f[j][0];
        }
    }
    
    int minimumTotalPrice(int n, vector<vector<int>>& edges, vector<int>& price, vector<vector<int>>& trips) {
        this->n = n, this->ps = price;
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        memset(c, 0, sizeof c); // 记录访问的次数
        for (auto & t : trips) {
            cnt = 0;
            find(t[0], -1, t[1]);
            
            for (int i = 0; i < cnt; ++ i )
                c[path[i]] ++ ;
        }
        
        memset(f, 0x3f, sizeof f);
        dfs(0, -1);
        
        return min(f[0][0], f[0][1]);
    }
};
```
