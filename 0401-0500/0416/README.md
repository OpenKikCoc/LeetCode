#  [416. 分割等和子集](https://leetcode-cn.com/problems/partition-equal-subset-sum/)

## 题意



## 题解



```c++
class Solution {
public:
    // bitset
    bool canPartition(vector<int>& nums) {
        bitset<10001> f;
        f[0] = 1;
        int sum = 0;
        for (auto x: nums) {
            f |= f << x;
            sum += x;
        }
        if (sum % 2) return false;
        return f[sum / 2];
    }
};

class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int n = nums.size(), m = 0;
        for (auto x: nums) m += x;
        if (m % 2) return false;
        m /= 2;
        vector<int> f(m + 1);
        f[0] = 1;
        for (auto x: nums)
            for (int j = m; j >= x; j -- )
                f[j] |= f[j - x];
        return f[m];
    }
};
```



```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        # 两个子集的和要想等，说明nums之和应该为偶数，且每个子集的和应该是sum(nums)/2
        if sum(nums) % 2 == 1 or len(nums) == 1:
            return False
        # 这样就转化为了：从nums中任选数字，这些数字之和要等于sum(nums)/2，那么剩下的就是另一个子集
        # 这就是一个01背包问题，背包容积是sum(nums)/2,从N=len(nums)中选，每个物品的体积是nums[i]，问能否恰好装满这个包
        # 闫氏dp分析法
        # 状态表示：dp[i][j]表示遍历到第i位时是否可凑出target。
        # 状态计算：第i个物品装或不装：dp[i][j] = dp[i-1][j-nums[i]]装 or dp[i-1][j]不装,有一个为True就说明在前i个数中是存在符合要求的方案的
        # 注意：j = 0时初始化为True，从定义出发，j=0说明sum(nums)/2==0，说明sum(num)==0,那么相当于全0数组分割，当然是True
        # N, V = len(nums), int(sum(nums)/2)
        # 注意这里j也要开多一位，因为需要取到V
        # dp = [[False] * (V + 1) for _ in range(N+1)]
        # for i in range(N+1):
        #     dp[i][0] = True
        # nums = [0] + nums
        # for i in range(1, N+1):
        #     for j in range(V+1):
        #         if j < nums[i]:
        #             dp[i][j] = dp[i-1][j]
        #         else:
        #             dp[i][j] = dp[i-1][j-nums[i]] or dp[i-1][j]
        # return dp[N][V]
        # 状态压缩
        N, V = len(nums), int(sum(nums)/2)
        dp = [False] * (V + 1)
        dp[0] = True
        nums = [0] + nums
        for num in nums:
            for j in range(V, num-1, -1):
                dp[j] = dp[j-num] or dp[j]
        return dp[V]
```

