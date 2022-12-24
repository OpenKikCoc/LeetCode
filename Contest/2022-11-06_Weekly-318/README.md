## [比赛链接](https://leetcode.cn/contest/weekly-contest-318/)

>   virtual rank: 45 / 5670


### [2460. 对数组执行操作](https://leetcode.cn/problems/apply-operations-to-an-array/)



```c++
class Solution {
public:
    vector<int> applyOperations(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n - 1; ++ i ) {
            if (nums[i] == nums[i + 1])
                nums[i] *= 2, nums[i + 1] = 0;
        }
        vector<int> res(n);
        for (int i = 0, p = 0; i < n; ++ i )
            if (nums[i])
                res[p ++ ] = nums[i];
        return res;
    }
};
```


### [2461. 长度为 K 子数组中的最大和](https://leetcode.cn/problems/maximum-sum-of-distinct-subarrays-with-length-k/)



```c++
class Solution {
public:
    using LL = long long;
    
    LL s, c;
    unordered_map<int, int> hash;
    void add(int x) {
        s += x;
        hash[x] ++ ;
        if (hash[x] == 1)
            c ++ ;
    }
    void sub(int x) {
        s -= x;
        hash[x] -- ;
        if (hash[x] == 0)
            c -- ;
    }
    
    long long maximumSubarraySum(vector<int>& nums, int k) {
        this->s = 0, this->c = 0;
        LL res = 0;
        int n = nums.size();
        for (int l = 0, r = 0; r < n; ++ r ) {
            add(nums[r]);
            if (l <= r - k)
                sub(nums[l ++ ]);
            if (r - l + 1 == k) {
                if (c == k)
                    res = max(res, s);
            }
        }
        return res;
    }
};
```

### [2462. 雇佣 K 位工人的总代价](https://leetcode.cn/problems/total-cost-to-hire-k-workers/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long totalCost(vector<int>& costs, int k, int candidates) {
        LL res = 0;
        int n = costs.size();
        priority_queue<int, vector<int>, greater<int>> l, r;
        for (int t = 1, i = 0, j = n - 1; t <= k; ++ t ) {
            while (l.size() < candidates && i <= j)
                l.push(costs[i ++ ]);
            while (r.size() < candidates && i <= j)
                r.push(costs[j -- ]);
            
            if (l.empty()) {
                res += r.top(); r.pop();
                continue;
            } else if (r.empty()) {
                res += l.top(); l.pop();
                continue;
            }
            
            int lv = l.top(), rv = r.top();
            // cout << " t = " << t << " lv = " << lv << " rv = " << rv << endl;
            if (lv > rv) {
                res += rv;
                r.pop();
            } else {
                res += lv;
                l.pop();
            }
        }
        return res;
    }
};
```

### [2463. 最小移动总距离](https://leetcode.cn/problems/minimum-total-distance-traveled/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 110, INF = 0x3f3f3f3f;
    
    // 考虑：一定是连续的一段机器人，去往同一个维修厂
    // 维护二维 dp：前 i 个机器人去往前 j 个维修厂（包含 j 以内）的最小消耗
    
    LL f[N][N];
    
    long long minimumTotalDistance(vector<int>& robot, vector<vector<int>>& factory) {
        sort(robot.begin(), robot.end());
        sort(factory.begin(), factory.end());
        int n = robot.size(), m = factory.size();
        memset(f, 0x3f, sizeof f);
        
        for (int j = 0; j <= m; ++ j )
            f[0][j] = 0;
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                // 1. 没有去第 j 个
                f[i][j] = f[i][j - 1];
                // 2. 有一个连续（非空）段，去往第 j 个
                // 考虑维护和，逆序枚举
                LL t = 0, cap = factory[j - 1][1];
                for (int k = i; k > 0 && i - k + 1 <= cap; -- k ) {
                    t += abs(factory[j - 1][0] - robot[k - 1]);
                    f[i][j] = min(f[i][j], f[k - 1][j - 1] + t);
                }
            }
        
        // for (int i = 1; i <= n; ++ i ) {
        //     for (int j = 1; j <= m; ++ j )
        //         cout << f[i][j] << ' ';
        //     cout << endl;
        // }
        
        return f[n][m];
    }
};
```
