#  [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        int has = INT_MIN, no = 0;
        for (int i = 0; i < n; ++ i ) {
            int a = has, b = no;
            has = max(a, -prices[i]);
            no = max(b, a + prices[i]);
        }
        return no;
    }
};

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int res = 0;
        for (int i = 0, minp = INT_MAX; i < prices.size(); i ++ ) {
            res = max(res, prices[i] - minp);
            minp = min(minp, prices[i]);
        }
        return res;
    }
};
```



**思路**

> **贪心思想**
>
> 1. 从左到右遍历每天的价格，如果以当天之前的最低价买入，以当天价格卖出，那么就得到了当天卖出的最大利润
> 2. 在每一天卖出的最大利润中更新最大利润值
>
> ------
>
> **状态机dp**
>
> 交易过程中关注以下两种状态的最大值：
>
> 1. bought: 买入(后)的状态，此时手上有货(只能交易一次，所以买入就会花钱，利润等于： $0 - prices[i]$)
> 2. sold: 卖出（后）的状态，此时手上无货
>
> - 答案是交易一次，最终卖出，也就是手上无货sold的最大值

```python
# 贪心
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        res = 0  # 如果发现交易就会赔本，可以不卖卖，就是获利是0 （所以初始化为0）
        minv = float('inf')
        for x in prices:
            minv = min(minv, x)
            res = max(res, x - minv)
        return res
```



```python
# 状态机dp
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        bought, sold = float("-inf"), 0

        for p in prices:
            bought = max(bought, 0 - p)
            sold = max(sold, bought + p)

        return sold
```

