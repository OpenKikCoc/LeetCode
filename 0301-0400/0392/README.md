#  [392. 判断子序列](https://leetcode-cn.com/problems/is-subsequence/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int p = 0;
        for (auto c : t)
            if (p < s.size() && c == s[p])
                ++ p ;
        return p == s.size();
    }
    bool isSubsequence_2(string s, string t) {
        int ls = s.size(), lt = t.size();
        for(int ps = 0, pt = 0; pt <= lt; ++pt) {
            if(ps == ls) return true;
            if(s[ps] == t[pt]) {
                ++ps;
            }
        }
        return false;
    }
    /*. TLE
    bool isSubsequence(string s, string t) {
        int ls = s.size(), lt = t.size();
        vector<vector<bool>> dp(ls+1, vector<bool>(lt+1));
        for(int i = 0; i < lt; ++i) dp[0][i] = true;
        for(int i = 1; i <= ls; ++i) {
            for(int j = 1; j <= lt; ++j) {
                if(s[i-1] == t[j-1]) dp[i][j] = dp[i-1][j-1];
                else dp[i][j] = dp[i][j-1];
            }
        }
        return dp[ls][lt];
    }
    */
};
```



```python3

```

