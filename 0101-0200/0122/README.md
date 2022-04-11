#  [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int has = INT_MIN, no = 0;
        for (auto & c : prices) {
            int nhas = max(has, no - c);
            int nno = max(has + c, no);
            has = nhas, no = nno;
        }
        return max(has, no);
    }
};

// trick
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int res = 0;
        for (int i = 0; i + 1 < prices.size(); i ++ )
            res += max(0, prices[i + 1] - prices[i]);
        return res;
    }
};
```



**思路1**

> **贪心的思想：**
>
> 1. 考虑相邻两天的股票价格，如果后一天的股票价格大于前一天的，那么在进行买卖操作后，肯定可以获得利润
>
> 2. 在不需要考虑交易次数的情况下，那么只要利润是正的，就进行交易，这样可以获得最大的利润
>
> 3. 直接循环判断前后两天的价格，差价为正，就进行买卖即可。
>
>    比如：[1,2,3]：在1买入，3卖出等价于每天都进行买入卖出的利润等价。
>
> ------
>
> **状态机模型1：**
>
> 1. 状态表示：$f[i, 0]$ 表示在第i天并且手里没有股票的最大利润；$f[i, 1]$ 表示在第i天并且手里有股票的最大利润
>
> 2. 状态转移：
>
>    $f[i, 0] = max(f[i-1,0], f[i-1,1]+w[i])$ 
>
>    $f[i, 1] = max(f[i-1,1], f[i-1,0]-w[i])$ 
>
> 3. 初始化：$f[0, 0]=1$: 第0天手里没有股票是合法的，利润是0；其他情况都不是合法的都初始化为负无穷
>
>    返回的结果是 $f[n, 0]$, 最后手上没有股票的时候利润肯定是最大的
>
> ------
>
> **状态机模型2**
>
> 交易过程中关注以下两种状态的最大值：
>
> 1. bought: 买入(后)的状态，此时手上有货
> 2. sold: 卖出（后）的状态，此时手上无货
>
> - 答案是，无数次交易后最终卖出，也就是手上无货sold的最大值

```python
# 贪心
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        res = 0
        for i in range(1, len(prices)):
            res += max(0, prices[i] - prices[i - 1])
        return res
```



```python
# 状态机1
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        f = [[float('-inf')] * 2 for _ in range(n + 1)]
        f[0][0] = 0 
        for i in range(1, n + 1):
            f[i][0] = max(f[i - 1][0], f[i - 1][1] + prices[i - 1])
            f[i][1] = max(f[i - 1][1], f[i - 1][0] - prices[i - 1])
        return f[n][0]
```



```python
# 状态机dp2
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        bought, sold = float("-inf"), 0

        for x in prices:
            bought = max(bought, sold - x)
            sold = max(sold, bought + x)

        return sold
```

