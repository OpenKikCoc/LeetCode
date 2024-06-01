#  [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        int fstSell = 0, secSell = 0;
        int fstBuy = INT_MIN, secBuy = INT_MIN;
        for (int i = 1; i <= n; ++ i ) {
            fstSell = max(fstSell, fstBuy + prices[i - 1]);
            fstBuy = max(fstBuy, -prices[i - 1]);
            secSell = max(secSell, secBuy + prices[i - 1]);
            secBuy = max(secBuy, fstSell - prices[i - 1]);
        }
        return secSell;
    }
};

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<int> f(n + 2);
        for (int i = 1, minp = INT_MAX; i <= n; i ++ ) {
            f[i] = max(f[i - 1], prices[i - 1] - minp);
            minp = min(minp, prices[i - 1]);
        }

        int res = 0;
        for (int i = n, maxp = 0; i; i -- ) {
            res = max(res, maxp - prices[i - 1] + f[i - 1]);
            maxp = max(maxp, prices[i - 1]);
        }

        return res;
    }
};
```



**思路**

> **前后缀分解思想**：
>
> 枚举两次交易的分界点 （涉及到分两次买入的情况都可以用这种思路），假设枚举第二次交易的买入时间为第$i$天，就可以把一个问题分解成两个独立的子问题；
>
> 1） 前$i$天交易一次的最大收益
>
> 2） 在第$i$天买入，后面再卖出的一次交易的最大收益
>
> 1. 枚举第一次交易：遍历数组，从前向后扫描，用$f[i]$记录前$i$天中只买卖一次的最大收益（不一定在第$i$天卖）
>
> 2. 枚举第二次交易：遍历数组，从后向前扫描，计算只买卖一次并且在第$i$天买入的最大收益。最大收益等于第$i$天之后股票的最大价格减去第i天的价格；
>
>    在此基础上再加上$f[i-1]$，就是两第二次交易在第$i$天买入，两次交易的总收益最大值。
>
> 3. 枚举过程中，维护总收益的最大值。
>
> ------
>
> **状态机dp**：
>
> 分别维护以下三种状态的最大值:
>
> fstBought: 第一次买入(后)的状态； fstSold：第一次卖出（后）的状态
>
> secBought: 第二次买入(后)的状态； secSold：第二次卖出（后）的状态
>
> 答案是第二次卖出后的状态的最大值

```python
# 前后缀分解
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        f = [0] * (n + 1)

        minv = float('inf')
        for i in range(1, n + 1):  
            f[i] = max(f[i - 1], prices[i - 1] - minv)
            minv = min(minv, re)

        maxv = float('-inf')
        m
        for i in range(n, 0, -1):
            res = max(res, maxv - prices[i - 1] + f[i - 1])
            maxv = max(maxv, prices[i - 1])
        return res

```

```python
# 状态机dp
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        fstSold, secSold = 0, 0 
        fstBought, secBought = -prices[0], -prices[0]
        for i in range(1, n + 1):
            fstSold = max(fstSold, fstBought + prices[i - 1])
            fstBought = max(fstBought, - prices[i - 1])
            secSold = max(secSold, secBought + prices[i - 1])
            secBought = max(secBought, fstSold - prices[i - 1])
        return secSold
```

