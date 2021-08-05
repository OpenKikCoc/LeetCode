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



```python
# 所有的交易 都没有交集。
# 遍历一次数组，低进高出，把正的价格差相加起来就是最终利润。
# 比如：[1,2,3]：在1买入，3卖出  等价于  每天都进行买入卖出。
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        res = 0  # 不做交易，不赔不赚。
        for i in range(1, n):
            res += max(0, prices[i] - prices[i-1])
        return res
```

