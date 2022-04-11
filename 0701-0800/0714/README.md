#  [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        vector<int> fin(n + 1, INT_MIN / 2), fout(n + 1, 0);
        for (int i = 1; i <= n; ++ i ) {
            fin[i] = max(fin[i - 1], fout[i - 1] - prices[i - 1]);
            fout[i] = max(fout[i - 1], fin[i - 1] + prices[i - 1] - fee);
        }
        return fout[n];
    }
};
```



**思路**

> **状态机模型1**
>
> 1. 状态表示：$f[i, j]$ 考虑前 $i$ 天股市，当前第 $i$ 天的状态是 $j$ 的方案；属性：最大总利润
>
>    1） $j=0$：表示当前手上没有股票，空仓状态
>
>    2） $j=1$：表示当前手上有股票，持仓状态
>
> 2. 状态转移：
>
>    1） $f[i, 0]$ : 当第 $i$ 天是空仓状态，那它可以由 $i-1$ 天是空仓状态（保持不变）或持仓状态（卖股票）转移过来
>
>    2） $f[i, 1]$:  当第 $i$ 天是持仓状态，那它可以由 $i-1$ 天是空仓状态（买入股票）或持仓状态（保持不变）转移过来
>
> 3. 初始化
>
>    $f[0,0] = 0$ ; $f[0,1] = -prices[0]$
>
>    最后返回 $max(f[n])$ （其实只需要求所有空仓状态的最大值）
>
> ------
>
> **状态机模型1**
>
> 分别维护以下三种状态的最大值:
>
> 1. bought: 买入(后)的状态
>
> 2. sold: 卖出（后）的状态；卖出在更新时加入交易费用即可
>
> - 答案是最终卖出最大值



```python
# 状态机dp1
class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        n = len(prices)
        f = [[float('-inf')] * 2 for _ in range(n + 1)]
        f[0][0], f[0][1] = 0, -prices[0]

        res = 0
        for i in range(1, n + 1):
            f[i][0] = max(f[i - 1][0], f[i - 1][1] + prices[i - 1] - fee)
            f[i][1] = max(f[i - 1][1], f[i - 1][0] - prices[i - 1])
            res = max(res, f[i][0])
        return res
```



```python
# 状态机dp2

class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        bought, sold = -prices[0], 0
        for x in prices:
            bought, sold = max(bought, sold - x), max(sold, bought + x - fee)
        return sold
```

