#  [309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

## 题意



## 题解

```c++
// yxc
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.empty()) return 0;
        int n = prices.size(), INF = 1e8;
        vector<vector<int>> f(n, vector<int>(3, -INF));
        f[0][1] = -prices[0], f[0][0] = 0;
        for (int i = 1; i < n; i ++ ) {
            f[i][0] = max(f[i - 1][0], f[i - 1][2]);
            f[i][1] = max(f[i - 1][1], f[i - 1][0] - prices[i]);
            f[i][2] = f[i - 1][1] + prices[i];
        }
        return max(f[n - 1][0], max(f[n - 1][1], f[n - 1][2]));
    }
};
```


```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        int hs = INT_MIN, no = 0, mm = 0;
        for (int i = 0; i < n; ++ i ) {
            // hs = max(hs, no[-2] - prices[i]);
            // no = max(no, hs[-1] + prices[i]);
            int t = no;
            no = max(no, hs + prices[i]);
            hs = max(hs, mm - prices[i]);
            mm = t;
        }
        return no;
    }
};
```



```python
"""
以 线性 的方式 动态规划，考虑第 i 阶段/天 的状态，需要记录的参数有哪些：
第 i 天的 决策状态：
(j=0) 当前没有股票，且不处于冷冻期 （空仓）
(j=1) 当前有股票 （持仓）
(j=2) 当前没有股票，且处于冷冻期 （冷冻期）

状态机模型：
如果第 i 天是 空仓 (j=0) 状态，则 i-1 天可能是 空仓 (j=0) 或 冷冻期 (j=1) 的状态
如果第 i 天是 冷冻期 (j=2) 状态，则 i-1 天只可能是 持仓 (j=1) 状态 （卖出）
如果第 i 天是 持仓 (j=1) 状态，则 i-1 天可能是 持仓 (j=1) 状态 或 空仓 (j=0) 的状态 （买入）

状态表示f[i,j]—属性: 考虑前 i 天股市，当前第 i 天的状态是 j 的方案；方案的总利润 最大Max

入口：一开始是第0天，并且一定是处于可以买票的状态的，所以：f[0][2]=0；其他状态全部负无穷
出口： 最后一天票子留在手里肯定是不合算的：最后一天要么是我刚刚卖出去，要么是我处于冷冻期中（或出了冷冻期）
所以答案应该是在f[n][0]f[n][0]和f[n][2]f[n][2]中选，即 ans = max(f[n][0],f[n][2]);
"""

class Solution:
    def maxProfit(self, w: List[int]) -> int:
        n = len(w)
        f = [[float('-inf')] * 3 for _ in range(n + 1)]
        f[0][2] = 0  # 初始化，入口很重要

        for i in range(1, n + 1):
            f[i][0] = max(f[i-1][0], f[i-1][2] - w[i-1])
            f[i][1] = f[i-1][0] + w[i-1]
            f[i][2] = max(f[i-1][1], f[i-1][2]) 
        return max(f[n][1], f[n][2])
        # 2的状态可以由1转移过来，不会增加w值；但存在极端情况，如数列递减，这时不交易才是最大收益，就是f[n][2]，所以出口需要加上f[n][2]
```

