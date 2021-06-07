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



```python
# 统一写法：
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        f = [[0] * n for _ in range(m)]
       
        for i in range(n):
            for j in range(m):
              	if not i and not j:f[i][j] = 1
                else:
                		if i > 0:
                    		f[i][j] += f[i-1][j]
                		if j > 0:
                    		f[i][j] += f[i][j-1]
        return f[n-1][m-1]

class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        f = [[1] * n for _ in range(m)]
        for i in range(1, m):
            for j in range(1, n):
                f[i][j] = f[i-1][j] + f[i][j-1]
        return f[m-1][n-1]
      
# 优化为一维
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        f = [1] * n
        for i in range(1, m):
            for j in range(1, n):
                f[j] = f[j] + f[j-1]
        return f[n-1]
```

