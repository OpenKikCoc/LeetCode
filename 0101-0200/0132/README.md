#  [132. 分割回文串 II](https://leetcode-cn.com/problems/palindrome-partitioning-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        s = ' ' + s;
        vector<vector<bool>> g(n + 1, vector<bool>(n + 1));
        vector<int> f(n + 1, 1e8);

        for (int j = 1; j <= n; j ++ )
            for (int i = 1; i <= n; i ++ )
                if (i == j) g[i][j] = true;
                else if (s[i] == s[j]) {
                    if (i + 1 > j - 1 || g[i + 1][j - 1]) g[i][j] = true;
                }

        f[0] = 0;
        for (int i = 1; i <= n; i ++ ) {
            for (int j = 1; j <= i; j ++ )
                if (g[j][i])
                    f[i] = min(f[i], f[j - 1] + 1);
        }

        return f[n] - 1;
    }
};
```



```python3

```

