#  [688. “马”在棋盘上的概率](https://leetcode.cn/problems/knight-probability-in-chessboard/)

## 题意



## 题解



```c++
double f[25][25][101];

class Solution {
public:
    double knightProbability(int n, int K, int r, int c) {
        memset(f, 0, sizeof f);
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < n; j ++ )
                f[i][j][K] = 1;

        int dx[] = {-2, -1, 1, 2, 2, 1, -1, -2};
        int dy[] = {1, 2, 2, 1, -1, -2, -2, -1};
        for (int k = K - 1; k >= 0; k -- )
            for (int i = 0; i < n; i ++ )
                for (int j = 0; j < n; j ++ )
                    for (int u = 0; u < 8; u ++ ) {
                        int x = i + dx[u], y = j + dy[u];
                        if (x >= 0 && x < n && y >= 0 && y < n)
                            f[i][j][k] += f[x][y][k + 1] / 8;
                    }
        return f[r][c][0];
    }
};
```



```python
class Solution:
    def knightProbability(self, n: int, k: int, row: int, column: int) -> float:
        f = [[[0] * (k + 1) for _ in range(n + 1)] for _ in range(n + 1)]
        for i in range(n):
            for j in range(n):
                f[i][j][k] = 1
        dx, dy = [-2, -1, 1, 2, 2, 1, -1, -2], [1, 2, 2, 1, -1, -2, -2, -1]
        for i in range(k - 1, -1, -1):
            for x in range(n):
                for y in range(n):
                    for u in range(8):
                        nx, ny = x + dx[u], y + dy[u]
                        if 0 <= nx < n and 0 <= ny < n:
                            f[x][y][i] += f[nx][ny][i + 1] / 8
        return f[row][column][0]
```

