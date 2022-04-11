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



**思路**

> **状态机模型1**
>
> 1. 状态表示：$f[i,j]$：考虑前 $i$ 天股市，当前第 $i$ 天的状态是 $j$ 的方案；属性：最大总利润
>
>    1） $j=0$：表示当前没有股票，且不处于冷冻期 （空仓）
>
>    2） $j=1$：表示当前有股票 （持仓）
>
>    3） $j=2$：表示当前没有股票，且处于冷冻期 （冷冻期）
>
> 2. 状态转移：
>
>    1）$f[i,0]$: 当第 $i$ 天是空仓状态，那它可以由 $i-1$ 天是空仓状态（保持不变）或冷冻期状态（保持不变）转移过来
>
>    2）$f[i,1]$: 当第 $i$ 天是持仓状态，那它可以由 $i-1$ 天是持仓状态（保持不变）或空仓的状态（第 $i$ 天买入）转移过来3）$f[i,2]$: 当第 $i$ 天是冷冻期状态，那它只能由 $i-1$ 天是持仓状态（第 $i$ 天卖出）转移过来
>
> 3. 初始化：一开始是第0天，并且一定是可以买入股票，也就是：
>
>    $f[0,0]=0$；$f[0, 1]=-prices[0]$
>    最后结果： 最后一天股票留在手里肯定是不合算的，所以最后一天要么是刚刚卖出去，要么是处于冷冻期中（或出了冷冻期）
>    所以答案是： $ans = max(f[n, 0],f[n, 2])$
>
> ------
>
> **状态机模型2**
>
> 分别维护以下三种状态的最大值:
>
> 1. bought: 买入(后)的状态
>
> 2. sold: 卖出（后）的状态
>
> 3. sold: 冷冻期状态 
>
> - 答案由最终卖出和冷冻期的最大值组成



```python
# 状态机dp1

class Solution:
    def maxProfit(self, w: List[int]) -> int:
        n = len(w)
        f = [[float('-inf')] * 3 for _ in range(n + 1)]
        f[0][0] = 0  # 初始化，入口很重要
        f[0][1] = -w[0]

        for i in range(1, n + 1):
            f[i][0] = max(f[i - 1][0], f[i - 1][2])
            f[i][1] = max(f[i - 1][1], f[i - 1][0] - w[i - 1])
            f[i][2] = f[i - 1][1] + w[i - 1]
        # return max(f[n])
        return max(f[n][0], f[n][2])
      
```



```python
# 状态机dp2

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        bought, sold, cold = -prices[0], 0, 0
        for x in prices:
            bought, sold, cold = max(bought, cold - x), max(sold, bought + x), max(sold, cold)
        return max(sold, cold)
```

