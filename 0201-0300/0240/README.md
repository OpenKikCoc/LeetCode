#  [240. 搜索二维矩阵 II](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if(matrix.empty()) return false;
        int m = matrix.size(), n = matrix[0].size();
        int u = 0, r = n-1;
        while(u < m && r >= 0) {
            if(matrix[u][r] == target) return true;
            else if (matrix[u][r] > target) --r;
            else ++u;
        }
        return false;
    }
};
```



```python3

```

