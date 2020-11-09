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



```python3

```

