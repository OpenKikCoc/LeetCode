#  [115. 不同的子序列](https://leetcode-cn.com/problems/distinct-subsequences/)

## 题意



## 题解



```c++
class Solution {
public:
    int numDistinct(string s, string t) {
        int ls = s.size(), lt = t.size();
        vector<vector<long long>> f(ls+1, vector<long long>(lt+1));
        for(int i = 0; i <= ls; ++i) f[i][0] = 1;
        for(int i = 1; i <= ls; ++i) {
            for(int j = 1; j <= lt; ++j) {
                if(s[i-1] == t[j-1]) f[i][j] = f[i-1][j-1] + f[i-1][j];
                else f[i][j] = f[i-1][j];
            }
        }
        return f[ls][lt];
    }
};
```



```python
# 两个字符串 + 一个序列的所有子序列是2**n（指数级别） ==> 考虑用dp
# 状态表示：s[1-i]的所有和t[i-j]相等的子序列；属性:count
# 状态转移：以s[i]是否包含在内作为划分：
# 1）不包含s[i]: s[i] != t[j]: f[i][j] = f[i-1][j] 
# 2）包含s[i]: f[i][j] = f[i-1][j-1]
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        f = [[0] * (m + 1) for _ in range(n + 1)]
        for i in range(n+1):
            f[i][0] = 1  # 初始化很重要！！当t字符串为空时，是有意义的 为1
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                f[i][j] = f[i-1][j]
                if s[i-1] == t[j-1]:
                    f[i][j] += f[i-1][j-1]
        return f[n][m]
```

