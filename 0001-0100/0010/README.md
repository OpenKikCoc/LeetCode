#  [10. 正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isMatch(string s, string p) {
        int n1 = s.size(), n2 = p.size();
        vector<vector<bool>> f(n1+1, vector<bool>(n2+1));
        f[0][0] = true;
        for(int i = 1; i <= n2; ++i) if(p[i-1] == '*') f[0][i] = f[0][i-2];
        for(int i = 1; i <= n1; ++i)
            for(int j = 1; j <= n2; ++j) {
                if(s[i-1] == p[j-1] || p[j-1] == '.') f[i][j] = f[i-1][j-1];
                else if(p[j-1] == '*') {
                    if(p[j-2] == '.' || p[j-2] == s[i-1]) f[i][j] = f[i-1][j] || f[i][j-2];
                    else f[i][j] = f[i][j-2];

                }
            }
        return f[n1][n2];
    }
};
```



```python3

```

