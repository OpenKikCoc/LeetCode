#  [52. N皇后 II](https://leetcode.cn/problems/n-queens-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int n;
    vector<bool> col, dg, udg;

    int totalNQueens(int _n) {
        n = _n;
        col = vector<bool>(n);
        dg = udg = vector<bool>(2 * n);
        return dfs(0);
    }

    int dfs(int u) {
        if (u == n) return 1;
        int res = 0;
        for (int i = 0; i < n; i ++ ) {
            if (!col[i] && !dg[u - i + n] && !udg[u + i]) {
                col[i] = dg[u - i + n] = udg[u + i] = true;
                res += dfs(u + 1);
                col[i] = dg[u - i + n] = udg[u + i] = false;
            }
        }

        return res;
    }
};
```



```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        self.res = 0
        path = [['.'] * n for _ in range(n)]
        col = [False] * n 
        dg = [False] * 2 * n 
        udg = [False] * 2 * n 

        def dfs(u):
            if u == n:
                self.res += 1
            for i in range(n):
                if not col[i] and not dg[u-i+n] and not udg[u+i]:
                    path[u][i] = 'Q'
                    col[i] = dg[u-i+n] = udg[u+i] = True 
                    dfs(u + 1)
                    path[u][i] = '.'
                    col[i] = dg[u-i+n] = udg[u+i] = False

        dfs(0)
        return self.res
```

