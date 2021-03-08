#  [664. 奇怪的打印机](https://leetcode-cn.com/problems/strange-printer/)

## 题意



## 题解



```c++
class Solution {
public:
    const int INF = 0x3f3f3f3f;
    int strangePrinter(string s) {
        int n = s.size();
        if (!n) return 0;
        vector<vector<int>> f(n + 1, vector<int>(n + 1));
        for (int i = 1; i <= n; ++ i )
            f[i][i] = 1;
        
        for (int len = 2; len <= n; ++ len )
            for (int l = 1; l + len - 1 <= n; ++ l ) {
                int r = l + len - 1;
                f[l][r] = f[l][r - 1] + 1;
                for (int i = l; i < r; ++ i )
                    if (s[i - 1] == s[r - 1])
                        f[l][r] = min(f[l][r], f[l][i - 1] + f[i + 1][r]);  // not r - 1
            }
        return f[1][n];
    }
};
```



```python3

```

