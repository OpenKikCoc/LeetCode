#  [73. 矩阵置零](https://leetcode-cn.com/problems/set-matrix-zeroes/)

## 题意



## 题解



```c++
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        if(matrix.empty()) return;
        int m = matrix.size();
        int n = matrix[0].size();
        bool firstrow = false, firstcollumn = false;
        for(int i = 0; i < n; ++i) {
            if (matrix[0][i] == 0) firstrow = true;
        }
        for(int i = 0; i < m; ++i) {
            if (matrix[i][0] == 0) firstcollumn = true;
        }
        for(int i = 1; i < m; ++i) {
            for(int j = 1; j < n; ++j) {
                if(matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        for(int i = 1; i < m; ++i) {
            for(int j = 1; j < n; ++j) {
                if(matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
            }
        }
        if (firstrow) {
            for(int i = 0; i < n; ++i) matrix[0][i] = 0;
        }
        if (firstcollumn) {
            for(int i = 0; i < m; ++i) matrix[i][0] = 0;
        }
    }
};
```



```python
# 暴力循环，有重复计算；只需要统计出矩阵的每一行或者每一列是否有0
# 1. 用两个变量记录第一行和第一列是否有0
# 2. 遍历整个矩阵，用矩阵的第一行和第一列记录
# 3. 把含有0的行和列都置为0
class Solution:
    def setZeroes(self, arr: List[List[int]]) -> None:
        n, m = len(arr), len(arr[0])
        r0, c0 = 1, 1
        for i in range(n):
            if not arr[i][0]:c0 = 0
        for i in range(m):
            if not arr[0][i]:r0 = 0
        for i in range(1, n):
            for j in range(1, m):
                if not arr[i][j]:
                    arr[i][0] = 0
                    arr[0][j] = 0
        # 开始变换 0 ，遍历第1行 和 第1列暂存的数据            
        for i in range(1, n):
            if not arr[i][0]:
                for j in range(1, m):
                    arr[i][j] = 0 
        for i in range(1, m):
            if not arr[0][i]:
                for j in range(1, n):
                    arr[j][i] = 0 
        # 判断 存第一行 第一列的数据           
        if not r0:
            for i in range(m):
                arr[0][i] = 0 
        if not c0:
            for i in range(n):
                arr[i][0] =  0
```

