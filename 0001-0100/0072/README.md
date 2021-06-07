#  [72. 编辑距离](https://leetcode-cn.com/problems/edit-distance/)

## 题意



## 题解



```c++
class Solution {
public:
    int minDistance(string word1, string word2) {
        int n1 = word1.size(), n2 = word2.size();
        vector<vector<int>> f(n1+1, vector<int>(n2+1));
        for(int i = 1; i <= n1; ++i) f[i][0] = i;
        for(int j = 1; j <= n2; ++j) f[0][j] = j;
        for(int i = 1; i <= n1; ++i)
            for(int j = 1; j <= n2; ++j) {
                if(word1[i-1] == word2[j-1]) f[i][j] = f[i-1][j-1];
                else f[i][j] = min(min(f[i-1][j], f[i][j-1]), f[i-1][j-1]) + 1;
            }
        return f[n1][n2];
    }
};
```



```python
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

