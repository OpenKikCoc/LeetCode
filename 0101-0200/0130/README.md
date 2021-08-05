#  [130. 被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/)

## 题意



## 题解



```c++
class Solution {
public:
    int n, m;
    vector<vector<char>> board;
    int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
    
    void dfs(int x, int y) {
        board[x][y] = '#';
        for (int i = 0; i < 4; i ++ ) {
            int a = x + dx[i], b = y + dy[i];
            if (a >= 0 && a < n && b >= 0 && b < m && board[a][b] == 'O')
                dfs(a, b);
        }
    }

    void solve(vector<vector<char>>& _board) {
        board = _board;
        n = board.size();
        if (!n) return;
        m = board[0].size();

        for (int i = 0; i < n; i ++ ) {
            if (board[i][0] == 'O') dfs(i, 0);
            if (board[i][m - 1] == 'O') dfs(i, m - 1);
        }

        for (int i = 0; i < m; i ++ ) {
            if (board[0][i] == 'O') dfs(0, i);
            if (board[n - 1][i] == 'O') dfs(n - 1, i);
        }

        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ )
                if (board[i][j] == '#') board[i][j] = 'O';
                else board[i][j] = 'X';

        _board = board;
    }
};
```



```python
# 方法：dfs
# 1. 遍历grid的四周，当有O时， 进行dfs， 把与边界相连的O，并且也为O的点 置为‘#’。
# 2. 然后 再遍历整个grid，把O 变为 1，把 # 变为 O即可
class Solution:
    def solve(self, arr: List[List[str]]) -> None:
        if not arr:return 
        n, m = len(arr), len(arr[0])

        def dfs(x, y):
            arr[x][y] = '#'  # 踩坑：这里误写成 arr[x][y] == '#'过！！！
            dx, dy = [1, -1, 0, 0], [0, 0, 1, -1]
            for i in range(4):
                nx, ny = x + dx[i], y + dy[i]
                if 0 <= nx < n and 0 <= ny < m and arr[nx][ny] == 'O':
                    dfs(nx, ny)

        for i in range(m):
            if arr[0][i] == 'O':
                dfs(0, i)
            if arr[n-1][i] =='O':
                dfs(n-1, i)
        for i in range(n):
            if arr[i][0] == 'O':
                dfs(i, 0)
            if arr[i][m-1] == 'O':
                dfs(i, m-1)
        
        for i in range(n):
            for j in range(m):
                if arr[i][j] == 'O':
                    arr[i][j] = 'X'
                elif arr[i][j] == '#':
                    arr[i][j] = 'O'
```

