#  [59. 螺旋矩阵 II](https://leetcode-cn.com/problems/spiral-matrix-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> res(n, vector<int>(n));
        int u = 0, d = n - 1, l = 0, r = n - 1;
        int p = 0;
        for (;;) {
            for (int i = l; i <= r; ++ i ) res[u][i] = ++ p ;
            if ( ++ u > d) break;
            for (int i = u; i <= d; ++ i ) res[i][r] = ++ p ;
            if ( -- r < l) break;
            for (int i = r; i >= l; -- i ) res[d][i] = ++ p ;
            if ( -- d < u) break;
            for (int i = d; i >= u; -- i ) res[i][l] = ++ p ;
            if ( ++ l > r) break;
        }
        return res;
    }
};
```



```python
# 和上一道题完全一样
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        L, R, T, B = 0, n-1, 0, n-1
        p = 0 
        res = [[0] * n for _ in range(n)]
        while True:
            for i in range(L, R + 1):
                p += 1
                res[T][i] = p
            T += 1 
            if T > B:break 
            for i in range(T, B + 1):
                p += 1
                res[i][R] = p 
            R -= 1
            if L > R:break 
            for i in range(R, L - 1, -1):
                p += 1
                res[B][i] = p
            B -= 1
            if T > B:break 
            for i in range(B, T - 1, -1):
                p += 1
                res[i][L] = p
            L += 1
            if L > R:break 
        return res 
```

