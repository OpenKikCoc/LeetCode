## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-61/)


### [2006. 差的绝对值为 K 的数对数目](https://leetcode-cn.com/problems/count-number-of-pairs-with-absolute-difference-k/)

暴力 or map 统计都可

略

```c++
class Solution {
public:
    int countKDifference(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                if (abs(nums[i] - nums[j]) == k)
                    res ++ ;
        return res;
    }
};
```


### [2007. 从双倍数组中还原原数组](https://leetcode-cn.com/problems/find-original-array-from-doubled-array/)

显然先统计再贪心去除一定正确

注意需要**先排序再遍历去除**

```c++
class Solution {
public:
    vector<int> findOriginalArray(vector<int>& changed) {
        int n = changed.size();
        if (n & 1)
            return {};
        
        unordered_map<int, int> hash;
        for (auto v : changed)
            hash[v] ++ ;
        
        vector<int> res;
        sort(changed.begin(), changed.end());   // ATTENTION
        for (auto v : changed)
            if (hash[v]) {
                if (hash[v * 2] == 0)
                    return {};
                hash[v * 2] -- ;
                hash[v] -- ;
                res.push_back(v);
            }
        return res;
    }
};
```

### [2008. 出租车的最大盈利](https://leetcode-cn.com/problems/maximum-earnings-from-taxi/) [TAG]

既可以以开始位置作为状态定义 也可以以结束为止

结束位置定义可解释性更强

**容易得出定义 但要注意转移时直接【遍历位置而不是 rides 】 以及【最好预处理 rides 】**

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    // 以 i 结尾
    LL f[N];
    
    long long maxTaxiEarnings(int n, vector<vector<int>>& rides) {
        memset(f, 0, sizeof f);
        
        sort(rides.begin(), rides.end(), [](const vector<int> & a, const vector<int> & b) {
            return a[1] < b[1];
        });
        
        // WRONG: cause this will not differ ride-and-ride at same end-time
        // for (auto & r : rides) ...
        
        // RIGHT:
        // i means end-time
        // ==================== case 1 ==================== PASS
        // for (int i = 1, j = 0; i <= n; ++ i ) {
        //      f[i] = f[i - 1];
        //    
        //      while (j < rides.size() && rides[j][1] == i) {
        //          int l = rides[j][0], r = rides[j][1], v = rides[j][2];
        //          f[i] = max(f[i], f[l] + r - l + v);
        //          j ++ ;
        //      }
        // }
        // ==================== case 2 ==================== PASS
        using PII = pair<int, int>;
        #define x first
        #define y second
        vector<vector<PII>> ve(n + 1);
        for (auto & r : rides)
            ve[r[1]].push_back({r[0], r[2]});
        for (int i = 1; i <= n; ++ i ) {
            f[i] = f[i - 1];
            for (auto & [s, v] : ve[i])
                f[i] = max(f[i], f[s] + i - s + v);
        }
        
        return f[n];
    }
};
```

### [2009. 使数组连续的最少操作数](https://leetcode-cn.com/problems/minimum-number-of-operations-to-make-array-continuous/) [TAG]

一开始在思考将数据分段再贪心

其实是个思维题

要想到【**最终结果一定是一个长度为 n 的连续序列**】

另外 数字范围极大所以不能遍历数值 而是遍历输入数据同时使用【滑动窗口】维护 也因此需要【对输入进行排序】

```c++
class Solution {
public:
    // 思维 trick
    // 想象一下所有nums在一个数轴上，然后你拿一个长度为n的窗口去扫
    // 那么对于每个特定的窗口，里面有几个点就有几个不需要挪的坑。

    // 数值范围较大 1e9 所以无法直接使用 st[] 或者 set 记录然后直接遍历值
    // 应该 排序(must) + 滑动窗口
    
    int minOperations(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        
        int res = 2e9;
        // 还需要处理 nums 中重复的数字
        unordered_map<int, int> hash;
        for (int l = 0, r = 0, cnt = 0; r < n; ++ r ) {
            while (l <= r && nums[l] <= nums[r] - n) {
                if ( -- hash[nums[l]] == 0)
                    cnt -- ;
                l ++ ;
            }
            if ( ++ hash[nums[r]] == 1)
                cnt ++ ;
            res = min(res, n - cnt);
        }
        return res;
    }
};
```
