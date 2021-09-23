#  [494. 目标和](https://leetcode-cn.com/problems/target-sum/)

## 题意



## 题解

搜索 2^20 会超时 考虑dp

```c++
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int S) {
        int n = nums.size(); long sum = S;
        // 求和 优化 转化为取一些数达到 sum / 2 的值
        for (auto& v : nums) sum += v;
        if (sum & 1 || sum < 2 * S) return 0;
        sum /= 2;
        vector<int> f(sum + 1);
        f[0] = 1;
        for (int i = 1; i <= n; ++ i )
            for (int j = sum; j >= nums[i - 1]; -- j )
                f[j] = f[j] + f[j - nums[i - 1]];
        return f[sum];
    }
};


// yxc 较慢
class Solution {
public:
    int findTargetSumWays(vector<int>& a, int S) {
        if (S < -1000 || S > 1000) return 0;
        int n = a.size(), Offset = 1000;
        vector<vector<int>> f(n + 1, vector<int>(2001));
        f[0][Offset] = 1;
        for (int i = 1; i <= n; i ++ )
            for (int j = -1000; j <= 1000; j ++ ) {
                if (j - a[i - 1] >= -1000)
                    f[i][j + Offset] += f[i - 1][j - a[i - 1] + Offset];
                if (j + a[i - 1] <= 1000)
                    f[i][j + Offset] += f[i - 1][j + a[i - 1] + Offset];
            }
        return f[n][S + Offset];
    }
};

// wzc
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int S) {
        int n = nums.size();
        int sum = accumulate(nums.begin(), nums.end(), 0);

        if (!(-sum <= S && S <= sum))
            return 0;

        vector<vector<int>> f(n + 1, vector<int>(2 * sum + 1, 0));
        f[0][0 + sum] = 1;

        for (int i = 1; i <= n; i++)
            for (int j = -sum; j <= sum; j++) {
                if (-sum <= j - nums[i - 1])
                    f[i][j + sum] += f[i - 1][j - nums[i - 1] + sum];
                if (j + nums[i - 1] <= sum)
                    f[i][j + sum] += f[i - 1][j + nums[i - 1] + sum];
            }

        return f[n][S + sum];
    }
};
```



```python
#dp : 0/1背包问题：选 就是 正数；不选 就是负数
# f[i][j] 前i个数 总和为j的所有方案的集合；属性：数量
# 状态计算：分为两个子集：1) a[i]取正；f[i - 1][j - a[i]]
#                     2）a[i]取负 :f[i - 1][j + a[i]]
# f[0][0] = 1

class Solution:
    def findTargetSumWays(self, a: List[int], S: int) -> int:
        if S > 1000 or S < -1000:return 0
        n = len(a)
        offset = 1000 
        f = [[0] * 2001 for _ in range(n + 1)]
        f[0][offset] = 1  

        for i in range(1, n + 1):
            for j in range(-1000, 1001):
                if j - a[i - 1] >= -1000:
                    f[i][j + offset] += f[i - 1][j - a[i - 1] + offset]
                if j + a[i - 1] <= 1000:
                    f[i][j + offset] += f[i - 1][j + a[i - 1] + offset]

        return f[n][S + offset]
```

