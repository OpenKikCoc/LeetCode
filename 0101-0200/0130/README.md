#  [130. 被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/)

## 题意



## 题解



```c++
class Solution {
public:
    int m, n;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    void dfs(int x, int y, vector<vector<char>>& board) {
        board[x][y] = '.';
        for(int i = 0; i < 4; ++i) {
            int nx = x + dx[i], ny = y + dy[i];
            if(nx >= 0 && nx < m && ny >= 0 && ny < n && board[nx][ny] == 'O') dfs(nx, ny, board);
        }
    }
    void solve(vector<vector<char>>& board) {
        if(board.empty()) return;
        m = board.size();
        n = board[0].size();
        for(int i = 0; i < m; ++i) {
            if(board[i][0] == 'O') dfs(i, 0, board);
            if(board[i][n-1] == 'O') dfs(i, n-1, board);
        }
        for(int i = 0; i < n; ++i) {
            if(board[0][i] == 'O') dfs(0, i, board);
            if(board[m-1][i] == 'O') dfs(m-1, i, board);
        }
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) if(board[i][j] == 'O') {
                board[i][j] = 'X';
            } else if(board[i][j] == '.') board[i][j] = 'O';
    }
};
```



```python3

```

