#  [28. 实现 strStr()](https://leetcode-cn.com/problems/implement-strstr/)

## 题意



## 题解



```c++
class Solution {
public:
    int n, m;

    vector<int> get(string & p) {
        vector<int> f(n + 1);
        for (int i = 2, j = 0; i <= n; ++ i ) {
            while (j && p[i] != p[j + 1])
                j = f[j];
            if (p[i] == p[j + 1])
                j ++ ;
            f[i] = j;
        }
        return f;
    }

    int strStr(string haystack, string needle) {
        if (needle.empty())
            return 0;

        // 以下无法处理两个都是空串or第二个是空串的情况
        string p = ' ' + needle, s = ' ' + haystack;
        this->n = p.size() - 1;
        this->m = s.size() - 1;
        auto f = get(p);
        for (int i = 1, j = 0; i <= m; ++ i ) {
            while (j && s[i] != p[j + 1])
                j = f[j];
            if (s[i] == p[j + 1])
                j ++ ;
            if (j == n) {
                return i - n;
                // j = f[j];
            }
        }
        return -1;
    }
};
```



```c++
// yxc
class Solution {
public:
    int strStr(string s, string p) {
        if (p.empty()) return 0;
        int n = s.size(), m = p.size();
        s = ' ' + s, p = ' ' + p;

        vector<int> next(m + 1);
        for (int i = 2, j = 0; i <= m; i ++ ) {
            while (j && p[i] != p[j + 1]) j = next[j];
            if (p[i] == p[j + 1]) j ++ ;
            next[i] = j;
        }

        for (int i = 1, j = 0; i <= n; i ++ ) {
            while (j && s[i] != p[j + 1]) j = next[j];
            if (s[i] == p[j + 1]) j ++ ;
            if (j == m) return i - m;
        }

        return -1;
    }
};
```



```python
# # 这竟然是一道KMP的裸题!!!我竟然没想到！！！
class Solution:
    def strStr(self, s: str, p: str) -> int:
        if not p:return 0 # 当输入 s 和 p 都是空字符串时，特判。
        n, m  = len(s), len(p)
        s, p  = ' ' + s, ' ' + p
        ne = [0] * (m + 1)

        j = 0 
        for i in range(2, m + 1):
            while j and p[i] != p[j + 1]:
                j = ne[j]
            if p[i] == p[j + 1]:
                j += 1
            ne[i] = j 
        
        j = 0
        for i in range(1, n + 1):
            while j and s[i] != p[j + 1]:
                j = ne[j]
            if s[i] == p[j + 1]:
                j += 1
            if j == m:
                return i -j
        return -1

# 法2 不用KMP求解
class Solution:
    def strStr(self, s: str, p: str) -> int:
        n, m = len(s), len(p)
        for p1 in range(n - m + 1):
            if s[p1:p1 + m] == p:
                return p1 
        else:return -1
```

