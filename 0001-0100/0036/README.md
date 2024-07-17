#  [36. 有效的数独](https://leetcode.cn/problems/valid-sudoku/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        vector<vector<int>> row(9, vector<int>(9, 0));
        vector<vector<int>> col(9, vector<int>(9, 0));
        vector<vector<int>> box(9, vector<int>(9, 0));

        for (int i = 0; i < 9; ++ i ) {
            for (int j = 0; j < 9; ++ j ) {
                if (board[i][j] == '.') continue;
                int v = board[i][j] - '1';
                int box_id = (i / 3) * 3 + j / 3;
                if (row[i][v] || col[j][v] || box[box_id][v]) return false;
                else row[i][v] = col[j][v] = box[box_id][v] = true;
            }
        }
        return true;
    }
};
```



```python
# 判断重复元素：开一个bool数组
# 一个简单的模拟题

"""
核心是：9x9的数独，元素也是 1-9 等于索引下标，所以用下标进行计算：当该下标位置已经被改为True，说明该(下标+1)的数字已经存在

t 是真实数字对下标做的映射
row[i][t]: 表示第 i 行，已经有 数字 t 的存在
col[j][t]: 表示第 j 列，已经有 数字 t 的存在
cell[i][j][t]: 把一整个大格分为9个 3 * 3的小格子，表示第[i, j]个格子，已经有数字 t 的存在

1. 直接模拟遍历整个格子
2. 如果当前格子是'.'，就continue下一个格子
3. 否则，就先把格子上的数值做一个映射到下标[0-8]
4. 判断这个数在 横竖小格子中有没有出现过，有一个为True，就直接return False
5. 否则的话，就把对应的 横竖小格子的这个数 置为 True，继续遍历剩余的格子
6. 最后遍历完后，还没有返回False， 那就说明满足要求， return True

"""

class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        rows = [[False] * 9 for _ in range(9)]
        cols = [[False] * 9 for _ in range(9)]
        cells = [[[False] * 9 for _ in range(3)] for _ in range(3)]

        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':continue
                t = int(board[i][j]) - 1
                if rows[i][t] or cols[j][t] or cells[i//3][j//3][t]:
                    return False
                rows[i][t] = cols[j][t] = cells[i//3][j//3][t] = True 
        return True



"""
计算元素所在的九宫格块，竖着数分别是1,2,3,4,5,6,7,8,9；块数也对应着判断重复数组对应的行数。
计算公式为：box_index = row//3 + (col//3)*3
"""

class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        rows = [[False] * 9 for _ in range(9)]
        cols = [[False] * 9 for _ in range(9)]
        cells = [[False] * 9 for _ in range(9)]

        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':continue
                t = int(board[i][j]) - 1
                cells_idx = (i // 3) * 3 + (j // 3)
                if rows[i][t] or cols[j][t] or cells[cells_idx][t]:
                    return False
                rows[i][t] = cols[j][t] = cells[cells_idx][t] = True 
        return True


# 分步骤写

class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        for i in range(9):
            st = [False] * 9 
            for j in range(9):  # 遍历每一行的时候，都要把之前的状态清空 还原False
                if board[i][j] != '.':
                    t = int(board[i][j]) - 1 
                    if st[t]:
                        return False
                    st[t] = True 
        
        for i in range(9):  # 遍历每一列
            st = [False] * 9
            for j in range(9):
                if board[j][i] != '.':
                    t = int(board[j][i]) - 1
                    if st[t]:
                        return False
                    st[t] = True

        for i in range(0, 9, 3):  # 遍历每一个小方框
            for j in range(0, 9, 3):
                st = [False] * 9  # m诶个小方框之前的状态都清空，每次都置为False
                for n in range(3):
                    for m in range(3):
                        if board[i + n][j + m] != '.':
                            t = int(board[i + n][j + m]) - 1
                            if st[t]:
                                return False
                            st[t] = True
        return True
```

