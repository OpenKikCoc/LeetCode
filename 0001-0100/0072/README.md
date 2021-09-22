#  [72. 编辑距离](https://leetcode-cn.com/problems/edit-distance/)

## 题意



## 题解



```c++
class Solution {
public:
    int minDistance(string word1, string word2) {
        int n1 = word1.size(), n2 = word2.size();
        vector<vector<int>> f(n1 + 1, vector<int>(n2 + 1));
        for (int i = 1; i <= n1; ++ i ) f[i][0] = i;
        for (int j = 1; j <= n2; ++ j ) f[0][j] = j;
        for (int i = 1; i <= n1; ++ i )
            for (int j = 1; j <= n2; ++ j ) {
                if (word1[i - 1] == word2[j - 1]) f[i][j] = f[i - 1][j - 1];
                else f[i][j] = min(min(f[i - 1][j], f[i][j - 1]), f[i - 1][j - 1]) + 1;
            }
        return f[n1][n2];
    }
};
```



```python
# 经典的编辑距离问题。
#状态表示：f[i,j] : 所有将s1[1-i]变成s2[1-j]的操作方式的集合；属性：min
#状态转移：以对 s1 中的第i个字母操作不同划分

#1）在该字母之后添加一个字母之后变得相同，说明没有添加前 s1 的前i个已经和 s2 的前j-1个已经相同 
#即：dp[i][j] = dp[i][j-1] + 1
#2）删除该字母之后变得相同，说明没有删除前 s1 中前i-1已经和 s2 的前j个已经相同
#即 ： dp[i][j] = dp[i-1][j] + 1
#替换该字母；替换说明对应结尾字母不同，则看倒数第二个
#即： dp[i][j] = dp[i-1][j-1] + 1
#啥也不做：对应结尾字母相同，直接比较倒数第二个
#即： dp[i][j] = dp[i-1][j-1]

class Solution:
    def minDistance(self, s1: str, s2: str) -> int:
        n, m = len(s1), len(s2)
        s1, s2 = ' ' + s1, ' ' + s2
        f = [[float('inf')] * (m + 1) for _ in range(n + 1)] 
        f[0][0] = 0   # ！初始化很重要，后续状态转移 依赖于 这些初始状态。
        for i in range(1, n+1):  # 这些都是合法状态，都需要初始化
            f[i][0] = i
        for j in range(1, m+1):
            f[0][j] = j
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s1[i] == s2[j]:
                    f[i][j] = f[i-1][j-1]
                else:
                    f[i][j] = min(f[i-1][j], f[i][j-1], f[i-1][j-1]) + 1
        return f[n][m]
```

