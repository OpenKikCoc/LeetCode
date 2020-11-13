#  [290. 单词规律](https://leetcode-cn.com/problems/word-pattern/)

## 题意



## 题解



```c++
class Solution {
public:
    bool wordPattern(string pattern, string str) {
        vector<string> ws;
        string w;
        stringstream ssin(str);
        while (ssin >> w) ws.push_back(w);
        if (pattern.size() != ws.size()) return false;
        unordered_map<char, string> pw;
        unordered_map<string, char> wp;
        for (int i = 0; i < pattern.size(); ++ i ) {
            auto p = pattern[i];
            auto w = ws[i];
            if (pw.count(p) && pw[p] != w) return false;
            pw[p] = w;
            if (wp.count(w) && wp[w] != p) return false;
            wp[w] = p;
        }
        return true;
    }
};
```



```python3

```

