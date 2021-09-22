#  [48. 旋转图像](https://leetcode-cn.com/problems/rotate-image/)

## 题意



## 题解

```c++
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < i; j ++ )
                swap(matrix[i][j], matrix[j][i]);

        for (int i = 0; i < n; i ++ )
            for (int j = 0, k = n - 1; j < k; j ++, k -- )
                swap(matrix[i][j], matrix[i][k]);
    }
};
```



```c++
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        int x1, y1, x2, y2, x3, y3, x4, y4, tmp;
        for (int i = 0; i < n / 2; ++ i ) {
            for (int j = i; j < n - i - 1; ++ j ) {
                x1 = i, y1 = j;
                x2 = j, y2 = n - i - 1;
                x3 = n - i - 1, y3 = n - j - 1;
                x4 = n - j - 1, y4 = i;
                tmp = matrix[x1][y1];
                matrix[x1][y1] = matrix[x4][y4];
                matrix[x4][y4] = matrix[x3][y3];
                matrix[x3][y3] = matrix[x2][y2];
                matrix[x2][y2] = tmp;
            }
        }
    }
};
```



```python
# 模拟 找规律题(直接操作旋转90度比较苦难，分为以下两个步骤)
# 1. 先以 左上-右下对焦条线为轴做翻转
# 2. 再以 中心的竖线为轴做翻转 即可。

class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)
        for i in range(n):
            for j in range(n):
                if i < j:
                    matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j] 
        for row in matrix:
            row.reverse()
            
"""
一次遍历，找规律：有四个数一起变化
"""

class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)
        for i in range(n // 2):
            for j in range(i, n - i - 1):
                x1, y1 = i, j
                x2, y2 = j, n - i - 1
                x3, y3 = n - i - 1, n - j - 1
                x4, y4 = n - j - 1, i 
                matrix[x1][y1], matrix[x2][y2], matrix[x3][y3], matrix[x4][y4] = matrix[x4][y4], matrix[x1][y1], matrix[x2][y2], matrix[x3][y3]
```

