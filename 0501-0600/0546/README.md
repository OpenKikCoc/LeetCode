#  [546. 移除盒子](https://leetcode-cn.com/problems/remove-boxes/)

## 题意



## 题解



```c++
class Solution {
public:
    // 与射气球类似 注意状态转移
/*
我们很容易陷入这样一个错误的思路：用 f(l, r) 来表示移除区间 [l, r] 内所有的盒子能得到的最大积分，
然后去探索某一种移除盒子的策略来进行状态转移。而实际上，我们并不能直接使用起始节点和结束节点决定最大分数，
因为这个分数并不只依赖于子序列，也依赖于之前的移动对当前数组的影响，这可能让最终的子序列不是一个连续的子串。
比如 {3,4,2,4,4}，如果先把 2 移除，3 个 4 会合并在一起，对答案的贡献是 3^2 = 9，
如果先移除左右两边的 4 再移除 2 这里 3 个 4 的贡献就是 1^2 + 2^2 = 5
最优的办法当然是先取走 2，但是这样剩下的 3 个 4 其实并不是原串的某个连续子串。
*/
    const int INF = 1e8;
    int removeBoxes(vector<int>& boxes) {
        int n = boxes.size();
        vector<vector<vector<int>>> f(n, vector<vector<int>>(n, vector<int>(n + 1, -INF)));
        vector<vector<int>> g(n, vector<int>(n, -INF));

        for (int len = 1; len <= n; ++ len )
            for (int l = 0; l + len - 1 < n; ++ l ) {
                int r = l + len - 1;
                for (int k = 1; k <= len; ++ k ) {
                    if (len == 1) f[l][r][k] = 1;
                    else if (k == 1) f[l][r][k] = 1 + g[l + 1][r];
                    else for (int u = l + 1; u <= r - k + 2; ++ u ) {
                        if (boxes[l] != boxes[u]) continue;
                        int t = 0;
                        if (l + 1 <= u - 1) t = g[l + 1][u - 1];
                        f[l][r][k] = max(f[l][r][k], t + f[u][r][k - 1] - (k - 1) * (k - 1) + k * k);
                    }
                    g[l][r] = max(g[l][r], f[l][r][k]);
                }
            }
        return g[0][n - 1];
    }
};
```



```python3

```

