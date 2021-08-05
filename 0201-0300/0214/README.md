#  [214. 最短回文串](https://leetcode-cn.com/problems/shortest-palindrome/)

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



```python3

```

