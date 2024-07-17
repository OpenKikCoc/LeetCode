#  [188. 买卖股票的最佳时机 IV](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if (k > n / 2) {
            int res = 0;
            for (int i = 0; i < n - 1; ++ i )
                res += max(0, prices[i + 1] - prices[i]);
            return res;
        }
        vector<int> hs(k + 1, INT_MIN), no(k + 1);
        for (int i = 1; i <= n; ++ i )
            for (int c = 1; c <= k; ++ c ) {
                // hs[i][c] = max(hs[i-1][c], no[i-1][c-1] - prices[i-1]);
                // no[i][c] = max(no[i-1][c], hs[i-1][c] + prices[i-1]);
                no[c] = max(no[c], hs[c] + prices[i - 1]);
                hs[c] = max(hs[c], no[c - 1] - prices[i - 1]);
            }
        return no[k];
    }
};
```


```c++
// yxc
/*
LeetCode增强了本题的数据，非常卡常。

于是为了应对新数据，对视频中的代码做了如下优化：

1. 将vector换成了数组，大概会快50%。
2. 类似于背包问题优化空间，将原本的滚动二维数组，直接换成一维数组。
*/
int f[10001], g[10001];

class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int INF = 1e8;
        int n = prices.size();
        if (k > n / 2) {
            int res = 0;
            for (int i = 1; i < n; i ++ )
                if (prices[i] > prices[i - 1])
                    res += prices[i] - prices[i - 1];
            return res;
        }
        memset(f, -0x3f, sizeof f);
        memset(g, -0x3f, sizeof g);
        f[0] = 0;
        int res = 0;
        for (int i = 1; i <= n; i ++ )
            for (int j = k; j >= 0; j -- ) {
                g[j] = max(g[j], f[j] - prices[i - 1]);
                if (j) f[j] = max(f[j], g[j - 1] + prices[i - 1]);
            }
        for (int i = 1; i <= k; i ++ ) res = max(res, f[i]);
        return res;
    }
};
```



**思路**

> **状态机模型dp1**
>
> 1. 状态定义
>
>    $f[i, j, 0]$ : 前 $i$ 天，进行了 $j$ 次交易，并且手中无货的购买方式的集合
>
>    $f[i, j, 1]$ : 前 $i$ 天，进行了 $j$ 次交易，并且手中有货的购买方式的集合。
>
>    第一个状态：手中无货； ==> 1) 不买，继续无货；2）买入，转移到"手上有货"的状态
>
>    第二个状态：手中有货； ==> 1）持有，保持有货；2）卖出，转移到"手上无货"的状态
>
> 2. 状态转移
>
>    **这里定义买入行为会构成一笔交易（也就是【买入-卖出】是一个完成的交易）**
>
>    $f[i, j, 0]$ : 由第 $i - 1$ 天并且手中无货 $f[i - 1, j, 0]$（保持不变，交易数也不变）和第 $i - 1$ 天并且手上有货 $f[i - 1, j, 1]$ 卖出转移（由于手中有货卖出的是一笔交易的终点，所以这里还是处于第 $j$ 笔交易）
>
>    $f[i, j, 1]$ : 由第 $i - 1$ 天并且手中有货 $f[i - 1, j, 1]$（保持不变，交易数也不变）和第 $i - 1$ 天并且手上无货 $f[i - 1, j - 1, 0]$ 买入转移（由于要手中无货要买入的是一笔交易的起点，所以当处于第 $i-1$ 天时，交易数是 $j-1$ 笔）
>
> 3. 初始化
>
>    $f[i,0,0]$ 表示进行0次交易，手中无货的情况，收益就是0，表示这个状态合法，可以从这个状态转移过来；不合法的状态，就要初始化负无穷大。
>
>    最后的结果输出问题：最后一定是进行了若干次完整的交易，手中无货才是完整交易（买了不卖，不是最优解，买要花钱）
>
> ------
>
> **状态机模型dp2**
>
> 维护在 $k$ 次交易过程中，以下两种状态的最大值:
>
> 1. bought: 买入(后)的状态，此时手上有货
> 2. sold: 卖出（后）的状态，此时手上无货
>
> - 答案是在 $k$ 次交易过程中最终卖出，也就是手上无货sold的最大值

```python
# 状态机dp1

class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        n = len(prices)
        res = 0
        # 特判，如果k很大，就相当于可以进行无数次交易
        if k >= n // 2:
            for i in range(n - 1):
                if prices[i + 1] > prices[i]:
                    res += prices[i + 1] - prices[i]
            return res

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



```python
# 状态机dp2

class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        n = len(prices)
        res = 0
        # 特判，如果k很大，就相当于可以进行无数次交易
        if k >= n // 2:
            for i in range(n - 1):
                if prices[i + 1] > prices[i]:
                    res += prices[i + 1] - prices[i]
            return res

        bought = [float('-inf')] * (k + 1)
        sold = [0] * (k + 1)

        for x in prices:
            for i in range(1, k + 1):
                bought[i] = max(bought[i], sold[i - 1] - x)
                sold[i] = max(sold[i], bought[i] + x)
        return sold[k]
```

