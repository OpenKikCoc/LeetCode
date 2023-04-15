## [比赛链接](https://leetcode.cn/contest/weekly-contest-340/)

>   virtual rank: 151 / 4937
>
>   1:33:19
>   0:05:48  2
>   0:11:13
>   0:29:26  1
>   1:13:19  1


###[2614. 对角线上的质数](https://leetcode.cn/problems/prime-in-diagonal/) 



```c++
const static int N = 4e6 + 10;
    
int primes[N], cnt;
bool st[N];

void init() {
    memset(st, 0, sizeof st);
    cnt = 0;
    
    st[1] = true;
    
    for (int i = 2; i < N; ++ i ) {
        if (!st[i])
            primes[cnt ++ ] = i;
        for (int j = 0; primes[j] <= (N - 1) / i; ++ j ) {
            st[primes[j] * i] = true;
            if (i % primes[j] == 0)
                break;
        }
    }
}

class Solution {
public:
    int diagonalPrime(vector<vector<int>>& nums) {
        init();
        
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            if (!st[nums[i][i]])
                res = max(res, nums[i][i]);
            if (!st[nums[i][n - i - 1]])
                res = max(res, nums[i][n - i - 1]);
        }
        return res;
    }
};
```


### [2615. 等值距离和](https://leetcode.cn/problems/sum-of-distances/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL s[N];
    
    vector<long long> distance(vector<int>& nums) {
        int n = nums.size();
        
        unordered_map<int, vector<int>> h;
        for (int i = 0; i < n; ++ i )
            h[nums[i]].push_back(i);
        
        vector<LL> res(n);
        for (auto & [k, v] : h) {
            sort(v.begin(), v.end());
            int m = v.size();
            s[0] = 0;
            for (int i = 1; i <= m; ++ i )
                s[i] = s[i - 1] + v[i - 1];
            LL sum = s[m];
            
            for (int i = 1; i <= m; ++ i ) {
                int id = v[i - 1];
                LL t = ((LL)id * i - s[i]) + (sum - s[i] - (LL)(m - i) * id);
                res[id] = t;
            }
        }
        return res;
    }
};
```

### [2616. 最小化数对的最大差值](https://leetcode.cn/problems/minimize-the-maximum-difference-of-pairs/)



```c++
class Solution {
public:
    bool check(vector<int> & xs, int x, int p) {
        int c = 0, m = xs.size();
        for (int i = 1; i < m; ++ i ) {
            if (xs[i] - xs[i - 1] <= x)
                c ++ , i ++ ;
        }
        return c >= p;
    }
    
    int minimizeMax(vector<int>& nums, int p) {
        // => 分析知 这些数对一定是连续选取 因为不连续的话一定有更有解
        //  则可以看不超过 x 的情况下能不能选够 p 个
        sort(nums.begin(), nums.end());
        
        // for (auto x : nums)
        //     cout << x << ' ';
        // cout << endl;
        
        int l = 0, r = 1e9 + 10;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (check(nums, mid, p))
                r = mid;
            else
                l = mid + 1;
        }
        return l;
    }
};
```

### [2617. 网格图中最少访问的格子数](https://leetcode.cn/problems/minimum-number-of-visited-cells-in-a-grid/) [TAG]

在线 BFS

```c++
class Solution {
public:
    const static int N = 1e5 + 10, INF = 0x3f3f3f3f;
    
    int n, m;
    vector<vector<int>> g;
    
    vector<set<int>> r, c;  // 行 列
    
    int d[N], q[N * 2];
    
    int minimumVisitedCells(vector<vector<int>>& grid) {
        this->g = grid;
        this->n = g.size(), this->m = g[0].size();
        r.resize(n), c.resize(m);
        
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                int t = i * m + j;
                r[i].insert(t), c[j].insert(t);
            }
        
        memset(d, 0x3f, sizeof d);
        d[0] = 0;
        r[0].erase(0), c[0].erase(0);
        
        int hh = 0, tt = -1;
        q[ ++ tt] = 0;
        
        while (hh <= tt) {
            int u = q[hh ++ ];
            int x = u / m, y = u % m, v = g[x][y];
            {
                auto & s = r[x];
                for (auto it = s.lower_bound(x * m + y + 1); it != s.end() && *it <= x * m + y + v; it = s.erase(it)) {
                    int t = *it;
                    d[t] = d[u] + 1;
                    q[ ++ tt] = t;
                    
                    c[t % m].erase(t);
                }
            }
            {
                auto & s = c[y];
                for (auto it = s.lower_bound(x * m + y + 1); it != s.end() && *it <= (x + v) * m + y; it = s.erase(it)) {
                    int t = *it;
                    d[t] = d[u] + 1;
                    q[ ++ tt] = t;
                    
                    r[t / m].erase(t);
                }
            }
        }
        
        // for (int i = 0; i < n; ++ i ) {
        //     for (int j = 0; j < m; ++ j )
        //         cout << d[i * m + j] << ' ';
        //     cout << endl;
        // }
        
        return d[n * m - 1] < INF / 2 ? d[n * m - 1] + 1: -1;
    }
};
```
