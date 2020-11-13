#  [289. 生命游戏](https://leetcode-cn.com/problems/game-of-life/)

## 题意



## 题解



```c++
class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int dx[] = {-1,  0,  1, -1, 1, -1, 0, 1};
        int dy[] = {-1, -1, -1,  0, 0,  1, 1, 1};

        for (int i = 0; i < board.size(); ++ i) {
            for (int j = 0 ; j < board[0].size(); j++) {
                int sum = 0;
                for (int k = 0; k < 8; k++) {
                    int nx = i + dx[k], ny = j + dy[k];
                    if (nx >= 0 && nx < board.size() && ny >= 0 && ny < board[0].size())
                        sum += (board[nx][ny]&1);   // 只累加最低位
                }
                if (board[i][j] == 1) {
                    if (sum == 2 || sum == 3)
                        board[i][j] |= 2;   // 使用第二个bit标记是否存活
                } else {
                    if (sum == 3)
                        board[i][j] |= 2;   // 使用第二个bit标记是否存活
                }
            }
        }
        for (int i = 0; i < board.size(); ++ i )
            for (int j = 0; j < board[i].size(); ++ j )
                board[i][j] >>= 1;          //右移一位，用第二bit覆盖第一个bit。
    }
};
```



```python3

```

