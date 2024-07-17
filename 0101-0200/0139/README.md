#  [139. 单词拆分](https://leetcode.cn/problems/word-break/)

## 题意



## 题解


```c++
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        typedef unsigned long long ULL;
        const int P = 131;
        unordered_set<ULL> hash;
        for (auto& word: wordDict) {
            ULL h = 0;
            for (auto c: word) h = h * P + c;
            hash.insert(h);
        }

        int n = s.size();
        vector<bool> f(n + 1);
        f[0] = true;
        s = ' ' + s;
        for (int i = 0; i < n; i ++ )
            if (f[i]) {
                ULL h = 0;
                for (int j = i + 1; j <= n; j ++ ) {
                    h = h * P + s[j];
                    if (hash.count(h)) f[j] = true;
                }
            }

        return f[n];
    }
};
```


```c++
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        int n = s.size();
        vector<bool> f(n+1);
        f[0] = true;
        for (int i = 1; i <= n; ++ i ) {
            for (auto w : wordDict) {
                int len = w.size();
                if (i >= len && s.substr(i - len, len) == w) f[i] = f[i] || f[i - len];
            }
        }
        return f[n];
    }
};
```



```python
# f[i] 表示s[0:i]能否被break； f[1] 表示s[0]单独一个字母是可以被break的

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        n = len(s)
        if not wordDict: return not s
        f = [False] * (n + 1)  # n个字符，就有n + 1个个半 
        f[0] = True # f[0]是s[0]前面的隔板
        for i in range(1, n + 1):
            for j in range(i - 1, -1, -1):
                if f[j] and s[j:i] in wordDict:
                    f[i] = True
                    break
        return f[-1]
```

