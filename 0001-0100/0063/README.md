#  [63. 不同路径 II](https://leetcode.cn/problems/unique-paths-ii/)

## 题意



## 题解

```c++
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& o) {
        int n = o.size();
        if (!n) return 0;
        int m = o[0].size();

        vector<vector<int>> f(n, vector<int>(m));
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ )
                if (!o[i][j]) {
                    if (!i && !j) f[i][j] = 1;
                    else {
                        if (i) f[i][j] += f[i - 1][j];
                        if (j) f[i][j] += f[i][j - 1];
                    }
                }

        return f[n - 1][m - 1];
    }
};
```



```c++
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        if (!m) return 0;
        int n = obstacleGrid[0].size();
        vector<int> f(n + 1);
        bool can = true;
        for (int i = 1; i <= n; ++ i ) {
            if (!can) f[i] = 0;
            else if (obstacleGrid[0][i - 1] == 1) can = false, f[i] = false;
            else f[i] = true;
        }
        for (int i = 2; i <= m; ++ i )
            for (int j = 1; j <= n; ++ j )
                if (obstacleGrid[i - 1][j - 1] == 1) f[j] = 0;
                else f[j] = f[j] + f[j - 1]; 
        return f[n];
    }
};
```



```python
# 上一道题 也可以用这种写法统一
class Solution:
    def uniquePathsWithObstacles(self, nums: List[List[int]]) -> int:
        n, m = len(nums), len(nums[0])
        f = [[0] * m for _ in range(n)]
        f[0][0] = 0 if nums[0][0] else 1

        for i in range(n):
            for j in range(m):
                if nums[i][j]:continue
                if i > 0:
                    f[i][j] += f[i-1][j]
                if j > 0:
                    f[i][j] += f[i][j-1]
        return f[n-1][m-1]
```

