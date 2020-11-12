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

    f[i][j] = max(1, min(f[i + 1][j], f[i][j + 1]) - dungeon[i][i]);
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



```python3

```

