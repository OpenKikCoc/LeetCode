## [比赛链接](https://leetcode.cn/contest/weekly-contest-366/)


### [2894. 分类求和并作差](https://leetcode.cn/problems/divisible-and-non-divisible-sums-difference/)



```c++
class Solution {
public:
    int differenceOfSums(int n, int m) {
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            if (i % m)
                res += i;
            else
                res -= i;
        return res;
    }
};
```


### [2895. 最小处理时间](https://leetcode.cn/problems/minimum-processing-time/)



```c++
class Solution {
public:
    int minProcessingTime(vector<int>& processorTime, vector<int>& tasks) {
        vector<int> xs;
        for (auto x : processorTime)
            for (int j = 0; j < 4; ++ j )
                xs.push_back(x);
        sort(xs.begin(), xs.end());

        sort(tasks.begin(), tasks.end());
        reverse(tasks.begin(), tasks.end());

        int res = 0;
        for (int i = 0; i < xs.size(); ++ i )
            res = max(res, xs[i] + tasks[i]);
        return res;
    }
};
```

### [2896. 执行操作使两个字符串相等](https://leetcode.cn/problems/apply-operations-to-make-two-strings-equal/) [TAG]

思维 DP 状态定义与转移

```c++
class Solution {
public:
    const static int N = 550;

    int f[N];

    int minOperations(string s1, string s2, int x) {
        int n = s1.size();

        vector<int> xs;
        for (int i = 0; i < n; ++ i )
            if (s1[i] != s2[i])
                xs.push_back(i);
        int m = xs.size();
        // 无论如何操作 s1的1的奇偶性不变
        // 如果有奇数个位置不同 显然无法转变
        if (m & 1)
            return -1;
        
        // ATTENTION 状态定义与转移
        //      => 考虑前i个位置中 有j个还未处理的情况下 最小成本
        //      => ATTENTION 可以任务 j<=1 因为如果 j>1 一定可以通过第一种操作消除一对
        memset(f, 0, sizeof f);
        for (int i = 1; i <= m; ++ i ) {
            f[i] = f[i - 1];

            // 使用第一种操作
            if (i % 2 == 0) // 偶数情况
                f[i] = f[i - 1] + x;
            
            // 使用第二种操作
            //  ATTENTION: 操作的两个位置中间一定不包含其他需要操作的位置
            //          否则可以置换为两次第二种操作 并降低开销
            if (i > 1)
                f[i] = min(f[i], f[i - 2] + xs[i - 1] - xs[i - 2]);
        }
        return f[m];    // m 一定是偶数
    }
};
```

### [2897. 对数组执行操作使平方和最大](https://leetcode.cn/problems/apply-operations-on-array-to-maximize-sum-of-squares/) [TAG]

典型按 bit 拆分

思维与推导

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10, M = 32, MOD = 1e9 + 7;

    // ATTENTION 对于某一个bit位 操作前后的1的数量是不变的
    //      => 考虑分 bit 统计
    
    int c[M];

    int maxSum(vector<int>& nums, int k) {
        int n = nums.size();
        for (auto x : nums)
            for (int j = 0; j < 32; ++ j )
                c[j] += (x >> j) & 1;
        
        LL res = 0;
        while (k -- ) {
            // 每次都挑
            // 思考，为什么能保证这样不会多计算 => k<=nums.size
            LL t = 0;
            for (int j = 0; j < 32; ++ j )
                if (c[j]) {
                    c[j] -- ;
                    t += 1 << j;
                }
            res = (res + t * t % MOD) % MOD;
        }
        return res;
    }
};
```
