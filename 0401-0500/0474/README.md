#  [474. 一和零](https://leetcode-cn.com/problems/ones-and-zeroes/)

## 题意



## 题解

```c++
class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> f(m + 1, vector<int>(n + 1));
        for (auto& str: strs) {
            int a = 0, b = 0;
            for (auto c: str)
                if (c == '0') a ++ ;
                else b ++ ;
            for (int i = m; i >= a; i -- )
                for (int j = n; j >= b; j -- )
                    f[i][j] = max(f[i][j], f[i - a][j - b] + 1);
        }
        return f[m][n];
    }
};
```

```c++
class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> dp(m+1, vector<int>(n+1));
        for (auto s : strs) {
            int zero = 0, one = 0;
            for (auto c : s) {
                if (c == '0') ++ zero ;
                else ++one;
            }
            for (int i = m; i >= zero; -- i )
                for (int j = n; j >= one; -- j )
                    dp[i][j] = max(dp[i][j], dp[i - zero][j - one] + 1);
        }
        return dp[m][n];
    }
};
```



> **思路**
>
> Compared the general 0-1 knapsack, besides the limit number of '0's (analogy to the limit of volumes), the '1'(analogy to the limit of weight) is added in this problem. This is a typical two-dimensional 0-1 knapsack problem. 
>
> 1. State define: 
>
>    $f[k, i, j]$ means the maximum number of string we can get from the first $k$ argument strs using limited $i$ number of '0's and $j$ number of '1's
>
> 2. Transition function:
>
>    For $f[k, i, j]$, We can get it by picking the current string $i$ or discrading the current string.
>
>    $f[k, i, k] = max (f[k−1, i, j], f[k−1, i−zero[i], j−one[i]] + 1)$
>
> 3. Optimize:
>
>    We can optimize the transition function to two-dimension just like the typical 0-1 knapsack. And remember, the 'volume' and 'weight' array should be updated backwards.

```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        k = len(strs)
        f = [[0] * (n + 1) for _ in range(m + 1)]

        for u in range(k):
            zero, one = 0, 0
            for x in strs[u]:
                if x == '0':
                    zero += 1
                if x == '1':
                    one += 1
            for i in range(m, zero - 1, -1):
                for j in range(n, one - 1, -1):
                    f[i][j] = max(f[i][j], f[i - zero][j - one] + 1)
        return f[m][n]
```

