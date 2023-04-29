## [比赛链接](https://leetcode.cn/contest/weekly-contest-342/)


### [2651. 计算列车到站时间](https://leetcode.cn/problems/calculate-delayed-arrival-time/)



```c++
class Solution {
public:
    int findDelayedArrivalTime(int arrivalTime, int delayedTime) {
        return (arrivalTime + delayedTime) % 24;
    }
};
```


### [2652. 倍数求和](https://leetcode.cn/problems/sum-multiples/)



```c++
class Solution {
public:
    int sumOfMultiples(int n) {
        int res = 0;
        for (int i = 1; i <= n; ++ i ) {
            if (i % 3 == 0 || i % 5 == 0 || i % 7 == 0)
                res += i;
        }
        return res;
    }
};
```

### [2653. 滑动子数组的美丽值](https://leetcode.cn/problems/sliding-subarray-beauty/)



```c++
class Solution {
public:
    // 值域比较小 考虑直接扫描并记录
    const static int N = 110, D = 50;
    
    int c[N];
    int k, x;
    
    int find() {
        int t = x;
        for (int i = 0; i < N && t; ++ i ) {
            int cost = min(t, c[i]);
            t -= cost;
            if (!t)
                return min(i - D, 0);
        }
        return 0;
    }
    
    vector<int> getSubarrayBeauty(vector<int>& nums, int k, int x) {
        this->k = k, this->x = x;
        memset(c, 0, sizeof c);
        int n = nums.size();
        for (int i = 0; i < k - 1; ++ i )
            c[nums[i] + D] ++ ;
        
        vector<int> res;
        for (int i = k - 1; i < n; ++ i ) {
            c[nums[i] + D] ++ ;
            res.push_back(find());
            c[nums[i - k + 1] + D] -- ;
        }
        
        return res;
    }
};
```

### [2654. 使数组所有元素变成 1 的最少操作次数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1/) [TAG]

gcd 思想

```c++
class Solution {
public:
    int minOperations(vector<int>& nums) {
        int n = nums.size();
        
        // 如果整个数组的 gcd 都不为 1 则永远无法转成全 1
        int c = 0;
        {
            int g = 0;
            for (int i = 0; i < n; ++ i )
                g = __gcd(g, nums[i]), c += nums[i] == 1;
            if (g != 1)     // => if (g > 1)
                return -1;
        }
        
        // 如果原数组存在 1
        if (c)
            return n - c;
        
        // 数组不存在 1 需要构造 1
        // 【考虑 gcd 性质，一定是一个连续区间操作之后形成了一个 1】 => 深刻理解 gcd 性质
        // 枚举区间
        int minx = n;
        for (int i = 0; i < n; ++ i ) {
            int t = 0, g = 0;
            for (int j = i; j < n && g != 1; ++ j )
                g = __gcd(g, nums[j]), t ++ ;
            if (g == 1) {
                // 执行 t-1 次来构造出一个 1
                minx = min(minx, t - 1);
            }
        }
        
        return minx + n - 1;
    }
};
```
