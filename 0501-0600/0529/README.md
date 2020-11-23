#  [529. 扫雷游戏](https://leetcode-cn.com/problems/minesweeper/)

## 题意



## 题解



```c++
class Solution {
public:
    int dx[8] = {-1, 0, 0, 1, -1, -1, 1, 1}, dy[8] = {0, -1, 1, 0, -1, 1, -1, 1};
    void dfs(vector<vector<char>>& board, int x, int y) {
        int cnt = 0;
        for(int i = 0; i < 8; ++i) {
            int nx = x + dx[i], ny = y + dy[i];
            if(nx < 0 || nx >= board.size() || ny < 0 || ny >= board[0].size()) continue;
            cnt += board[nx][ny] == 'M';
        }
        if(cnt > 0) board[x][y] = cnt+'0';
        else {
            board[x][y] = 'B';
            for(int i = 0; i < 8; ++i) {
                int nx = x + dx[i], ny = y + dy[i];
                if(nx < 0 || nx >= board.size() || ny < 0 || ny >= board[0].size() || board[nx][ny] != 'E') continue;
                dfs(board, nx, ny);
            }
        }
    }
    vector<vector<char>> updateBoard(vector<vector<char>>& board, vector<int>& click) {
        int x = click[0], y = click[1];
        if(board[x][y] == 'M') board[x][y] = 'X';
        else dfs(board, x, y);
        return board;
    }
};


// yxc
class Solution {
public:
    int n, m;

    vector<vector<char>> updateBoard(vector<vector<char>>& board, vector<int>& click) {
        n = board.size(), m = board[0].size();
        int x = click[0], y = click[1];
        if (board[x][y] == 'M') {
            board[x][y] = 'X';
            return board;
        }
        dfs(board, x, y);
        return board;
    }

    void dfs(vector<vector<char>>& board, int x, int y) {
        if (board[x][y] != 'E') return;
        int s = 0;
        for (int i = max(x - 1, 0); i <= min(n - 1, x + 1); i ++ )
            for (int j = max(y - 1, 0); j <= min(m - 1, y + 1); j ++ )
                if (i != x || j != y)
                    if (board[i][j] == 'M' || board[i][j] == 'X')
                        s ++ ;
        if (s) {
            board[x][y] = '0' + s;
            return;
        }
        board[x][y] = 'B';
        for (int i = max(x - 1, 0); i <= min(n - 1, x + 1); i ++ )
            for (int j = max(y - 1, 0); j <= min(m - 1, y + 1); j ++ )
                if (i != x || j != y)
                    dfs(board, i, j);
    }
};
```



```python3

```

