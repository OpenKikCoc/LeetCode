#  [63. 不同路径 II](https://leetcode-cn.com/problems/unique-paths-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        if(!m) return 0;
        int n = obstacleGrid[0].size();
        vector<int> f(n+1);
        bool can = true;
        for(int i = 1; i <= n; ++i) {
            if(!can) f[i] = 0;
            else if(obstacleGrid[0][i-1] == 1) can = false, f[i] = false;
            else f[i] = true;
        }
        for(int i = 2; i <= m; ++i)
            for(int j = 1; j <= n; ++j)
                if(obstacleGrid[i-1][j-1] == 1) f[j] = 0;
                else f[j] = f[j] + f[j-1]; 
        return f[n];
    }
};
```



```python3

```

