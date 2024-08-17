## [比赛链接](https://leetcode.cn/contest/weekly-contest-403/)

>   virtual rank: 114 / 3112
>
>   20  1:13:37  0:02:01  0:05:34  0:28:55 1  1:08:37


### [3194. 最小元素和最大元素的最小平均值](https://leetcode.cn/problems/minimum-average-of-smallest-and-largest-elements/)



```c++
class Solution {
public:
    double minimumAverage(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        double res = 1e9;
        for (int i = 0, j = n - 1; i < j; ++ i , -- j )
            res = min(res, (nums[i] + nums[j]) / 2.0);
        return res;
    }
};
```


### [3195. 包含所有 1 的最小矩形面积 I](https://leetcode.cn/problems/find-the-minimum-area-to-cover-all-ones-i/)



```c++
class Solution {
public:
    const static int INF = 0x3f3f3f3f;
    
    int minimumArea(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        
        int u = INF, d = -INF, l = INF, r = -INF;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (grid[i][j])
                    u = min(u, i), d = max(d, i), l = min(l, j), r = max(r, j);
        
        return (d - u + 1) * (r - l + 1);
    }
};
```

### [3196. 最大化子数组的总成本](https://leetcode.cn/problems/maximize-total-cost-of-alternating-subarrays/)

加快速度 脑袋理清楚

老代码

```c++
class Solution {
public:
    // 考虑 一个数取正 取负 仅仅与该数是否与前一个相连有关...
    // f[i][j]  第i个数为结尾 其中第i是否与前面相连的 最大cost
    // f[i][0] = max(f[i-1][0], f[i-1][1]) + nums[i]
    // f[i][1] = max(f[i-2][0], f[i-2][1]) + nums[i-1] + -1*nums[i]
    
    using LL = long long;
    const static int N = 1e5 + 10, INF = 0x3f3f3f3f;
    
    LL f[N][2];
    
    long long maximumTotalCost(vector<int>& nums) {
        
        for (int i = 0; i < N; ++ i )
            f[i][0] = f[i][1] = -INF;
        f[0][0] = 0;
        
        int n = nums.size();
        for (int i = 1; i <= n; ++ i ) {
            int x = nums[i - 1];
            
            f[i][0] = max(f[i - 1][0], f[i - 1][1]) + x;
            if (i - 1)
                f[i][1] = max(f[i - 2][0], f[i - 2][1]) + nums[i - 1 - 1] + -1 * x;
            // cout << " i = " << i << " f = " << f[i][0] << " " << f[i][1] << endl;
        }
        return max(f[n][0], f[n][1]);
    }
};
```

标准代码

```c++
class Solution {
public:
    // 考虑 一个数取正 取负 仅仅与该数是否与前一个相连有关...
    // f[i][j]  第i个数为结尾 其中第i 取正/负 的最大cost
    // f[i][0] = max(f[i-1][0], f[i-1][1]) + nums[i]
    // f[i][1] = max(f[i-1][0]) - nums[i]
    
    using LL = long long;
    const static int N = 1e5 + 10, INF = 0x3f3f3f3f;
    
    LL f[N][2];
    
    long long maximumTotalCost(vector<int>& nums) {
        
        for (int i = 0; i < N; ++ i )
            f[i][0] = f[i][1] = -INF + -INF;
        f[0][1] = 0;    // 对于第一个数来说 只能取正
        
        int n = nums.size();
        for (int i = 1; i <= n; ++ i ) {
            int x = nums[i - 1];
            
            f[i][0] = max(f[i - 1][0], f[i - 1][1]) + x;
            f[i][1] = f[i - 1][0] - x;
        }
        return max(f[n][0], f[n][1]);
    }
};
```

### [3197. 包含所有 1 的最小矩形面积 II](https://leetcode.cn/problems/find-the-minimum-area-to-cover-all-ones-ii/)

标准分治 DP

类似 棋盘分割 / 切披萨的方案数

```c++
class Solution {
public:
    // 思考
    // 因为1个矩形可行的情况下一定可以拆成2/3；对2个矩形可行的情况也一定可以拆成3
    // 所以不妨枚举 最少可以拆成多少个矩形
    // 1. (d-u+1) * (r-l+1)
    // 2. 需要在 udlr 的某个角开始向内移除一个最大的全0矩形
    // 3. 需要在 udlr 的某个边开始向内移除一个最大的矩形 => 实际上情况可能有很多种...
    // 对于2/3本质上可以归并 需要注意的是判断条件
    
    const static int N = 35, INF = 0x3f3f3f3f;
    
    vector<vector<int>> g;
    tuple<int, int, int, int> calc(int u, int d, int l, int r) {
        int uu = INF, dd = -INF, ll = INF, rr = -INF;
        for (int i = u; i <= d; ++ i )
            for (int j = l; j <= r; ++ j )
                if (g[i - 1][j - 1])
                    uu = min(uu, i), dd = max(dd, i), ll = min(ll, j), rr = max(rr, j);
        return {uu, dd, ll, rr};
    }
    
    int s[N][N];
    int get_sum(int u, int d, int l, int r) {
        return s[d][r] - s[d][l - 1] - s[u - 1][r] + s[u - 1][l - 1];
    }
    
    unordered_map<int, int> mem;
    int get(int u, int d, int l, int r, int k) {
        int ret = 0;
        for (auto x : {u, d, l, r, k})
            ret = ret * 50 + x;
        return ret;
    }
    
    int dp(int u, int d, int l, int r, int k) {
        auto key = get(u, d, l, r, k);
        if (mem.count(key))
            return mem[key];
        if (get_sum(u, d, l, r) == 0)
            return mem[key] = 0;
        
        if (k == 1) {
            auto [uu, dd, ll, rr] = calc(u, d, l, r);
            return mem[key] = (dd - uu + 1) * (rr - ll + 1);
        }
        
        int ret = INF;
        // 横着切
        for (int i = u; i < d; ++ i )
            for (int _k = 1; _k < k; ++ _k )
                ret = min(ret, dp(u, i, l, r, _k) + dp(i + 1, d, l, r, k - _k));
        // 竖着切
        for (int i = l; i < r; ++ i )
            for (int _k = 1; _k < k; ++ _k )
                ret = min(ret, dp(u, d, l, i, _k) + dp(u, d, i + 1, r, k - _k));
        return mem[key] = ret;
    }
    
    int minimumSum(vector<vector<int>>& grid) {
        this->g = grid;
        int n = grid.size(), m = grid[0].size();
        
        memset(s, 0, sizeof s);
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + grid[i - 1][j - 1];
        
        // 考虑分治...
        // 针对矩形 切1刀 看最小代价
        auto [u, d, l, r] = calc(1, n, 1, m);
        return dp(u, d, l, r, 3);
    }
};
```
