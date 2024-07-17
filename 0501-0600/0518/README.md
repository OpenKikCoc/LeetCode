#  [518. 零钱兑换 II](https://leetcode.cn/problems/coin-change-2/)

## 题意



## 题解



```c++
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> f(amount + 1);
        f[0] = 1;
        for (auto x: coins)
            for (int i = x; i <= amount; i ++ )
                f[i] += f[i - x];
        return f[amount];
    }
};
```



```python3

```

