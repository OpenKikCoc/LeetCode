#  [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

## 题意



## 题解



```c++
class Solution {
public:
    const int inf = 0x3f3f3f3f;
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        vector<int> f(amount+1, inf);
        f[0] = 0;
        for(int i = 1; i <= n; ++i)
            for(int j = coins[i-1]; j <= amount; ++j)
                f[j] = min(f[j], f[j-coins[i-1]]+1);
        return f[amount] < inf/2 ? f[amount] : -1;
    }
};
```



```python3

```

