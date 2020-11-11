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
        for(int i = 1; i <= n; ++i) {
            fstSell = max(fstSell, fstBuy + prices[i-1]);
            fstBuy = max(fstBuy, -prices[i-1]);
            secSell = max(secSell, secBuy + prices[i-1]);
            secBuy = max(secBuy, fstSell - prices[i-1]);
        }
        return secSell;
    }
};
```



```python3

```

