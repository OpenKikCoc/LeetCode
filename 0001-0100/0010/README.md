#  [10. 正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isMatch(string s, string p) {
        int n1 = s.size(), n2 = p.size();
        vector<vector<bool>> f(n1 + 1, vector<bool>(n2 + 1));
        f[0][0] = true;
        for (int i = 1; i <= n2; ++ i ) if(p[i - 1] == '*') f[0][i] = f[0][i - 2];
        for (int i = 1; i <= n1; ++ i )
            for (int j = 1; j <= n2; ++ j ) {
                if (s[i - 1] == p[j - 1] || p[j - 1] == '.') f[i][j] = f[i - 1][j - 1];
                else if (p[j - 1] == '*') {
                    if (p[j - 2] == '.' || p[j - 2] == s[i - 1]) f[i][j] = f[i - 1][j] || f[i][j - 2];
                    else f[i][j] = f[i][j - 2];
                }
            }
        return f[n1][n2];
    }
};
```



```python
# 状态表示：f[i,j]: 表示 s[1-i] 和 p[1-j] 是否匹配；
# 状态转移：当前p[j]字符是什么？以p[j] 是否为 '*' 来区分
# 1) p[j] != '*'：那当且仅当s[i] == p[j] 或者 p[j] == '.'时，f[i][j] = f[i-1][j-1]
# 2）p[j] == '*'：那就是枚举通配符 '*' 可以匹配多少个p[j-1]
# a. 如果s[i] != p[j-1]，那么表示丢弃这一次的 '*' 和它之前的那个字符:f[i][j] = f[i][j-2]

# b. 如果s[i] == p[j-1]:
# 1) 还是匹配0个，比如: s: 'ab', p: 'abb*'，那只能* 和 前面那个'b'舍弃，f[i][j] = f[i][j-2]
# 2) 匹配一个，不丢弃前面那个字符，并且只保留一次字符，f[i][j] = f[i-1][j-2]
# 3）匹配2个（及以上），那s[i]这个字符是一定能被匹配的，就看前面的字符了: f[i][j] = f[i-1][j]
# 由于 f[i-1][j]是由f[i-1][j-2]转移过来的，所以前者包含了后者的情况。
# 2.2 和 2.3 可以统一写成 当s[i]和p[j-1]匹配，并且*匹配>=1的情况下 : f[i][j] = f[i-1][j]

# 最好的写法，把特殊情况拎出来
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        n, m = len(s), len(p)
        s, p = ' ' + s, ' ' + p
        f = [[False] * (m + 1) for _ in range(n + 1)]
        f[0][0] = True  # 初始值
        for i in range(2, m + 1):  # 特殊情况判断：当s字符串为空的时候
            if p[i] == '*':
                f[0][i] = f[0][i-2]
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s[i] == p[j] or p[j] == '.':
                    f[i][j] = f[i-1][j-1]
                elif p[j] == '*':
                    if p[j-1] == s[i] or p[j-1] == '.':
                        f[i][j] = f[i][j-2] or f[i-1][j]  # 踩坑：这里也有舍弃前一个字符的时候
                    else:
                        f[i][j] = f[i][j-2]
        return f[n][m]
```

