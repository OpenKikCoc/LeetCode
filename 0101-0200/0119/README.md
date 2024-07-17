#  [119. 杨辉三角 II](https://leetcode.cn/problems/pascals-triangle-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    // 第 3 行 第 0 位 为 1 ， 第 1 位 为 3
    vector<int> getRow(int rowIndex) {
        vector<int> f(rowIndex + 1);
        f[0] = 1;
        for (int i = 1; i <= rowIndex; ++ i )
            for (int j = i; j > 0; -- j )
                f[j] = f[j] + f[j - 1];
        
        return f;
    }
};

class Solution {
public:
    vector<int> getRow(int n) {
        vector<vector<int>> f(2, vector<int>(n + 1));
        for (int i = 0; i <= n; i ++ ) {
            f[i & 1][0] = f[i & 1][i] = 1;
            for (int j = 1; j < i; j ++ )
                f[i & 1][j] = f[i - 1 & 1][j - 1] + f[i - 1 & 1][j];
        }
        return f[n & 1];
    }
};
```



```python
# 在算第i行的值时 只用到了i-1行，所以可以用滚动数组


# 不用滚动数组时：
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        f = [[0] * (n + 1) for _ in range(n + 1)]
        for i in range(n + 1):
            f[i][0] = f[i][i] = 1 
            for j in range(1, i):
                f[i][j] = f[i-1][j-1] + f[i-1][j]
        return f[n]


# 用滚动数字，只需把定义时的第一维改为2，然后后面在计算的时候f第一维度，加上 & 1 ( + 优先级大于 & )  
class Solution:
    def getRow(self, n: int) -> List[int]:
        f = [[0] * (n + 1) for _ in range(2)]
        for i in range(n + 1):
            f[i & 1][0] = f[i & 1][i] = 1 
            for j in range(1, i):
                f[i & 1][j] = f[i-1 & 1][j-1] + f[i-1 & 1][j]
        return f[n & 1]
```

