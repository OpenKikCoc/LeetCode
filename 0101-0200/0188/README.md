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
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        n=len(prices)
        if k>=n//2:
            res=0;i=0
            for i in range(1,n):
                res+=max(prices[i]-prices[i-1],0)
            return res
        f=[[float('-inf')]*(k+1) for i in range(n+1)]
        g=[[float('-inf')]*(k+1) for i in range(n+1)]
        #初始化，除了这个状态为0，其他都为-inf, 包括g[0][0]=float('-inf')
        f[0][0]=0
        res=0
        for i in range(1,n+1):
            #j要从0开始，因为j=0时 有意义：交易次数为0
            for j in range(k+1):
                f[i][j]=max(f[i-1][j],g[i-1][j]+prices[i-1])
                g[i][j]=g[i-1][j]
                if j:
                    g[i][j]=max(g[i][j],f[i-1][j-1]-prices[i-1])
                res=max(res,f[i][j])
        return res
```

