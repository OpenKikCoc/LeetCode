## [比赛链接](https://leetcode.cn/contest/weekly-contest-391/)


### [3099. 哈沙德数](https://leetcode.cn/problems/harshad-number/)



```c++
class Solution {
public:
    int get(int x) {
        int y;
        while (x)
            y += x % 10, x /= 10;
        return y;
    }
    
    int sumOfTheDigitsOfHarshadNumber(int x) {
        int y = get(x);
        return (x % y == 0 ? y : -1);
    }
};
```


### [3100. 换水问题 II](https://leetcode.cn/problems/water-bottles-ii/)



```c++
class Solution {
public:
    int maxBottlesDrunk(int numBottles, int numExchange) {
        int res = numBottles;
        for (int x = numExchange, left = numBottles; x <= left; ++ x ) {
            left = left - x + 1;
            res ++ ;
        }
        return res;
    }
};
```

### [3101. 交替子数组计数](https://leetcode.cn/problems/count-alternating-subarrays/)



```c++
class Solution {
public:
    // 题意描述指的是连续数组 问题得以简化
    using LL = long long;
    
    long long countAlternatingSubarrays(vector<int>& nums) {
        LL res = 0;
        int n = nums.size();
        for (int i = 1; i <= n; ++ i ) {
            int x = nums[i - 1];
            int j = i + 1;
            while (j <= n && nums[j - 1] + nums[j - 2] == 1)
                j ++ ;
            LL w = j - i;
            res += w * (w + 1) / 2;
            i = j - 1;
        }
        return res;
    }
};
```

### [3102. 最小化曼哈顿距离](https://leetcode.cn/problems/minimize-manhattan-distances/) [TAG]

模版题 曼哈顿距离转切比雪夫距离

```c++
class Solution {
public:
    // 曼哈顿距离转切比雪夫距离

    int minimumDistance(vector<vector<int>>& points) {
        multiset<int> xs, ys;
        for (auto & p : points)
            xs.insert(p[0] + p[1]), ys.insert(p[1] - p[0]); // x+y, y-x;
        
        int res = INT_MAX;
        // 枚举移除当前点之后的最大距离
        for (auto & p : points) {
            int a = p[0] + p[1], b = p[1] - p[0];
            xs.erase(xs.find(a)), ys.erase(ys.find(b));     // 各自删除一个
        
            int dx = *xs.rbegin() - *xs.begin(), dy = *ys.rbegin() - *ys.begin();
            res = min(res, max(dx, dy));                    // ATTENTION

            xs.insert(a), ys.insert(b);                     // 恢复
        }
        return res;
    }
};
```
