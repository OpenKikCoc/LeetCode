#  [583. 两个字符串的删除操作](https://leetcode.cn/problems/delete-operation-for-two-strings/)

## 题意



## 题解

```c++
// yxc
class Solution {
public:
    int minDistance(string word1, string word2) {
        int n = word1.size(), m = word2.size();
        vector<vector<int>> f(n + 1, vector<int>(m + 1));
        for (int i = 1; i <= n; i ++ ) f[i][0] = i;
        for (int i = 1; i <= m; i ++ ) f[0][i] = i;
        for (int i = 1; i <= n; i ++ )
            for (int j = 1; j <= m; j ++ ) {
                f[i][j] = min(f[i - 1][j], f[i][j - 1]) + 1;
                if (word1[i - 1] == word2[j - 1])
                    f[i][j] = min(f[i][j], f[i - 1][j - 1]);
            }
        return f[n][m];
    }
};
```


```c++
// LCS
class Solution {
public:
    int minDistance(string word1, string word2) {
        int n1 = word1.size(), n2 = word2.size();
        vector<vector<int>> f(n1 + 1, vector<int>(n2 + 1));
        for (int i = 1; i <= n1; ++ i )
            for (int j =1; j <= n2; ++ j )
                if (word1[i - 1] == word2[j - 1])
                    f[i][j] = f[i - 1][j - 1] + 1;
                else
                    f[i][j] = max(f[i - 1][j], f[i][j - 1]);
        return n1 + n2 - 2 * f[n1][n2];
    }
};
```



```python
#也可以看成最长公共子序列问题===>删除字符的最小值 等价于 剩下字符串的最大值
#等价于1143（最长公共子序列问题）
#闫式分析法：
#状态表示：dp[i][j]：集合：使得s1(1~i)和s2(1-j)变成相同字符串的所有方案；属性：min
#状态计算：分类：根据最后一个字符的情况来氛围若干类===> 根据i和j是否有被剩下来进行分类：一共有四类
#1）i和j存在：那只需要关注dp[i-1][j-1]
#2）i存在，j不存在:相当于要将j删掉，dp[i][j-1]+1
#3）i不存在，j存在:相当于要将i删掉，dp[i-1][j]+1
#4）i和j都不存在:dp[i-1][j-1]+2===> 这种情况 会在第2类和第3类里被删掉。

class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m,n=len(word1),len(word2)
        dp=[[0]*(n+1) for _ in range(m+1)]
        dp[0][0]=0
        for i in range(1,m+1):
            dp[i][0]=i
        for j in range(1,n+1):
            dp[0][j]=j
        for i in range(1,m+1):
            for j in range(1,n+1):
                if word1[i-1]==word2[j-1]:
                    dp[i][j]=dp[i-1][j-1]
                else:
                    dp[i][j]=min(dp[i-1][j],dp[i][j-1])+1
        return dp[-1][-1]
#代码和编辑距离72题一样...      
```

