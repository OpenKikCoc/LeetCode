#  [799. 香槟塔](https://leetcode-cn.com/problems/champagne-tower/)

## 题意



## 题解



```c++
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<vector<double>> f(query_row + 1, vector<double>(query_row + 1));
        f[0][0] = poured;
        for (int i = 0; i < query_row; i ++ )
            for (int j = 0; j <= i; j ++ )
                if (f[i][j] > 1) {
                    double x = (f[i][j] - 1) / 2;
                    f[i + 1][j] += x, f[i + 1][j + 1] += x;
                }
        return min(1.0, f[query_row][query_glass]);
    }
};
```



**思路**

> 模拟递推
>
> 1. 状态表示：$f[i, j]$ 表示第 $i$ 行水第 $j$ 个杯子有多少水（假设不会溢出：容量无限大）
>
> 2. 状态转移（递推）
>
>    如果 $f[i, j] > 1$，那么当前会溢出到下一行每一个杯子的容量是：$x = (f[i, j] - 1) / 2$
>
>     $f[i + 1, j] += x$
>
>    $f[i + 1, j + 1] += x$
>
> 3. 初始化：$f[0, 0] = poured$
>
>    最后的结果要跟 $1$ 取 $min$，因为杯子的实际容量最多是 $1$

```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        f = [[0] * (query_row + 1) for _ in range(query_row + 1)]
        f[0][0] = poured
        for i in range(query_row):
            for j in range(i + 1):
                if f[i][j] > 1:
                    x = (f[i][j] - 1) / 2
                    f[i + 1][j] += x
                    f[i + 1][j + 1] += x
        return min(1, f[query_row][query_glass])
```

