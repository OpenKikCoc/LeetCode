#  [419. 甲板上的战舰](https://leetcode-cn.com/problems/battleships-in-a-board/)

## 题意



## 题解



```c++
class Solution {
public:
    int countBattleships(vector<vector<char>>& board) {
        int m = board.size(), n = board[0].size(), res = 0;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) if(board[i][j] == 'X') {
                if(i && board[i-1][j] == 'X' || j && board[i][j-1] == 'X') continue;
                ++ res;
            }
        return res;
    }
};
```



```python3

```

