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



```python
"""
(原地算法+位运算)
如何做到不用额外的空间，且把所有位置细胞的状态同时改变呢？因为想到只有0和1两个状态，可以用二进制中的第二位来存储变化后的状态。
0000：一开始是死细胞，后来还是死细胞
0101：一开始是活细胞，后来变成死细胞
1010：一开始是死细胞，后来变成活细胞
1111：一开始是活细胞，后来还是活细胞
最后把第二位全部右移一位就是结果数组了

"""
class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        m = len(board)
        n = len(board[0])

        for i in range(m):
            for j in range(n):
                live = 0
                for x in range(max(0, i-1), min(i+1, m-1)+1):
                    for y in range(max(0, j-1), min(j+1, n-1)+1):
                        if i == x and j == y:
                            continue
                        if board[x][y] & 1:
                            live += 1

                next = 0
                if board[i][j] & 1:
                    if 2 <= live <= 3:
                        next = 1
                else:
                    if live == 3:
                        next = 1
                board[i][j] |= next << 1

        for i in range(m):
            for j in range(n):
                board[i][j] = board[i][j] >> 1
```

