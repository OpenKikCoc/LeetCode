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



```python3

```

