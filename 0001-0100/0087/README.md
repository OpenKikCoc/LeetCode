#  [87. 扰乱字符串](https://leetcode-cn.com/problems/scramble-string/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isScramble(string s1, string s2) {
        int l1 = s1.size(), l2 = s2.size();
        if(l1 != l2) return false;
        if(!l1) return true;
        vector<vector<vector<bool>>> dp(l1+1, vector<vector<bool>>(l1, vector<bool>(l1, false)));
        for(int i = 0; i < l1; ++i) {
            for(int j = 0; j < l1; ++j) {
                dp[1][i][j] = s1[i] == s2[j];
            }
        }
        for(int len = 2; len <= l1; ++len) {
            for(int i = 0; i < l1 && i+len-1 < l1; ++i) {
                for(int j = 0; j < l1 && j+len-1 < l1; ++j) {
                    for(int k = 1; k < len; ++k) {
                        if(dp[k][i][j] && dp[len-k][i+k][j+k]) {
                            dp[len][i][j] = true;
                            break;
                        }
                        if(dp[k][i][j+len-k] && dp[len-k][i+k][j]) {
                            dp[len][i][j] = true;
                            break;
                        }
                    }
                }
            }
        }
        return dp[l1][0][0];
    }
};
```



```python3

```

