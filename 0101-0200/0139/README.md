#  [139. 单词拆分](https://leetcode-cn.com/problems/word-break/)

## 题意



## 题解



```c++
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        int n = s.size();
        vector<bool> f(n+1);
        f[0] = true;
        for(int i = 1; i <= n; ++i) {
            for(auto w : wordDict) {
                int len = w.size();
                if(i >= len && s.substr(i-len, len) == w) f[i] = f[i] || f[i-len];
            }
        }
        return f[n];
    }
};
```



```python3

```

