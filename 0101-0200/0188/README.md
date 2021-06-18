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



```python
# 如何把交易状态描述清楚
# 第一个状态：手中有货； ==> 1）可以持有；2）卖出
# 第二个状态：手中没有货； ==> 1) 不买，就继续是没货；2）第二天买入，就是持有状态
# 状态转移的时候 是有权重的，+ w[i], - w[1]

# 状态表示：f[i, j, 0] : 前i天，已经做完j次交易，并且手中无货的购买方式的集合
#           f[i, j, 1] : 前i天，已经做完前j-1次交易，并且正在进行第j次交易，并且手中有货的购买方式的集合 ！ 注意：这里是正在进行第j次交易
# 状态机的状态表示，实质上是把i的状态进行了，方便后续状态计算； 属性：最大值
# 状态计算：就是状态机的转移

# 注意：
# 1. 初始化的问题：f[i,0,0]表示进行0次交易 手中无货的情况，那就是0，表示这个状态合法，可以从这个状态转移过来；状态不合法的时候，就要初始化无穷大
#    求最大，就初始化为负无穷；求最小，就初始化为最大，表示为：状态不合法，没办法从这个状态转移过来
# 2. 最后的结果输出问题：最后一定是进行了若干次完整的交易，手中无货才是完整交易（买了不卖，不是最优解，买要花钱）

class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        # 假如一共有n天，那最多买卖n/2次（因为买卖不能在同一天），因此如果k>n/2的话，可以直接k=n/2
        # 那就是可以交易无限次; 特判。
        n = len(prices)
        ans = 0 
        if k >= n // 2:
            for i in range(n - 1):
                if prices[i+1] > prices[i]:
                    ans += prices[i+1] - prices[i]
            return ans

        n = len(prices)
        N = 1010
        f = [[float('-inf')] * 2 for _ in range(n + 5)]
        f[0][0] = 0
        
        for i in range(1, n + 1):
            for j in range(1, k + 1):
                f[j][0] = max(f[j][0], f[j][1] + prices[i - 1])
                f[j][1] = max(f[j][1], f[j - 1][0] - prices[i - 1])
        res = 0
        for i in range(k + 1):
            res = max(res, f[i][0])
        return res
```

