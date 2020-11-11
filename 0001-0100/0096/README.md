#  [96. 不同的二叉搜索树](https://leetcode-cn.com/problems/unique-binary-search-trees/)

## 题意



## 题解



```c++
class Solution {
public:
    int numTrees(int n) {
        long c = 1;
        // 卡特兰数
        for(int i = 0; i < n; i++)
            c = c * 2 * (2 * i  + 1) /(i + 2);
        return c;
    }
  
    int numTrees(int n) {
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        dp[1] = 1;
        
        for(int i = 2; i <= n; i++)         // i 为长度
            for(int j = 1; j <= i; j++)     // 以 j 为根
                dp[i] += dp[j - 1] * dp[i - j];
        return dp[n];
    }
  
    // 0s 100%, 6.4MB 100%
    int numTrees(int n) {
        vector<vector<int>> dp(n, vector<int>(n));
        for(int i = 0; i < n; ++i) dp[i][i] = 1;
        // 区间dp 
        for(int i = n-1; i >= 0; --i) {
            for(int j = i+1; j < n; ++j) {
                // i ~ j 可以组成多少个二叉搜索树
                // 以 k 为根
                for(int k = i; k <= j; ++k) {
                    dp[i][j] += (k>i ? dp[i][k-1]:1) * (k<j ? dp[k+1][j]:1);
                }

            }
        }
        return dp[0][n-1];
    }
};
```



```python3

```

