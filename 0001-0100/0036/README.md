#  [36. 有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        vector<vector<int>> row(9, vector<int>(9, 0));
        vector<vector<int>> col(9, vector<int>(9, 0));
        vector<vector<int>> box(9, vector<int>(9, 0));

        for(int i = 0; i < 9; ++i) {
            for(int j = 0; j < 9; ++j) {
                if(board[i][j] == '.') continue;
                int v = board[i][j] - '1';
                int box_id = (i/3)*3 + j/3;
                if(row[i][v] || col[j][v] || box[box_id][v]) return false;
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
                st = [False] * 9
                for n in range(3):
                    for m in range(3):
                        if board[i + n][j + m] != '.':
                            t = int(board[i + n][j + m]) - 1
                            if st[t]:
                                return False
                            st[t] = True
        return True
```

