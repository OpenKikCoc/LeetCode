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



```python
# 本题思路和上一题不一样，这样的思路写出来的代码会有很多冗余计算，但是很简洁。

# f[i]分为26类，按照最后一位是A， B，C，D...，Z 这26类。
# 比如最后一位是A，就是看原串最后一位能不能匹配A，那就是看 是不是 1 或者是 * ， 整个方案数取决于前面i-1位能对应好的方案数。那就是f[i-1]
# 比如最后一位是A，就是看原串最后两位能不能匹配Z，取决于前i-2对应好的方案数。那就是f[i-2]

class Solution:
    def numDecodings(self, s: str) -> int:
        n = len(s)
        f = [0] * (n + 1)
        f[0] = 1
        mod = int(1e9 + 7)
        for i in range(1, n + 1):
            a = s[i - 1]
            for j in range(1, 27):  # 匹配26个字母
                if j <= 9:
                    if a == '*' or a == str(j):
                        f[i] += f[i - 1]
                elif i >= 2:
                    b = s[i - 2]
                    y, x = j // 10, j % 10
                    # if (b == str(y) or ( b == '*' and y != 0)) and ( a == str(x) or ( a == '*' and x != 0)): (转str会超时)
                    if (ord(b) - 48 == y or (b == '*' and y != 0)) and (ord(a) - 48 == x or (a == '*' and x != 0)):
                        f[i] += f[i - 2]
            f[i] = f[i] % mod 
        return f[n]


```

