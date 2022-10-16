## [比赛链接](https://leetcode.cn/contest/biweekly-contest-89/)


### [6208. 有效时间的数目](https://leetcode.cn/problems/number-of-valid-clock-times/)



```c++
class Solution {
public:
    const static int N = 5;
    vector<string> xs;
    void init() {
        xs.clear();
        // 24 * 60
        char s[10];
        for (int i = 0; i < 1440; ++ i ) {
            int h = i / 60, m = i % 60;
            sprintf(s, "%02d:%02d", h, m);
            xs.push_back(s);
        }
    }
    
    int countTime(string time) {
        init();
        int res = 0;
        for (auto & s : xs) {
            bool flag = true;
            for (int i = 0; i < N; ++ i )
                if (time[i] != '?' && time[i] != s[i]) {
                    flag = false;
                    break;
                }
            if (flag)
                res ++ ;
        }
        return res;
    }
};
```


### [6209. 二的幂数组中查询范围内的乘积](https://leetcode.cn/problems/range-product-queries-of-powers/)



```c++
class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;

    vector<LL> ps;
    void init(int n) {
        ps.clear();
        for (int i = 0; i < 31; ++ i ) {
            if (n >> i & 1)
                ps.push_back(1 << i);
        }
    }
    
    vector<int> productQueries(int n, vector<vector<int>>& queries) {
        init(n);
        
        vector<int> res;
        for (auto & q : queries) {
            LL t = 1;
            for (int i = q[0]; i <= q[1]; ++ i )
                t = (t * ps[i]) % MOD;
            res.push_back(t);
        }
        return res;
    }
};
```

### [6210. 最小化数组中的最大值](https://leetcode.cn/problems/minimize-maximum-of-array/)



```c++
class Solution {
public:
    // 只能给第一个元素加，而不能减
    using LL = long long;
    const static int N = 1e5 + 10;
    
    int n;
    LL a[N], s[N];
    
    // 能不能不超过m (即右边部分用完或缺少)
    bool check(LL m) {
        for (int i = 1; i <= n; ++ i ) {
            if (s[i] > m * i)
                return false;
        }
        return true;
    }
    
    int minimizeArrayValue(vector<int>& nums) {
        this->n = nums.size();
        for (int i = 1; i <= n; ++ i ) a[i] = nums[i - 1];
        s[0] = 0;
        for (int i = 1; i <= n; ++ i ) s[i] = s[i - 1] + a[i];
        
        LL l = a[1], r = 1e9;
        while (l < r) {
            LL m = l + (r - l) / 2;
            if (check(m))
                r = m;
            else
                l = m + 1;
        }
        return l;
    }
};
```

### [6211. 创建价值相同的连通块](https://leetcode.cn/problems/create-components-with-same-value/) [TAG]

显然的有根据数据范围求解

另外还有 dfs 内部的实现思维

```c++
class Solution {
public:
    // 观察数据，1 <= nums[i] <= 50
    // ===> 树总值最大为 1e6, 因子数 240, 考虑枚举每个联通块的价值【这个价值必须整除总值】
    using LL = long long;
    const static int N = 2e4 + 10, M = 4e4 + 10;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    vector<int> ns;
    
    // 求以某个点为根的子树的价值和
    int f[N];
    void dfs_1(int u, int fa) {
        f[u] = ns[u];
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            dfs_1(j, u);
            f[u] += f[j];
        }
    }
    
    // 每块联通块值都为 k
    bool dfs_2(int u, int fa, int k) {
        int s = ns[u];
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            if (!dfs_2(j, u, k))
                return false;
            // ATTENTION 把这部分加在一起
            if (f[j] % k)
                s += f[j] % k;
        }
        // ATTENTION 思考 只有 <= k 才是合法的，否则说明这一坨一定无法合理分割
        return s <= k;
    }
    
    int componentValue(vector<int>& nums, vector<vector<int>>& edges) {
        init();
        this->ns = nums;
        this->n = ns.size();
        
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        dfs_1(0, -1);
        
        // 枚举值
        for (int i = 1; i <= f[0]; ++ i )
            if (f[0] % i == 0 && dfs_2(0, -1, i))
                return f[0] / i - 1;
        return 0;
    }
};
```
