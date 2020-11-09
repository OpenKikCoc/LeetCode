#  [44. 通配符匹配](https://leetcode-cn.com/problems/wildcard-matching/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isMatch(string s, string p) {
        int ns = s.size(), np = p.size();
        vector<vector<bool>> f(ns+1, vector<bool>(np+1));
        f[0][0] = true;
        for(int i = 1; i <= np; ++i) if(p[i-1] == '*') f[0][i] = f[0][i-1];
        for(int i = 1; i <= ns; ++i)
            for(int j = 1; j <= np; ++j)
                if(p[j-1] == s[i-1] || p[j-1] == '?') f[i][j] = f[i-1][j-1];
                else if(p[j-1] == '*') f[i][j] = f[i-1][j] || f[i][j-1];
        return f[ns][np];
    }
};
```



```python3

```

