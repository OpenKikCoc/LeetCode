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



```python3

```

