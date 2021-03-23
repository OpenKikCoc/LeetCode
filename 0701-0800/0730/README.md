#  [730. 统计不同回文子序列](https://leetcode-cn.com/problems/count-different-palindromic-subsequences/)

## 题意



## 题解



```c++
class Solution {
public:
    const int MOD = 1e9 + 7;
    int countPalindromicSubsequences(string S) {
        int n = S.size();
        vector<vector<int>> f(n + 1, vector<int>(n + 1));
        for (int i = 1; i <= n; ++ i )
            f[i][i] = 1;
        for (int len = 2; len <= n; ++ len )
            for (int l = 1; l + len - 1 <= n; ++ l ) {
                int r = l + len - 1;
                if (S[l - 1] == S[r - 1]) {
                    f[l][r] = 2 * f[l + 1][r - 1];
                    int L = l + 1, R = r - 1;
                    while (L <= R && S[L - 1] != S[l - 1])
                        ++ L ;
                    while (L <= R && S[R - 1] != S[r - 1])
                        -- R ;
                    if (L > R)
                        f[l][r] += 2;
                    else if (L == R)
                        f[l][r] += 1;
                    else
                        f[l][r] -= f[L + 1][R - 1];
                } else
                    f[l][r] = f[l + 1][r] + f[l][r - 1] - f[l + 1][r - 1];
                f[l][r] = (f[l][r] % MOD + MOD) % MOD;
            }
        return f[1][n];
    }
};
```

一个更好的解法

```c++
class Solution {
public:
    int countPalindromicSubsequences(string s) {
        int n = s.size(), MOD = 1e9 + 7;
        vector<vector<int>> f(n + 2, vector<int>(n + 2, 1));
        for (int i = 1; i <= n; i ++ ) f[i][i] ++ ;
        for (int len = 2; len <= n; len ++ ) {
            deque<int> q[4];
            for (int i = 1; i <= n; i ++ ) {
                q[s[i - 1] - 'a'].push_back(i);
                int j = i - len + 1;
                if (j >= 1) {
                    for (int k = 0; k < 4; k ++ ) {
                        while (q[k].size() && q[k].front() < j) q[k].pop_front();
                        if (q[k].size()) {
                            f[j][i] ++ ;
                            int l = q[k].front(), r = q[k].back();
                            if (l < r)
                                f[j][i] = (f[j][i] + f[l + 1][r - 1]) % MOD;
                        }
                    }
                }
            }
        }
        return (f[1][n] + MOD - 1) % MOD;
    }
};
```





```python3

```

