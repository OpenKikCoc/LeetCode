#  [516. 最长回文子序列](https://leetcode-cn.com/problems/longest-palindromic-subsequence/)

## 题意



## 题解



```c++
class Solution {
public:
    int longestPalindromeSubseq1(string s) {
        int n = s.size();
        vector<vector<int>> f(n+1, vector<int>(n+1));
        for(int i = 0; i <= n; ++i) f[i][i] = 1;
        for(int len = 2; len <= n; ++len)
            for(int l = 1; l+len-1 <= n; ++l) {
                int r = l+len-1;
                if(s[l-1] == s[r-1]) f[l][r] = f[l+1][r-1] + 2;
                else f[l][r] = max(f[l+1][r], f[l][r-1]);
            }
        return f[1][n];
    }
    int longestPalindromeSubseq2(string s) {
        int n = s.size();
        vector<vector<int>> f(n+1, vector<int>(n+1));
        for(int i = 0; i <= n; ++i) f[i][i] = 1;
        for(int l = n; l > 0; --l)
            for(int r = l+1; r <= n; ++r) {
                if(s[l-1] == s[r-1]) f[l][r] = f[l+1][r-1] + 2;
                else f[l][r] = max(f[l+1][r], f[l][r-1]);
            }
        return f[1][n];
    }
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        vector<int> f(n+1);
        for(int i = 0; i <= n; ++i) f[i] = 1;
        for(int l = n; l > 0; --l) {
            int mem = 0;
            for(int r = l+1; r <= n; ++r) {
                int t = f[r];
                if(s[l-1] == s[r-1]) f[r] = mem + 2;
                else f[r] = max(f[r], f[r-1]);
                mem = t;
            }
        }
            
        return f[n];
    }
};
```



```python3

```

