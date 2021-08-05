#  [79. 单词搜索](https://leetcode-cn.com/problems/word-search/)

## 题意



## 题解



```c++
class Solution {
public:
    int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
  
    bool dfs(vector<vector<char>>& board, string& word, int u, int x, int y) {
        if (board[x][y] != word[u]) return false;
        if (u == word.size() - 1) return true;

        char t = board[x][y];
        board[x][y] = '.';
        for (int i = 0; i < 4; i ++ ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= board.size() || ny < 0 || ny >= board[0].size() || board[a][b] == '.') continue;
            if (dfs(board, word, u + 1, nx, ny)) return true;
        }
        board[x][y] = t;
        return false;
    }
  
    bool exist(vector<vector<char>>& board, string word) {
        for (int i = 0; i < board.size(); i ++ )
            for (int j = 0; j < board[i].size(); j ++ )
                if (dfs(board, word, 0, i, j)) return true;
        return false;
    }

};
```



```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        n, m = len(board), len(board[0])

        def dfs(x, y, word):
            if len(word) == 0:
                return True   # 踩坑1 ：首先要考虑啥时候返回True！！！
            tmp = board[x][y]
            board[x][y] = '/'
            dx, dy = [1, -1, 0, 0], [0, 0, 1, -1]
            for i in range(4):
                nx, ny = x + dx[i], y + dy[i]
                if 0 <= nx < n and 0 <= ny < m and board[nx][ny] == word[0]:
                    if dfs(nx, ny, word[1:]):
                        return True
            board[x][y] = tmp   # 踩坑2:记得恢复现场
            return False  # 踩坑3:上述条件不满足 就返回False

        for i in range(n):
            for j in range(m):
                if board[i][j] == word[0]:
                    if dfs(i, j, word[1:]):
                        return True
        return False
```

