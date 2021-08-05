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
                int t = (s[i - 2] - '0') * 10 + s[i - 1] - '0';
                if (t >= 10 && t <= 26)
                    f[i] += f[i - 2];
            }
        }
        return f[n];
    }
};
```

```c++
class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        s = ' ' + s;
        vector<int> f(n + 1);
        f[0] = 1;
        for (int i = 1; i <= n; i ++ ) {
            if (s[i] >= '1' && s[i] <= '9') f[i] += f[i - 1];
            if (i > 1) {
                int t = (s[i - 1] - '0') * 10 + s[i] - '0';
                if (t >= 10 && t <= 26) f[i] += f[i - 2];
            }
        }

        return f[n];
    }
};
```



```python
# 简单的dp问题，类似于跳台阶问题
# 状态表示： f[i]: 所有由前i个字符可以解码回去的字符串的集合；属性：个数
# 状态转移：1）最后一位字符定义为1位数字；(条件：最后一位字符在 0 < x <= 9)
#         2）最后一位字符定义为2位数字。(条件：最后一位字符在 0 - 26). f[i] = f[i - 1] + f[i - 2]

class Solution:
    def numDecodings(self, s: str) -> int:
        n = len(s)
        f = [0] * (n + 1)
        f[0] = 1
        for i in range(1, n + 1):
            if s[i-1] != '0':
                f[i] += f[i-1]
            if i >= 2:
                if '10' <= s[i-2:i] <= '26':
                    f[i] += f[i-2]
        return f[n]
```

