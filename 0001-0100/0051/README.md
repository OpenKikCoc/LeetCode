#  [51. N 皇后](https://leetcode.cn/problems/n-queens/)

## 题意



## 题解



```c++
class Solution {
public:

    int n;
    vector<bool> col, dg, udg;
    vector<vector<string>> ans;
    vector<string> path;

    vector<vector<string>> solveNQueens(int _n) {
        n = _n;
        col = vector<bool>(n);
        dg = udg = vector<bool>(n * 2);
        path = vector<string>(n, string(n, '.'));

        dfs(0);
        return ans;
    }

    void dfs(int u) {
        if (u == n) {
            ans.push_back(path);
            return;
        }

        for (int i = 0; i < n; i ++ ) {
            if (!col[i] && !dg[u - i + n] && !udg[u + i]) {
                col[i] = dg[u - i + n] = udg[u + i] = true;
                path[u][i] = 'Q';
                dfs(u + 1);
                path[u][i] = '.';
                col[i] = dg[u - i + n] = udg[u + i] = false;
            }
        }
    }
};
```



```python
#全排列搜索的拓展：每次不仅要判断 列 有没有1，还要判断 对角线 有没有1
#由于每行只能有一个皇后，所以可以依次枚举每一行的皇后放到哪个位置。这样时间复杂度会从下降

class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        path = [["."] * n for _ in range(n)]
        col = [False] * n 
        dg = [False] * 2 * n 
        udg = [False] * 2 * n 

        def dfs(u):
           #搜到最后一行的 下一个位置（行）
            if u == n: 
                # 把每一行都转换拼接为一个字符串
                res.append(["".join(path[i]) for i in range(n)])
                return
            
            for i in range(n):
                if not col[i] and not dg[u-i+n] and not udg[u+i]:
                    path[u][i] = "Q"
                    col[i] = dg[u-i+n] = udg[u+i] = True
                    dfs(u + 1)
                    path[u][i] = "."
                    col[i] = dg[u-i+n] = udg[u+i] = False
        dfs(0)
        return res
```

