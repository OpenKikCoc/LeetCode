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



```python
"""
一共进行两次动态规划。

第一次动规：计算出每个子串是否是回文串。
状态表示：st[i][j] 表示 s[i…j] 是否是回文串;
转移方程：s[i…j] 是回文串当且仅当 s[i] 等于s[j] 并且 s[i+1…j−1] 是回文串；
边界情况：如果s[i…j]s[i…j]的长度小于等于2，则st[i][j]=(s[i]==s[j]);

在第一次动规的基础上，我们进行第二次动规。
状态表示：f[i] 表示把前 ii 个字符划分成回文串，最少划分成几部分；
状态转移：枚举最后一段回文串的起点 jj，然后利用 st[j][i] 可知 s[j…i] 是否是回文串，如果是回文串，则 f[i]可以从 f[j−1]+1 转移；
边界情况：0个字符可以划分成0部分，所以 f[0]=0f[0]=0。

题目让我们求最少切几刀，所以答案是 f[n]−1
时间复杂度分析：两次动规都是两重循环，所以时间复杂度是 O(n2)。

"""
class Solution:
    def minCut(self, s: str) -> int:
        n=len(s)
        s=' '+s
        # step1 先使用g表示g[i][j]是否是回文串
        g = [[False]*(n+1) for _ in range(n+1)]
        for j in range(1,n+1):
            for i in range(j+1):
                if i==j:
                    g[i][j]=True
                else:
                    if s[i]==s[j]:
                        if i+1>j-1 or g[i+1][j-1]:
                            g[i][j]=True

        # step2 使用dp[i]表示到第i个字符结尾，最少的分隔次数
        f=[float('inf')]*(n+1)
        f[0]=0
        for j in range(1,n+1):
            for i in range(1,j+1):
                if g[i][j]:
                    f[j]=min(f[j], f[i-1]+1)
        return f[n]-1
```

