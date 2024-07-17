#  [97. 交错字符串](https://leetcode.cn/problems/interleaving-string/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int l1 = s1.size(), l2 = s2.size(), l3 = s3.size();
        if (l1 + l2 != l3) return false;
        vector<vector<bool>> f(l1 + 1, vector<bool>(l2 + 1));
        f[0][0] = true;
        for (int i = 1; i <= l1; ++ i )
            if (f[i - 1][0] && s1[i - 1] == s3[i - 1])
                f[i][0] = true;
        for (int i = 1; i <= l2; ++ i )
            if (f[0][i - 1] && s2[i - 1] == s3[i - 1])
                f[0][i] = true;
        for (int i = 1; i <= l1; ++ i )
            for (int j = 1; j <= l2; ++ j )
                f[i][j] = (f[i - 1][j] && s1[i - 1] == s3[i + j - 1]) || (f[i][j - 1] && s2[j - 1] == s3[i + j - 1]);
        return f[l1][l2];
    }
};
```



```c++
// yxc
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int n = s1.size(), m = s2.size();
        if (s3.size() != n + m) return false;

        vector<vector<bool>> f(n + 1, vector<bool>(m + 1));
        s1 = ' ' + s1, s2 = ' ' + s2, s3 = ' ' + s3;
        for (int i = 0; i <= n; i ++ )
            for (int j = 0; j <= m; j ++ )
                if (!i && !j) f[i][j] = true;
                else {
                    if (i && s1[i] == s3[i + j]) f[i][j] = f[i - 1][j];
                    if (j && s2[j] == s3[i + j]) f[i][j] = f[i][j] || f[i][j - 1];
                }

        return f[n][m];
    }
};
```



```python
# 暴搜方案数太多，考虑用dp
# 状态表示f[i][j]: 表示所有由s1[1-i] s2[1-j]交错形成s3[1-i+j]的方案；属性：集合是否非空；true/false
# 状态计算：如果 s3[i+j] 匹配 s1[i] ，则问题就转化成了 f[i−1][j]；如果 s3[i+j] 匹配 s2[j]，则问题就转化成了 f[i][j−1]。两种情况只要有一种为真，则 f[i][j] 就为真

class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        n, m = len(s1), len(s2)
        if len(s3) != (n + m):return False
        f = [[False] * (m+1) for _ in range(n+1)]
        s1, s2, s3 = ' ' + s1, ' ' + s2, ' ' + s3 
        f[0][0] = True  # 初始化
        for i in range(1, n + 1):  # 初始化
            if f[i-1][0] and s1[i] == s3[i]:
                f[i][0] = True
        for i in range(1, m + 1): # 初始化
            if f[0][i-1] and s2[i] == s3[i]:
                f[0][i] = True 
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                f[i][j] = (f[i-1][j] and s1[i] == s3[i+j]) or (f[i][j-1] and s2[j] == s3[i+j])
        return f[n][m]
```

