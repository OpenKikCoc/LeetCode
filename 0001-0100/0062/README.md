#  [62. 不同路径](https://leetcode-cn.com/problems/unique-paths/)

## 题意



## 题解



```c++
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n+1);
        for(int i = 1; i <= n; ++i) dp[i] = 1;
        for(int i = 2; i <= m; ++i)
            for(int j = 1; j <= n; ++j)
                dp[j] = dp[j-1] + dp[j];
        return dp[n];
    }
};

// 组合数学
class Solution {
public:
    int uniquePaths(int m, int n) {  
        int totalStep = m + n - 2;
        int step = max(m , n);
        long long res = 1;
        for(int i = step; i <= totalStep; i++)
            res *= i;
        for(int i = 1; i <= totalStep - step + 1; i++)
            res /= i;
        return (int)res;
    }  
};
```



```python3

```

