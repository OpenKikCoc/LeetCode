## [比赛链接](https://leetcode.cn/contest/ubiquant2022/)


### [九坤-01. 可以读通讯稿的组数](https://leetcode.cn/contest/ubiquant2022/problems/xdxykd/)



```c++
class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;
    int get(int x) {
        string s = to_string(x);
        reverse(s.begin(), s.end());
        return stoi(s);
    }
    int numberOfPairs(vector<int>& nums) {
        unordered_map<int, int> hash;
        for (auto x : nums)
            hash[x - get(x)] ++ ;
        int res = 0;
        for (auto [k, v] : hash) {
            res += (LL)v * (v - 1) / 2 % MOD;
        }
        return res;
    }
};
```


### [九坤-02. 池塘计数](https://leetcode.cn/contest/ubiquant2022/problems/3PHTGp/)



```c++
class Solution {
public:
    vector<string> g;
    int n, m;
    
    int dx[8] = {-1, -1, -1, 0, 1, 1, 1, 0}, dy[8] = {-1, 0, 1, 1, 1, 0, -1, -1};
    void dfs(int x, int y) {
        g[x][y] = '.';
        for (int i = 0; i < 8; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                continue;
            if (g[nx][ny] == '.')
                continue;
            dfs(nx, ny);
        }
    }
    
    int lakeCount(vector<string>& field) {
        this->g = field;
        this->n = g.size(), this->m = g[0].size();
        
        int res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j] == 'W') {
                    res ++ ;
                    dfs(i, j);
                }
        
        return res;
    }
};
```

### [九坤-03. 数字默契考验](https://leetcode.cn/contest/ubiquant2022/problems/uGuf0v/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    int c2[N], c3[N];
    
    int minOperations(vector<int>& numbers) {
        memset(c2, 0, sizeof c2), memset(c3, 0, sizeof c3);
        
        int n = numbers.size();
        for (int i = 0, last = -1; i < n; ++ i ) {
            int x = numbers[i];
            while (x % 2 == 0)
                x /= 2, c2[i] ++ ;
            while (x % 3 == 0)
                x /= 3, c3[i] ++ ;
            if (last != -1 && x != last)
                return -1;
            last = x;
        }
        
        int mx2 = 0, mx3 = 0;
        for (int i = 0; i < n; ++ i )
            mx2 = max(mx2, c2[i]), mx3 = max(mx3, c3[i]);
        
        int res = 0;
        for (int i = 0; i < n; ++ i )
            res += mx2 - c2[i] + mx3 - c3[i];
        return res;
    }
};
```

### [九坤-04. 筹码游戏](https://leetcode.cn/contest/ubiquant2022/problems/I3Gm2h/) [TAG]

概率 dp 求期望

```c++
class Solution {
public:
    // ATTENTION 每种面值无限多个说明取出任意一种的概率都是定植
    
    int k;
    double res;
    vector<int> ns;
    
    // map instead of unordered_map
    map<vector<int>, double> hash;
    
    double dp(vector<int> t) {
        if (hash.count(t))
            return hash[t];
        
        int cnt = 0;
        double ret = 0;
        for (int i = 0; i < k; ++ i ) {
            // 找这组相同的里面的最后一个去加
            int j = i;
            while (j < k && t[j] == t[i])
                j ++ ;
            // ATTENTION: TODO
            if (t[j - 1] == ns[j - 1])
                continue;
            
            t[j - 1] ++ ;
            double adt = dp(t);
            t[j - 1] -- ;
            
            ret += (j - i) * adt;
            cnt += j - i;
            
            i = j - 1;
        }
        ret = (ret + k) / cnt;
        return hash[t] = ret;
    }
    
    double chipGame(vector<int>& nums, int kind) {
        this->k = kind, this->res = 0;
        hash.clear();
        
        this->ns = nums;
        ns.resize(k);
        sort(ns.begin(), ns.end());
        hash[ns] = 0;
        
        return dp(vector<int>(k, 0));
    }
};
```
