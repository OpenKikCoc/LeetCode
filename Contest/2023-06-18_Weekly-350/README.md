## [比赛链接](https://leetcode.cn/contest/weekly-contest-350/)

>   virtual rank:
>
>   18/18  0:58:02  4/4  69/3580


### [2739. 总行驶距离](https://leetcode.cn/problems/total-distance-traveled/)



```c++
class Solution {
public:
    int distanceTraveled(int mainTank, int additionalTank) {
        int res = 0;
        for (int i = 1; mainTank > 0; ++ i ) {
            mainTank -- , res += 10;
            if (i % 5 == 0 && additionalTank)
                additionalTank -- , mainTank ++ ;
        }
        return res;
    }
};
```


### [2740. 找出分区值](https://leetcode.cn/problems/find-the-value-of-the-partition/)



```c++
class Solution {
public:
    int findValueOfPartition(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        // 数组非空
        int res = nums.back() - nums[0];
        for (int i = 1; i < n; ++ i ) {
            res = min(res, nums[i] - nums[i - 1]);
        }
        return res;
    }
};
```

### [2741. 特别的排列](https://leetcode.cn/problems/special-permutations/)



```c++
class Solution {
public:
    // 数据规模很小 考虑状压
    using LL = long long;
    const static int N = 2e4 + 10, M = 15, MOD = 1e9 + 7;
    
    LL f[N][M];   // 当前状态是 i, 上一位是 j 的【情况 => 方案数】
    
    int specialPerm(vector<int>& nums) {
        memset(f, 0, sizeof f);
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            f[0][i] = 1;
        
        int cap = 1 << n;
        for (int i = 1; i < cap; ++ i ) {
            // 枚举当前位
            for (int j = 0; j < n; ++ j )
                if (i & 1 << j) {
                    // 枚举上一位
                    for (int k = 0; k < n; ++ k )
                        if (i & 1 << k) {
                            if (nums[j] % nums[k] && nums[k] % nums[j])
                                continue;
                            f[i][j] = (f[i][j] + f[i ^ 1 << j][k]) % MOD;
                        }
                }
        }
        
        int res = 0;
        for (int i = 0; i < n; ++ i )
            res = (res + f[cap - 1][i]) % MOD;
        return res;
    }
};
```

### [2742. 给墙壁刷油漆](https://leetcode.cn/problems/painting-the-walls/) [TAG]

要想到dp 状态定义与转移

```c++
class Solution {
public:
    // Case: ans=55
    // [26,53,10,24,25,20,63,51]
    // [1,1,1,1,2,2,2,1]
    
    const static int N = 510, INF = 0x3f3f3f3f;
    
    int f[N];
    
    int paintWalls(vector<int>& cost, vector<int>& time) {
        int n = cost.size();
        memset(f, 0x3f, sizeof f);
        
        f[0] = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = n; j >= 0; -- j )
                f[j] = min(f[j], f[max(j - time[i] - 1, 0)] + cost[i]);
        return f[n];
    }
};
```
