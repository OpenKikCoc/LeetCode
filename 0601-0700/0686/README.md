#  [686. 重复叠加字符串匹配](https://leetcode-cn.com/problems/repeated-string-match/)

## 题意



## 题解

```c++
class Solution {
public:
    int repeatedStringMatch(string a, string p) {
        string s;
        while (s.size() < p.size()) s += a;
        s += a;
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
            if (j == m) return (i + a.size() - 1) / a.size();
        }
        return -1;
    }
};
```



```c++
class Solution {
public:
    vector<int> get_next(string p, int n) {
        vector<int> f;
        f.push_back(0), f.push_back(0);
        for (int i = 1; i < n; ++ i ) {
            int j = f[i];
            if (j && p[j] != p[i]) j = f[j];
            if (p[j] == p[i])
                f.push_back(j + 1);
            else
                f.push_back(0);
        }
        return f;
    }

    int repeatedStringMatch(string a, string p) {
        string s;
        while (s.size() < p.size()) s += a;
        s += a;

        int n = s.size(), m = p.size();
        auto f = get_next(p, m);

        int j = 0;
        for (int i = 0; i < n; ++ i ) {
            while (j && p[j] != s[i]) j = f[j];
            if (p[j] == s[i])
                ++ j ;
            if (j == m) {
                return (i + a.size()) / a.size();
            }
        }
        return -1;
    }
};
```



```python3

```

