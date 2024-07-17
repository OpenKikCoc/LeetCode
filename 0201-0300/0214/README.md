#  [214. 最短回文串](https://leetcode.cn/problems/shortest-palindrome/)

## 题意



## 题解

本质求 s 的最长回文前缀，所以拼接求 next 数组即可。

```c++
class Solution {
public:
    const static int N = 1e5 + 10;  // 2 * 5e4

    int f[N];

    int get(string s) {
        memset(f, 0, sizeof f); // f[0] = f[1] = 0;
        int n = s.size();
        s = ' ' + s;
        for (int i = 2, j = 0; i <= n; ++ i ) {
            if (j && s[i] != s[j + 1])
                j = f[j];
            if (s[i] == s[j + 1])
                j ++ ;
            f[i] = j;
        }
        return f[n];
    }

    string shortestPalindrome(string s) {
        int n = s.size();
        string rs(s.rbegin(), s.rend());
        auto p = s + '#' + rs;
        int idx = get(p);
        string res;
        for (int i = n - 1; i >= idx; -- i )
            res.push_back(s[i]);
        return res + s;
    }
};
```



```python
# 反转拼接用kmp求解相等前后缀，找出了最长回文前缀
"""
(贪心，KMP) O(n)
求字符串 s 的最长回文前缀，然后剩余的部分就可以逆序拼接到 s 的最前边得到一个回文串。例如 abcbabcab 的最长回文前缀是 abcba，则答案就是 bacb + abcba + bcab = bacbabcbabcab。
首先将原串逆序复制一份，得到字符串 t。
将 s + # + t 作为新字符串，求其 next 数组。
假设下标从 0 开始，则最后位置上的 next 值加 1 就是最长回文前缀的长度，假设重合长度为 l。
最终答案为 t[0:l] + s。
"""
class Solution:
    def shortestPalindrome(self, s: str) -> str:
        p = " " + s + "#" + s[::-1]
        ne = [0 for _ in range(len(p))]
        j = 0
        for i in range(2, len(p)):
            while j and p[j + 1] != p[i]:
                j = ne[j]
            if p[j + 1] == p[i]:
                j += 1
            ne[i] = j
        return s[:ne[-1] - 1:-1] + s
```

