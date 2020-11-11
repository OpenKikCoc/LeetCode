#  [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        int has = INT_MIN, no = 0;
        for(int i = 0; i < n; ++i) {
            int a = has, b = no;
            has = max(a, -prices[i]);
            no = max(b, a+prices[i]);
        }
        return no;
    }
};
```



```python3

```

