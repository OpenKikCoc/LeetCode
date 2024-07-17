#  [482. 密钥格式化](https://leetcode.cn/problems/license-key-formatting/)

## 题意



## 题解



```c++
class Solution {
public:
    string licenseKeyFormatting(string S, int K) {
        string s, res;
        for (auto c : S) if (c != '-') {c = toupper(c); s.push_back(c);}
        int cnt = 0;
        for (int i = s.size() - 1; i >= 0; -- i ) {
            res.push_back(s[i]);
            if ( ++ cnt == K) res.push_back('-'), cnt = 0;
        }
        if (!res.empty() && res.back() == '-') res.pop_back();
        reverse(res.begin(), res.end());
        return res;
    }
};


class Solution {
public:
    string licenseKeyFormatting(string S, int K) {
        string s;
        for (auto c: S)
            if (c != '-')
                s += c;
        string res;
        for (int i = 0; i < s.size() % K; i ++ ) res += toupper(s[i]);
        for (int i = s.size() % K; i < s.size();) {
            if (res.size()) res += '-';
            for (int j = 0; j < K; j ++ )
                res += toupper(s[i ++ ]);
        }
        return res;
    }
};
```



```python3

```

