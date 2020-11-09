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



```python3

```

