#  [221. 最大正方形](https://leetcode-cn.com/problems/maximal-square/)

## 题意



## 题解



```c++
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        int n = matrix.size(), m = matrix[0].size();
        vector<vector<int>> f(n + 1, vector<int>(m + 1));

        int res = 0;
        for (int i = 1; i <= n; i ++ )
            for (int j = 1; j <= m; j ++ )
                if (matrix[i - 1][j - 1] == '1') {
                    f[i][j] = min(f[i - 1][j], min(f[i][j - 1], f[i - 1][j - 1])) + 1;
                    res = max(res, f[i][j]);
                }

        return res * res;
    }
};
```



```python
"""
f[i, j]表示：所有以(i,j)为右下角的且只包含 1`` 的正方形的边长最大值

状态计算
如果该位置的值是 0，则 f[i, j] = 0，因为当前位置不可能在由 1 组成的正方形中
如果该位置的值是 1，则 f[i, j]的值由其上方、左方和左上方的三个相邻位置的状态值决定。具体而言，当前位置的元素值等于三个相邻位置的元素中的最小值加 1，状态转移方程如下：

f[i,j]=min(f[i−1,j−1],f[i−1,j],f[i,j−1])+1

为什么要三者取最小+1 ？
有个题解解释得也很清楚，继续搬运

若形成正方形（非单 1），以当前为右下角的视角看，则需要：当前格、上、左、左上都是 1
可以换个角度：当前格、上、左、左上都不能受 0 的限制，才能成为正方形

"""

class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        if not matrix or not matrix[0]:
            return 0
        n = len(matrix)
        m = len(matrix[0])
        f = [[0] * (m + 1) for i in range(n + 1)]

        res = 0
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if matrix[i - 1][j - 1] == '1':
                    f[i][j] = min(f[i - 1][j], f[i][j - 1], f[i - 1][j - 1]) + 1
                    res = max(res, f[i][j])
        return res * res
```

