#  [64. 最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)

## 题意



## 题解



```c++
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        if(!m) return 0;
        int n = grid[0].size();
        vector<int> f(n+1);
        for(int i = 1; i <= n; ++i) f[i] = grid[0][i-1] + f[i-1];
        for(int i = 2; i <= m; ++i)
            for(int j = 1; j <= n; ++j)
                f[j] = min(f[j], j > 1 ? f[j-1] : INT_MAX) + grid[i-1][j-1];
        return f[n];
    }
};
```



```python3

```

