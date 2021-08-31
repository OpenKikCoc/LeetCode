## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-256/)


### [1984. 学生分数的最小差值](https://leetcode-cn.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/)

排序即可

```c++
class Solution {
public:
    int minimumDifference(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int n = nums.size(), res = INT_MAX;
        for (int i = k - 1; i < n; ++ i )
            res = min(res, nums[i] - nums[i - k + 1]);
        return res;
    }
};
```


### [1985. 找出数组中的第 K 大整数](https://leetcode-cn.com/problems/find-the-kth-largest-integer-in-the-array/)

同样排序 细节写错wa1

```c++
class Solution {
public:
    string kthLargestNumber(vector<string>& nums, int k) {
        sort(nums.begin(), nums.end(), [](const string & a, const string & b) {
            if (a.size() != b.size())
                return a.size() < b.size();
            int sz = a.size();
            for (int i = 0; i < sz; ++ i )
                if (a[i] != b[i])
                    return a[i] < b[i];
            return false;
        });
        return nums[(int)nums.size() - k];
    }
};
```

`string` 可以直接比较

```c++
class Solution {
public:
    string kthLargestNumber(vector<string>& nums, int k) {
        sort(nums.begin(), nums.end(), [](const string & a, const string & b) {
            if (a.size() != b.size())
                return a.size() < b.size();
            return a < b;
        });
        return nums[(int)nums.size() - k];
    }
};
```

### [1986. 完成任务的最少工作时间段](https://leetcode-cn.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/)

显然需枚举方案 以及【**枚举子集**】

注意需要提前预处理消耗  否则 TLE

```c++
class Solution {
public:
    const int INF = 1e9;
    int minSessions(vector<int>& tasks, int sessionTime) {
        int n = tasks.size();
        vector<int> f(1 << n, INF), cost(1 << n, 0);
        for (int i = 0; i < 1 << n; ++ i ) {
            int s = 0;
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1)
                    s += tasks[j];
            cost[i] = s;
        }
        
        f[0] = 0;
        for (int i = 1; i < 1 << n; ++ i )
            for (int j = i; j; j = (j - 1) & i)
                if (cost[j] <= sessionTime)
                    f[i] = min(f[i], f[i ^ j] + 1);
        return f[(1 << n) - 1];
    }
};
```

### [1987. 不同的好子序列数目](https://leetcode-cn.com/problems/number-of-unique-good-subsequences/) [TAG]

> https://www.acwing.com/solution/content/65104/

```c++
class Solution {
public:
    const int MOD = 1e9 + 7;
    
    int numberOfUniqueGoodSubsequences(string binary) {
        int n = binary.size();
        
        // f[i]表示从第i个字符往后，构造出1开头的不同子序列的个数
        // g[i]表示从第i个字符往后，构造出0开头的不同子序列的个数
        // Case 1: 第i个字符为1，此时显然有 g[i] = g[i + 1]，考虑 f[i]
        //           第一类:使用第i个字符       第二类:不使用第i个字符
        // f[i] = (f[i + 1] + g[i + 1] + 1)  +  (f[i + 1])
        // 其中，两类内部无重复，但两类之间有重复。
        // 重复即第二类一定完全是第一类的子集，去除第二类的计数即可。
        // Case 2: 第i个字符为0，此时显然有 f[i] = f[i + 1]，类似考虑 g[i] 即可
        // ...
        //   初始化: f[n] = g[n] = 0;
        int f = 0, g = 0;
        bool has_zero = false;
        
        for (int i = n - 1; i >= 0; -- i )
            if (binary[i] == '0') {
                g = (f + g + 1) % MOD;
                has_zero = true;
            } else
                f = (f + g + 1) % MOD;
        
        return f + has_zero;
    }
};
```
