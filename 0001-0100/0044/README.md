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



```python
# 状态表示：f[i,j]:表示s[1-i]和p[1-j]是否匹配；
# 状态转移：当前p[j]字符是什么？以p[j] 是否为 ‘*’来区分
# 1） p[j] != '*'：只有当s[i] == p[j]时，才可以转移f[i][j] = f[i-1][j-1]  
# 2）p[j] == '*'：按照*匹配几个字符来进行状态转移：
# a.不匹配：f[i][j] = f[i][j-1]
# b.匹配1个：f[i][j] = f[i-1][j-1]
# c.匹配多个：那当前s的第i个字符已经被用过了，就看i-1能不能和前j个字符匹配：f[i][j] = f[i-1][j]
# 由于f[i-1][j] 一定是由f[i-1][j-1]转移过来的，也就是f[i-1][j]包含了状态f[i-1][j-1]。所以可以简化一下

      
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        n, m = len(s), len(p)
        s, p = ' ' + s, ' ' + p
        f = [[False] * (m+1) for _ in range(n+1)]
        f[0][0] = True 
        for i in range(1, m + 1):
            if p[i] == '*':
                f[0][i] = f[0][i-1] 
        
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s[i] == p[j] or p[j] == '?':
                    f[i][j] = f[i-1][j-1]
                elif p[j] == '*':
                    f[i][j] = f[i][j-1] or f[i-1][j]
        return f[n][m]
```

