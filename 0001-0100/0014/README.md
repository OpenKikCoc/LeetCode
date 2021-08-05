#  [14. 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)

## 题意



## 题解



```c++
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        int n = strs.size();
        if (!n) return "";
        sort(strs.begin(), strs.end());
        string res;
        for (int i = 0; i < strs[0].size(); ++ i ) {
            if (strs[0][i] == strs[n - 1][i]) res.push_back(strs[0][i]);
            else break;
        }
        return res;
    }
};
```

或不排序

```c++
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        string res;
        if (strs.empty()) return res;

        for (int i = 0;; i ++ ) {
            if (i >= strs[0].size()) return res;
            char c = strs[0][i];
            for (auto& str: strs)
                if (str.size() <= i || str[i] != c)
                    return res;
            res += c;
        }

        return res;
    }
};
```



```python
# 先找出数组中字典序最小和最大的字符串，最长公共前缀即为这两个字符串的公共前缀

class Solution:
    def longestCommonPrefix(self, s: List[str]) -> str:
        if not s:return ""
        s.sort()
        n = len(s)
        a, b = s[0], s[n-1]
        res = ""
        for i in range(len(a)):
            if i < len(b) and a[i] == b[i]:
                res += a[i]
            else:
                break
        return res
```

