#  [304. 二维区域和检索 - 矩阵不可变](https://leetcode-cn.com/problems/range-sum-query-2d-immutable/)

## 题意



## 题解



```c++
class NumMatrix {
    vector<vector<int>> psum;
public:
    NumMatrix(vector<vector<int>>& matrix) {
        int m = matrix.size();
        if(!m) return;
        int n = matrix[0].size();
        psum = vector<vector<int>>(m+1, vector<int>(n+1, 0));
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j)
                psum[i+1][j+1] = psum[i][j+1] + psum[i+1][j] - psum[i][j] + matrix[i][j];
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        return psum[row2+1][col2+1] + psum[row1][col1] - psum[row2+1][col1] - psum[row1][col2+1];
    }
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * NumMatrix* obj = new NumMatrix(matrix);
 * int param_1 = obj->sumRegion(row1,col1,row2,col2);
 */
```



```python3

```

