#  [28. 实现 strStr()](https://leetcode-cn.com/problems/implement-strstr/)

## 题意



## 题解



```c++
class Solution {
public:
    void getnext(string& p, vector<int>& f) {
        int l = p.size();
        f.push_back(0);f.push_back(0);
        for(int i = 1; i < l; ++i) {
            int j = f[i];
            while(j && p[i] != p[j]) j = f[j];
            if(p[i] == p[j]) f.push_back(j+1);
            else f.push_back(0);
        }
    }
    int strStr(string haystack, string needle) {
        int lt = haystack.size(), lp = needle.size();
        if(!lp) return 0;
        vector<int> f;
        getnext(needle, f);
        int j = 0;
        for(int i = 0; i < lt; ++i) {
            while(j && haystack[i] != needle[j]) j = f[j];
            if(haystack[i] == needle[j]) ++j;
            if(j == lp) {
                return i-lp+1;
            }
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

