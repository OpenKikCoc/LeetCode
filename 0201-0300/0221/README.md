#  [221. 最大正方形](https://leetcode-cn.com/problems/maximal-square/)

## 题意



## 题解



```c++
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size();
        if(!m) return 0;
        int n = matrix[0].size();
        vector<vector<int>> dp(m+1, vector<int>(n+1));
        int res = 0;
        for(int i = 1; i <= m; ++i) {
            for(int j = 1; j <= n; ++j) {
                if(matrix[i-1][j-1] == '1') {
                    dp[i][j] = min(min(dp[i-1][j], dp[i][j-1]), dp[i-1][j-1])+1;
                    res = max(res, dp[i][j]);
                }
            }
        }
        return res*res;
    }
};
```



```python3

```

