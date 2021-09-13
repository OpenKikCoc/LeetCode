#  [96. 不同的二叉搜索树](https://leetcode-cn.com/problems/unique-binary-search-trees/)

## 题意



## 题解



```c++
class Solution {
public:
    int numTrees(int n) {
        long c = 1;
        // 卡特兰数
        for(int i = 0; i < n; i++)
            c = c * 2 * (2 * i  + 1) /(i + 2);
        return c;
    }
  
    int numTrees(int n) {
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i ++ )         // i 为长度
            for (int j = 1; j <= i; j ++ )     // 以 j 为根
                dp[i] += dp[j - 1] * dp[i - j];
        return dp[n];
    }
  
    // 0s 100%, 6.4MB 100%
    int numTrees(int n) {
        vector<vector<int>> dp(n, vector<int>(n));
        for(int i = 0; i < n; ++ i ) dp[i][i] = 1;
        // 区间dp 
        for (int i = n - 1; i >= 0; -- i ) {
            for (int j = i + 1; j < n; ++ j ) {
                // i ~ j 可以组成多少个二叉搜索树
                // 以 k 为根
                for (int k = i; k <= j; ++ k ) {
                    dp[i][j] += (k > i ? dp[i][k - 1] : 1) * (k < j ? dp[k + 1][j] : 1);
                }

            }
        }
        return dp[0][n - 1];
    }
};
```



```python
"""
(动态规划) O(n2)
状态表示：f[n] 表示 n个节点的二叉搜索树共有多少种。
状态转移：左子树可以有 0,1,…n−1 个节点，对应的右子树有 n−1,n−2,…,0 个节点，f[n] 是所有这些情况的加和，所以 f[n]=∑n−1k=0 f[k]∗f[n−1−k]

时间复杂度分析：状态总共有 nn 个，状态转移的复杂度是 O(n)，所以总时间复杂度是 O(n2)。
"""

class Solution:
    def numTrees(self, n: int) -> int:
        f = [0] * (n + 1)
        f[0] = 1
        for i in range(1, n + 1):
            for j in range(1, i + 1):
                f[i] += f[j - 1] * f[i - j]
        return f[-1]
```

