#  [37. 解数独](https://leetcode.cn/problems/sudoku-solver/)

## 题意



## 题解



剪枝进阶：[AcWing 166.数独](https://github.com/OpenKikCoc/AcWing/blob/master/02_senior/166/README.md)

```c++
class Solution {
public:

    bool row[9][9], col[9][9], cell[3][3][9];

    void solveSudoku(vector<vector<char>>& board) {
        memset(row, 0, sizeof row);
        memset(col, 0, sizeof col);
        memset(cell, 0, sizeof cell);

        for (int i = 0; i < 9; i ++ )
            for (int j = 0; j < 9; j ++ )
                if (board[i][j] != '.') {
                    int t = board[i][j] - '1';
                    row[i][t] = col[j][t] = cell[i / 3][j / 3][t] = true;
                }

        dfs(board, 0, 0);
    }

    bool dfs(vector<vector<char>>& board, int x, int y) {
        if (y == 9) x ++, y = 0;
        if (x == 9) return true;

        if (board[x][y] != '.') return dfs(board, x, y + 1);
        for (int i = 0; i < 9; i ++ )
            if (!row[x][i] && !col[y][i] && !cell[x / 3][y / 3][i]) {
                board[x][y] = '1' + i;
                row[x][i] = col[y][i] = cell[x / 3][y / 3][i] = true;
                if (dfs(board, x, y + 1)) return true;
                board[x][y] = '.';
                row[x][i] = col[y][i] = cell[x / 3][y / 3][i] = false;
            }

        return false;
    }
};
```



```python
# python3
"""
t 是真实数字对下标做的映射
row[i][t]: 表示第 i 行，已经有 数字 t 的存在
col[j][t]: 表示第 j 列，已经有 数字 t 的存在
cell[i][j][t]: 把一整个大格分为9个 3 * 3的小格子，表示第[i, j]个格子，已经有数字 t 的存在
1. 把当前已经有的数字填充进去，主要是标记 当前行，列，小格子已经有 这个数【记得做映射到第二位下标，减1】
2. 开始从[0, 0]进行dfs, 一行行从左到右递归处理每一个格子的数字
3. 进入 dfs 要判断 y == 9, 如果 y 为9，意味着要换行了，那就把 x += 1, y == 0
4. 判断当前格子是否有数字，如果已经有数字了，就继续遍历下一个格子
5. 如果没有数字，就从 0 - 8 选数字放到当前格子，并且要满足横竖小格子都没有出现过，才可以放置。 然后处理下一个格子，如果下一个格子为true， 就return True
6. 如果不满足，最后记得要回溯
"""

class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:

        def dfs(x, y):
            if y == 9:
                x += 1
                y = 0
            if x == 9:
                return True
            if board[x][y] != '.':
                return dfs(x, y + 1)
            for i in range(9):
                if not row[x][i] and not col[y][i] and not cell[x//3][y//3][i]:
                    board[x][y] = str(1+i)
                    row[x][i] = col[y][i] = cell[x//3][y//3][i] = True
                    if dfs(x, y + 1):
                        return True 
                    board[x][y] = '.'
                    row[x][i] = col[y][i] = cell[x//3][y//3][i] = False
            return False

        row, col = [[False] * 9 for _ in range(9)], [[False] * 9 for _ in range(9)]
        cell = [[[False] * 9 for _ in range(3)] for _ in range(3)]
        for i in range(9):
            for j in range(9):
                if board[i][j] != '.':
                    t = int(board[i][j]) - 1 
                    row[i][t] = col[j][t] = cell[i//3][j//3][t] = True
        dfs(0, 0)
```

