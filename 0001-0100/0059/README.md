#  [59. 螺旋矩阵 II](https://leetcode-cn.com/problems/spiral-matrix-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> res(n, vector<int>(n));
        int u = 0, d = n-1, l = 0, r = n-1;
        int p = 0;
        for(;;) {
            for(int i = l; i <= r; ++i) res[u][i] = ++p;
            if(++u > d) break;
            for(int i = u; i <= d; ++i) res[i][r] = ++p;
            if(--r < l) break;
            for(int i = r; i >= l; --i) res[d][i] = ++p;
            if(--d < u) break;
            for(int i = d; i >= u; --i) res[i][l] = ++p;
            if(++l > r) break;
        }
        return res;
    }
};
```



```python3

```

