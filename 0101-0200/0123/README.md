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



```python
# 可以用dp来写；这里写另外一种思路，叫：！！！前后缀分解 （枚举两次交易的分界点）==> 涉及到分两次买入的情况都可以用这种思路 ： 可以枚举第二次交易的买入时间，比如是第i次交易买入的。（如何求这一类方案的最值呢？）
# f[i]: 在第1-i天 进行买卖一次的最大收益值（可以分为：1. 在第i天卖出；2.不在第i天卖出）
# 总收益就转换为：第一次交易是在前i-1天内完成的,可以表示成f[i-1]；第二次交易是在第i天买入，后面再卖出，最大收益是：第i天之后股票的最大值减去第i天的价格。
# 枚举完分界点后，就可以把一个问题分解成 两个独立的子问题；（搜Acwing--前后缀分解，会出来相关题型）

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        f = [0] * (n + 1)

        minv = float('inf')
        for i in range(1, n + 1):   #f从1开始，f[i]对应的是prices[i-1]
            f[i] = max(f[i-1], prices[i-1] - minv)
            minv = min(minv, prices[i-1])
        
        maxv = float('-inf')
        res = 0
        for i in range(n, 0, -1):
            res = max(res, maxv - prices[i-1] + f[i-1]) 
            maxv = max(maxv, prices[i-1])
        return res      
```

