#  [74. 搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix/)

## 题意



## 题解



```c++
class Solution {
public:
    // 根据题目 【每行的第一个整数大于前一行的最后一个整数】可以直接一维二分
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        int n = matrix.size(), m = matrix[0].size();

        int l = 0, r = n * m - 1;
        while (l < r) {
            int mid = l + r >> 1;
            if (matrix[mid / m][mid % m] >= target) r = mid;
            else l = mid + 1;
        }

        return matrix[r / m][r % m] == target;
    }
};

    bool searchMatrix2(vector<vector<int>>& matrix, int target) {
        int m = matrix.size();
        if (!m) return false;
        int n = matrix[0].size();
        int u = 0, r = n - 1;
        while (u < m && r >= 0) {
            if (matrix[u][r] == target) return true;
            else if (matrix[u][r] < target) ++ u ;
            else -- r ;
        }
        return false;
    }
};
```



```python
class Solution:
    def searchMatrix(self, arr: List[List[int]], target: int) -> bool:
        if not arr:return False
        n, m = len(arr), len(arr[0])
        i, j = 0, m - 1 
        while i < n and j >= 0:
            if arr[i][j] == target:
                return True 
            elif arr[i][j] > target:
                j -= 1
            else:i += 1 
        return False
```

