#  [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if(k > n/2) {
            int res = 0;
            for(int i = 0; i < n-1; ++i)
                res += max(0, prices[i+1] - prices[i]);
            return res;
        }
        vector<int> hs(k+1, INT_MIN), no(k+1);
        for(int i = 1; i <= n; ++i)
            for(int c = 1; c <= k; ++c) {
                // hs[i][c] = max(hs[i-1][c], no[i-1][c-1] - prices[i-1]);
                // no[i][c] = max(no[i-1][c], hs[i-1][c] + prices[i-1]);
                no[c] = max(no[c], hs[c] + prices[i-1]);
                hs[c] = max(hs[c], no[c-1] - prices[i-1]);
            }
        return no[k];
    }
};
```



```python3

```

