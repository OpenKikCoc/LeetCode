#  [312. 戳气球](https://leetcode-cn.com/problems/burst-balloons/)

## 题意



## 题解

```c++
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> a(n + 2, 1);
        for (int i = 1; i <= n; i ++ ) a[i] = nums[i - 1];
        vector<vector<int>> f(n + 2, vector<int>(n + 2));
        for (int len = 3; len <= n + 2; len ++ )
            for (int i = 0; i + len - 1 <= n + 1; i ++ ) {
                int j = i + len - 1;
                for (int k = i + 1; k < j; k ++ )
                    f[i][j] = max(f[i][j], f[i][k] + f[k][j] + a[i] * a[k] * a[j]);
            }

        return f[0][n + 1];
    }
};
```

```c++
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        vector<vector<int>> f(n + 2, vector<int>(n + 2));
        // for (int i = 1; i <= n; ++ i ) f[i][i] = nums[i]; // NOT
        for (int len = 1; len <= n; ++ len )
            for (int l = 1; l + len - 1 <= n; ++ l ) {
                int r = l + len - 1;
                for (int k = l; k <= r; ++ k )
                    f[l][r] = max(f[l][r], f[l][k - 1] + f[k + 1][r] + nums[l - 1] * nums[r + 1] * nums[k]);
            }
        return f[1][n];
    }
};
```



```python
"""
(动态规划) O(n3)
状态： dp[i][j]dp[i][j]表示戳爆从第 i 到第 j 个气球得到的最大金币数。

状态转移方程： dp[i][j]=max(dp[i][j], dp[i][k−1] + num[i−1] ∗ nums[k] ∗ nums[j+1] + dp[k+1][j])
其中，k可以理解成[i,j] 范围里最后戳破的一个气球。

时间复杂度O(n3): 三层循环

空间复杂度O(n2): dp[i][j]数组的大小是(n+2)∗(n+2)

"""
class Solution(object):
    def maxCoins(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """

        nums = [1] + nums + [1]
        # dp[i,j]表示集合中[i+1,j-1]气球打完的最大值方案
        dp = [[0] * len(nums) for i in range(len(nums))]

        # 因为我们一个区间，有三个指针，所以初始长度最少为3
        # 我们这个区间的最大范围是len(num)
        for midRange in range(3, len(nums) + 1):
            # i是中间区间的左边界
            i = 0
            while i + midRange - 1 < len(nums):
                # j最多到len(nums) - 1
                j = i + midRange - 1

                # k的移动范围[i+1, j-1]
                # 这个区间内i*k*j的最大值 max(nums[i]*nums[k]*nums[j])
                for k in range(i + 1, j):
                    dp[i][j] = max(dp[i][j], dp[i][k] + nums[i] * nums[k] * nums[j] + dp[k][j])
                i += 1

        return dp[0][-1]
```

