#  [174. 地下城游戏](https://leetcode-cn.com/problems/dungeon-game/)

## 题意



## 题解

也可以二分做 略

```c++
class Solution {
public:
    /*
    1.这题不能直接求路径和最大，因为，如果走某一个点和小于等于0，就挂了。
    2.可以倒着走，遇到公主后，血量最少为1.

    f[i][j] = max(1, min(f[i + 1][j], f[i][j + 1]) - dungeon[i][j]);
    f[i][j]表示到(i, j)点需要最少的血量。

    方便计算多添加一行一列。使f[n][m - 1] = 1, f[m][m - 1] = 1;
    */
    const int inf = 0x3f3f3f3f;
    int calculateMinimumHP(vector<vector<int>>& dungeon) {
        int n = dungeon.size(), m = dungeon[0].size();
        if(!n) return 0;
        vector<vector<int>> f(n+1, vector<int>(m+1, inf));
        f[n][m-1] = f[n-1][m] = 1;
        for(int i = n-1; i >= 0; --i)
            for(int j = m-1; j >= 0; --j)
                f[i][j] = max(1, min(f[i+1][j], f[i][j+1]) - dungeon[i][j]);
        return f[0][0];
    }
};
```



```python
# 1. 这道题不能直接从正向动态规划的原因是：不确定起始点的值，但可以发现，到终点之后 健康值为1 一定是最优解
# 2. 考虑从终点到起点进行dp
# 3. f[i,j] 表示从[i,j]成功到达终点，[i,j]处需要具备的最少能量值
# 4. 初始状态，f[n-1,m-1]即在终点的最小健康值，max(1, 1 - w[n-1][m-1])  上一步 也至少为1
# 5. 转移，f[i, j] = min(f[i+1, j], f[i, j+1] - w[i][j]) 但是f[i,j]又必须要大于1， 所以最后还要和1比较取min
# 6. 最终答案 ： f[0][0]

# 转移详解：
# 从[i,j]往下一步走，加上当前权值，一定要大于等于 到下一步最少具备的能量，也就是：f[i,j] + w[i,j] >= f[i+1][j]
# f[i][j] >= f[i+1][j] - w[i][j], 由于两个方向要取最小的，所以直接： f[i][j] = f[i+1][j] - w[i][j] 
class Solution:
    def calculateMinimumHP(self, w: List[List[int]]) -> int:
        n, m = len(w), len(w[0])
        f = [[float('inf')] * (m) for _ in range(n)]
        f[n-1][m-1] = max(1, 1 - w[n-1][m-1])
        for i in range(n-1, -1, -1):
            for j in range(m-1, -1, -1):
                if i + 1 < n:
                    f[i][j] = f[i+1][j] - w[i][j]  
                if j + 1 < m:
                    f[i][j] = min(f[i][j], f[i][j+1] - w[i][j])
                f[i][j] = max(1, f[i][j])
        return f[0][0]
```

