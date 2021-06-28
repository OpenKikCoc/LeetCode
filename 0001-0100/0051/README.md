#  [51. N 皇后](https://leetcode-cn.com/problems/n-queens/)

## 题意



## 题解



```c++
class Solution {
public:
    int n;
    vector<vector<string>> res;
    bool check(vector<string>& b, int r, int c) {
        for(int i = 0; i < r; ++i) if(b[i][c] == 'Q') return false;
        for(int i = r-1, j = c-1; i >= 0 && j >= 0; --i, --j) if(b[i][j] == 'Q') return false;
        for(int i = r-1, j = c+1; i >= 0 && j < n; --i, ++j) if(b[i][j] == 'Q') return false;
        return true;
    }
    void dfs(vector<string>& b, int r) {
        if(r == n) {
            res.push_back(b);
            return;
        }
        for(int c = 0; c < n; ++c) if(check(b, r, c)) {
            b[r][c] = 'Q';
            dfs(b, r+1);
            b[r][c] = '.';
        }
    }
    vector<vector<string>> solveNQueens(int n) {
        this->n = n;
        vector<string> board(n, string(n, '.'));
        dfs(board, 0);
        return res;    
    }
};
```



```python
#全排列搜索的拓展：每次不仅要判断 列 有没有1，还要判断 对角线 有没有1
#由于每行只能有一个皇后，所以可以依次枚举每一行的皇后放到哪个位置。这样时间复杂度会从下降

class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        path = [["."]*n for i in range(n)]
        col = [False]*n 
        dg = [False]*2*n 
        udg = [False]*2*n 

        def dfs(u):
            if u == n:  #搜到最后一行的 下一个位置（行）
                res.append(["".join(path[i]) for i in range(n)])
                return
            
            for i in range(n):
                if not col[i] and not dg[u-i+n] and not udg[u+i]:
                    path[u][i] = "Q"
                    col[i] = dg[u-i+n] = udg[u+i] = True
                    dfs(u + 1)
                    path[u][i] = "."
                    col[i] = dg[u-i+n] = udg[u+i] = False
        dfs(0)
        return res
```

