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



```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        min_v = float("+inf")
        res = 0  # 如果发现交易就会赔本，可以不卖卖，就是获利是0 （所以初始化为0）
        for i in range(n):
            res = max(res, prices[i] - min_v)
          	min_v = min(min_v, prices[i]) 
        return res
```

