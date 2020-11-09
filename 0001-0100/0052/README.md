#  [52. N皇后 II](https://leetcode-cn.com/problems/n-queens-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int n, res;
    int totalNQueens(int n) {
        res = 0;
        vector<string> b(n, string(n, '.'));
        this->n = n;
        dfs(b, 0);
        return res;
    }
    void dfs(vector<string>& b, int r) {
        if(r == b.size()) {
            ++res;
            return;
        }
        for(int c = 0; c < n; ++c) {
            if(!isValid(b, r, c)) continue;
            b[r][c] = 'Q';
            dfs(b, r+1);
            b[r][c] = '.';
        }
    }
    bool isValid(vector<string>& b, int r, int c) {
        for(int i = 0; i < n; ++i) if(b[i][c] == 'Q') return false; // i < r
        for(int i = r-1, j = c-1; i >= 0 && j >= 0; --i, --j) if(b[i][j] == 'Q') return false;
        for(int i = r-1, j = c+1; i >= 0 && j < n; --i, ++j) if(b[i][j] == 'Q') return false;
        return true;
    }
};
```



```python3

```

