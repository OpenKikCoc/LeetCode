#  [518. 零钱兑换 II](https://leetcode-cn.com/problems/coin-change-2/)

## 题意



## 题解



```c++
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<int> f(amount+1);
        f[0] = 1;
        for(int i = 1; i <= n; ++i)
            for(int j = coins[i-1]; j <= amount; ++j)
                f[j] = f[j] + f[j-coins[i-1]];
        return f[amount];
    }
};
```



```python3

```

