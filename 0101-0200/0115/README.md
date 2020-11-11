#  [115. 不同的子序列](https://leetcode-cn.com/problems/distinct-subsequences/)

## 题意



## 题解



```c++
class Solution {
public:
    int numDistinct(string s, string t) {
        int ls = s.size(), lt = t.size();
        vector<vector<long long>> f(ls+1, vector<long long>(lt+1));
        for(int i = 0; i <= ls; ++i) f[i][0] = 1;
        for(int i = 1; i <= ls; ++i) {
            for(int j = 1; j <= lt; ++j) {
                if(s[i-1] == t[j-1]) f[i][j] = f[i-1][j-1] + f[i-1][j];
                else f[i][j] = f[i-1][j];
            }
        }
        return f[ls][lt];
    }
};
```



```python3

```

