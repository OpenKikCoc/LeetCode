#  [120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle/)

## 题意



## 题解



```c++
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        if (!n) return 0;
        vector<int> f(n + 1);
        for (int i = n - 1; i >= 0; -- i )
            for (int j = 0; j <= i; ++ j )
                f[j] = min(f[j], f[j + 1]) + triangle[i][j];
        return f[0];
    }
};
```



```python
# 数字三角dp ： 自顶向下
class Solution:
    def minimumTotal(self, nums: List[List[int]]) -> int:
        n = len(nums)
        f = [[float('inf')] * (n + 1) for _ in range(n + 1)]
        f[1][1] = nums[0][0]
        for i in range(2, n + 1):
            for j in range(1, i + 1):
                f[i][j] = min(f[i-1][j-1], f[i-1][j]) + nums[i-1][j-1]
        res = float('inf')
        for i in range(1, n + 1):
            res = min(res, f[n][i])
        return res

      
# 自底向上
class Solution:
    def minimumTotal(self, nums: List[List[int]]) -> int:
        n = len(nums)
        f = [[0] * (n + 1) for _ in range(n + 1)]  # 注意：这里要初始化为0
        for i in range(n-1, -1, -1):
            for j in range(i + 1):
                f[i][j] = min(f[i+1][j], f[i+1][j+1]) + nums[i][j]
        return f[0][0]
```

