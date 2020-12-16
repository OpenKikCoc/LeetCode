#  [639. 解码方法 2](https://leetcode-cn.com/problems/decode-ways-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    // 分情况讨论即可
    const int mod = 1e9 + 7;
    int numDecodings(string s) {
        int n = s.size();
        vector<int> f(n + 1);
        f[0] = 1;
        for (int i = 1; i <= n; ++ i )
            // i位 匹配j
            for (int j = 1; j <= 26; ++ j ) {
                char a = s[i - 1];
                if (j <= 9) {
                    if (a == '*' || a == j + '0') f[i] += f[i - 1];
                } else if (i >= 2) {
                    char b = s[i - 2];
                    int y = j / 10, x = j % 10;
                    // b 和 y 匹配     a 和 x 匹配
                    if ((b == y + '0' || b == '*' && y) && (a == x + '0' || a == '*' && x))
                        f[i] += f[i - 2];
                }
                f[i] %= mod;
            }
        return f[n];
    }
};
```



```python3

```

