#  [132. 分割回文串 II](https://leetcode-cn.com/problems/palindrome-partitioning-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    // 以i结尾最多回文子串个数
    int minCut(string s) {
        int n = s.size();
        
        vector<vector<bool>> c(n, vector<bool>(n, false));
        for(int i = 0; i < n; ++i) c[i][i] = true;
        for(int len = 2; len <= n; ++len) {
            for(int l = 0; l+len-1 < n; ++l) {
                int r = l+len-1;
                if(s[l] == s[r] && (l+1>=r-1 || c[l+1][r-1])) c[l][r] = true;
            }
        }

        vector<int> f(n+1);
        for(int i = 1; i <= n; ++i) {
            if(c[0][i-1]) f[i] = 0;
            else f[i] = i;
            for(int j = 0; j < i; ++j)
                if(c[j][i-1])
                    f[i] = min(f[i], f[j]+1);
        }
        return f[n];
    }
};
```



```python3

```

