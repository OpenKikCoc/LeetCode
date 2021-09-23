#  [516. 最长回文子序列](https://leetcode-cn.com/problems/longest-palindromic-subsequence/)

## 题意



## 题解

```c++
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        vector<vector<int>> f(n, vector<int>(n));
        for (int len = 1; len <= n; len ++ )
            for (int i = 0; i + len - 1 < n; i ++ ) {
                int j = i + len - 1;
                if (len == 1) f[i][j] = 1;
                else {
                    if (s[i] == s[j]) f[i][j] = f[i + 1][j - 1] + 2;
                    f[i][j] = max(f[i][j], max(f[i + 1][j], f[i][j - 1]));
                }
            }
        return f[0][n - 1];
    }
};
```


```python
# 子序列是可以不连续的；如果求子串 可以用马拉车算法
# 求子序列只能用dp，状态定义：从i到j 这个区间里，最长回文子序列的长度是多少。f[0, n-1]就是答案
# 按照i，j端点在不在回文子序列里 分类：1）i,j都在; 2）只有i在;  3）只有j在;  4）i j 都不在;
# 1) 前提：s[i] == s[j], f[i][j] = f[i + 1][j - 1] + 2 
# 2) f[i][j] < f[i][j - 1]; 后者状态既包含了i在，也包含了i不在；但是这道题是求解最大值，所有重复没影响
# 3) f[i][j] < f[i + 1][j - 1];同理
# 4) f[i][j] = f[i + 1][j - 1]； f[i][j - 1] 包含了f[i + 1][j - 1]的状态，第4种状态已经被第2/3种状态包含进去了

class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        f = [[0] * (n + 1) for _ in range(n + 1)]
        for length in range(1, n + 1):
            for l in range(n - length + 1):
                r = l + length - 1 
                if length == 1:
                    f[l][r] = 1 
                else:
                    if s[l] == s[r]:
                        f[l][r] = f[l + 1][r - 1] + 2 
                    f[l][r] = max(f[l][r], max(f[l + 1][r], f[l][r - 1]))
        return f[0][n - 1]
```

