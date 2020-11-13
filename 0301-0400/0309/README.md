#  [309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        int hs = INT_MIN, no = 0, mm = 0;
        for(int i = 0; i < n; ++i) {
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



```python3

```

