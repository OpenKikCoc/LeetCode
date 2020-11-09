#  [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

## 题意



## 题解



```c++
class Solution {
public:
    int climbStairs(int n) {
        vector<int> dp(n+1);
        dp[0] = 1, dp[1] = 1;
        for(int i = 2; i <= n; ++i) dp[i] = dp[i-1] + dp[i-2];
        return dp[n];
    }
};
```



```python3

```

