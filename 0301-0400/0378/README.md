#  [378. 有序矩阵中第K小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/)

## 题意



## 题解


```c++
// yxc
class Solution {
public:
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int l = INT_MIN, r = INT_MAX;
        while (l < r) {
            int mid = (long long)l + r >> 1;
            int i = matrix[0].size() - 1, cnt = 0;
            for (int j = 0; j < matrix.size(); j ++ ) {
                while (i >= 0 && matrix[j][i] > mid) i -- ;
                cnt += i + 1;
            }
            if (cnt >= k) r = mid;
            else l = mid + 1;
        }
        return r;
    }
};
```


```c++
class Solution {
public:
    bool check(vector<vector<int>>& mat, int m, int k, int n) {
        int i = n-1, j = 0;
        int cnt = 0;
        while (i >= 0 && j < n) {
            if (mat[i][j] <= m)
                cnt += i + 1, ++ j ;
            else
                -- i ;
        }
        return cnt >= k;
    }
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int n = matrix.size();
        int l = matrix[0][0], r = matrix[n - 1][n - 1];
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (check(matrix, mid, k, n)) {
                // 个数大于等于k
                r = mid;
            } else
                l = mid + 1;   // 个数小于k
        }
        return l;
    }
};
```



```python3

```

