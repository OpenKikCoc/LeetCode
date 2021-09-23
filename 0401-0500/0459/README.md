#  [459. 重复的子字符串](https://leetcode-cn.com/problems/repeated-substring-pattern/)

## 题意



## 题解

```c++
class Solution {
public:
    bool repeatedSubstringPattern(string s) {
        int n = s.size();
        s = ' ' + s;
        vector<int> next(n + 1);
        for (int i = 2, j = 0; i <= n; i ++ ) {
            while (j && s[i] != s[j + 1]) j = next[j];
            if (s[i] == s[j + 1]) j ++ ;
            next[i] = j;
        }
        int t = n - next[n];
        return t < n && n % t == 0;
    }
};
```


```c++
class Solution {
public:
    // kmp 循环节问题
    bool repeatedSubstringPattern(string s) {
        int n = s.size();
        vector<int> f;
        f.push_back(0), f.push_back(0);
        for (int i = 1; i < n; ++ i ) {
            int j = f[i];
            while (j && s[j] != s[i]) j = f[j];
            if (s[j] == s[i]) f.push_back(j + 1);
            else f.push_back(0);
        }
        return f[n] && n % (n - f[n]) == 0;    
    }
};
```



```python
# 暴力解法1：就是找前缀，看s是否能有几个这样前缀组成。
# class Solution:
#     def repeatedSubstringPattern(self, s: str) -> bool:
#         n = len(s)
#         for i in range(1, len(s) // 2 + 1):
#             a, b = divmod(n, i)
#             if b == 0 and s[:i] * a  == s:
#                 return True
#         return False

# 暴力解法2：我们知道如果s是重复字符串，那么可以由两个子串组成。我们通过ss = s + s就有4个子串组成，
# 删除首尾字母，那么 ss[1:-1]就有应该有2个子串组成，就是说ss[1:-1]是否存在s
class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        return (s+s)[1:-1].find(s) != -1
      
# 解法3：KMP
```

