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



```python3

```

