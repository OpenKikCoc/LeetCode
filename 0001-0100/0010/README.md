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



```python
# 写法1:没有把s长度为0单独拿出来处理 
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        n, m = len(s), len(p)
        s = ' ' + s 
        p = ' ' + p 
        f = [[False] * (m + 1) for _ in range(n + 1)]
        f[0][0] = True 

        for i in range(n + 1):
            for j in range(1, m + 1):
                if i > 0 and  (s[i] == p[j] or p[j] == '.'):
                    f[i][j] = f[i-1][j-1]
                elif p[j] == '*':
                    if i == 0 or f[i][j-2]:
                        f[i][j] = f[i][j-2]
                    elif i > 0 and (s[i] == p[j-1] or p[j-1] == '.'):
                        f[i][j] = f[i-1][j]
        return f[n][m] 
      
# 写法2:      
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m,n=len(s),len(p)
        dp=[[False for _ in range(n+1)] for _ in range(m+1)]
        dp[0][0]=True
        for i in range(2,n+1):
            if p[i-1]=='*':
                dp[0][i]=dp[0][i-2]
        for i in range(1,m+1):
            for j in range(1,n+1):
                if s[i-1]==p[j-1] or p[j-1]=='.':
                    dp[i][j]=dp[i-1][j-1]
                elif p[j-1]=='*':
                    if p[j-2]!='.' and p[j-2]!=s[i-1]:
                        dp[i][j]=dp[i][j-2]
                    else:
                        dp[i][j]=dp[i][j-2] or dp[i-1][j]
        return dp[m][n]
```

