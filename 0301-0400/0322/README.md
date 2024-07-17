#  [322. 零钱兑换](https://leetcode.cn/problems/coin-change/)

## 题意



## 题解



```c++
class Solution {
public:
    int coinChange(vector<int>& coins, int m) {
        vector<int> f(m + 1, 1e8);
        f[0] = 0;
        for (auto v: coins)
            for (int j = v; j <= m; j ++ )
                f[j] = min(f[j], f[j - v] + 1);
        if (f[m] == 1e8) return -1;
        return f[m];
    }
};
```



```python
"""
(动态规划) O(nm)
完全背包问题。
相当于有 n 种物品，每种物品的体积是硬币面值，价值是1。问装满背包最少需要多少价值的物品？

状态表示： f[j] 表示凑出 jj 价值的钱，最少需要多少个硬币。
第一层循环枚举不同硬币，第二层循环从小到大枚举所有价值（由于每种硬币有无限多个，所以要从小到大枚举），然后用第 i 种硬币更新 f[j]：f[j] = min(f[j], f[j - coins[i]] + 1)。

时间复杂度分析：令 nn 表示硬币种数，mm 表示总价钱，则总共两层循环，所以时间复杂度是 O(nm)。
"""

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # 2020-12-21复习
        # 完全背包问题
        # amount表示背包容量，coins的每一项表示每个物品的体积大小
        # 本题转化为，求完全装满amount背包，最少能拿多少个物品
        # 状态表示：dp[j]表示完全装满j大小的背包所需的最少物品数量

        dp = [float('inf')] * (amount+1)
        dp[0] = 0
        for coin in coins:
            for j in range(coin, amount+1):
                dp[j] = min(dp[j], dp[j-coin]+1)

        if dp[-1] == float('inf'): return -1
        return dp[-1]

```

