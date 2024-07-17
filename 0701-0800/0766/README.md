#  [766. 托普利茨矩阵](https://leetcode.cn/problems/toeplitz-matrix/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isToeplitzMatrix(vector<vector<int>>& matrix) {
        for (int i = 1; i < matrix.size(); i ++ )
            for (int j = 1; j < matrix[i].size(); j ++ )
                if (matrix[i][j] != matrix[i - 1][j - 1])
                    return false;
        return true;
    }
};
```



```python3

```

