## [比赛链接](https://leetcode.cn/contest/biweekly-contest-123/)


### [3024. 三角形类型](https://leetcode.cn/problems/type-of-triangle/)



```c++
class Solution {
public:
    string triangleType(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int a = nums[0], b = nums[1], c = nums[2];
        if (a + b <= c)
            return "none";
        if (a == b && b == c)
            return "equilateral";
        if (a == b || b == c)
            return "isosceles";
        return "scalene";
    }
};
```


### [3025. 人员站位的方案数 I](https://leetcode.cn/problems/find-the-number-of-ways-to-place-people-i/)

同 4

```c++

```

### [3026. 最大好子数组和](https://leetcode.cn/problems/maximum-good-subarray-sum/)

经典暴力优化，实际上也不需要 deque，直接维护 min 值就好

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL sum[N];
    unordered_map<LL, deque<int>> h;
    
    long long maximumSubarraySum(vector<int>& nums, int k) {
        int n = nums.size();
        LL res = -1e16;
        sum[0] = 0; // ATTENTION 不能初始化h[0].push_back(0)
        for (int i = 1; i <= n; ++ i ) {
            int x = nums[i - 1];
            
            sum[i] = sum[i - 1] + x;
            
            if (h.count(x - k) && !h[x - k].empty()) {
                int y = h[x - k].front();
                res = max(res, sum[i] - (y ? sum[y - 1] : 0));
            }
            if (h.count(x + k) && !h[x + k].empty()) {
                int y = h[x + k].front();
                res = max(res, sum[i] - (y ? sum[y - 1] : 0));
            }
            
            // ATTENTION: TLE 优化
            // 对于相同的 x 要保留sum最小的那个的下标, 这样才能让区间和最大 => 单调队列 => 需要取队底部故deque
            {
                auto & stk = h[x];
                while (!stk.empty() && sum[stk.front() - 1] >= sum[i - 1])
                    stk.pop_back();
                stk.push_back(i);
            }
        }
        return res == -1e16 ? 0 : res;
    }
};
```

### [3027. 人员站位的方案数 II](https://leetcode.cn/problems/find-the-number-of-ways-to-place-people-ii/)

最初比较糙的版本

```c++
class Solution {
public:
    // ATTENTION 题意是 内部或边缘...而非只排排除边缘 显然需要二维前缀合
    const static int N = 1010;      // ATTENTION 1: 只需要 1010 不需要 2010，因为 xy 彼此独立
    
    int g[N][N];
    void init() {
        memset(g, 0, sizeof g);
    }
    
    vector<int> xs, ys;
    int get(vector<int> s, int x) {
        return lower_bound(s.begin(), s.end(), x) - s.begin();
    }
    
    bool check(int x1, int y1, int x2, int y2) {
        return g[x2][y1] - g[x2][y2 - 1] - g[x1 - 1][y1] + g[x1 - 1][y2 - 1] == 2;
    };
    
    int numberOfPairs(vector<vector<int>>& points) {
        // sorting...
        sort(points.begin(), points.end(), [](const vector<int> & a, const vector<int> & b) {
            if (a[0] == b[0])
                return a[1] > b[1];
            return a[0] < b[0];
        });
        
        {
            for (auto & p : points) {
                int x = p[0], y = p[1];
                xs.push_back(x), ys.push_back(y);
            }
            sort(xs.begin(), xs.end());
            sort(ys.begin(), ys.end());
        }
        {
            init();
            for (auto & p : points) {
                int x = get(xs, p[0]) + 1, y = get(ys, p[1]) + 1;
                g[x][y] ++ ;
                p[0] = x, p[1] = y;
            }
            for (int i = 1; i < N; ++ i )
                for (int j = 1; j < N; ++ j )
                    g[i][j] += g[i - 1][j] + g[i][j - 1] - g[i - 1][j - 1];
        }
        
        int n = points.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            int x1 = points[i][0], y1 = points[i][1], cap = 0;  // ATTENTION 2: trick 优化 => 理论上如果某个点符合要求，则后续必须比这个点更高
            for (int j = i + 1; j < n; ++ j ) {
                int x2 = points[j][0], y2 = points[j][1];
                if (y2 > y1)
                    continue;
                
                // ATTENTION 2.1
                if (y2 <= cap)
                    continue;
                
                if (check(x1, y1, x2, y2)) {
                    res ++ ;
                    
                    // ATTENTION 2.2
                    cap = max(cap, y2);
                }
            }
        }
        return res;
    }
};
```

逻辑简化

```c++
class Solution {
public:
    // ATTENTION 更进一步 只要保证该上限即可满足条件 【思考 充要条件】
    
    int numberOfPairs(vector<vector<int>>& points) {
        // sorting...
        sort(points.begin(), points.end(), [](const vector<int> & a, const vector<int> & b) {
            if (a[0] == b[0])
                return a[1] > b[1];
            return a[0] < b[0];
        });
        
        int n = points.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            int x1 = points[i][0], y1 = points[i][1], cap = -2e9;  // ATTENTION 2: trick 优化 => 理论上如果某个点符合要求，则后续必须比这个点更高
            for (int j = i + 1; j < n; ++ j ) {
                int x2 = points[j][0], y2 = points[j][1];
                if (y2 > y1)
                    continue;
                
                // ATTENTION 2.1
                if (y2 <= cap)
                    continue;
                
                res ++ ;
                // ATTENTION 2.2
                cap = max(cap, y2);
            }
        }
        return res;
    }
};
```
