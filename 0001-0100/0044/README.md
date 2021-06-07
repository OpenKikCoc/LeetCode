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
# 1）p[j] == '*'
# 2) p[j] != '*'：有一个优化的地方（类似于完全背包问题的优化）
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        n, m = len(s), len(p)
        s = ' ' + s 
        p = ' ' + p 
        f = [[False] * (m + 1)for _ in range(n + 1)]
        f[0][0] = True   #  初始化
        
        #注意：f[0][j]是有意义的，因为p可能是很多星号：可能是True；但f[i][0]一定是False
        for i in range(n + 1): # 所以s一定要从0开始，f[0][j]可能为True，所以需要计算；
            for j in range(1, m + 1): # p一定从1开始，0开始的一定是False；f[i][0]一定是False 就不需要转移计算了。
                if p[j] != '*':
                    if s[i] == p[j] or p[j] == '?':
                        f[i][j] = (i > 0 and f[i-1][j-1])  # !!如果不加 i > 0,当s字符为空，p为‘？’时 case过不聊
                else:
                    f[i][j] = f[i][j-1] or (i > 0 and f[i-1][j]) # i从0开始的，所以在计算i-1的时候，先判断i是不是0，如果是0 提前返回。        
        return f[n][m]
      
      
      
# 写法2，把s字符串为0的class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        n, m = len(s), len(p)
        s = ' ' + s 
        p = ' ' + p 
        f = [[False] * (m + 1)for _ in range(n + 1)]
        f[0][0] = True   #  初始化
        
        for i in range(1, m + 1):
            if p[i] == '*':
                f[0][i] = f[0][i-1]
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if p[j] != '*':
                    if s[i] == p[j] or p[j] == '?':
                        f[i][j] = f[i-1][j-1]  
                else:
                    f[i][j] = f[i][j-1] or f[i-1][j]
        return f[n][m]
```

