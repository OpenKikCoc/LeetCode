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



```python3

```

