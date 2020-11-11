#  [91. 解码方法](https://leetcode-cn.com/problems/decode-ways/)

## 题意



## 题解



```c++
class Solution {
public:
    int numDecodings(string s) {
        if (s.empty()) return 0;
        int n = s.size();
        vector<int> f(n + 1);
        f[0] = 1;
        for (int i = 1; i <= n; i ++ ) {
            if (s[i - 1] < '0' || s[i - 1] > '9')
                return 0;
            f[i] = 0;
            if (s[i - 1] != '0') f[i] = f[i - 1];
            if (i > 1) {
                int t = (s[i-2]-'0')*10 + s[i-1]-'0';
                if (t >= 10 && t <= 26)
                    f[i] += f[i - 2];
            }
        }
        return f[n];
    }
    
    int numDecodings2(string s) {
        int len = s.size();
        if(len >= 1 && s[0] == '0') return 0;
        vector<int> dp(len+1);
        dp[0] = 1; dp[1] = 1;
        for(int i = 2; i <= len; ++i) {
            if (s[i-1] == '0') {
                if (s[i-2] == '1' || s[i-2] == '2')
                    dp[i] = dp[i-2];
                else return 0;
            } else if (s[i-2] == '1') {
                dp[i] = dp[i-2] + dp[i-1];
            } else if (s[i-2] == '2' && s[i-1] <= '6') {
                dp[i] = dp[i-2] + dp[i-1];
            } else {
                dp[i] = dp[i-1];
            }
        }
        return dp[len];
    }
};
```



```python3

```

