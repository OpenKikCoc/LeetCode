#  [557. 反转字符串中的单词 III](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)

## 题意



## 题解



```c++
class Solution {
public:
    string reverseWords(string s) {
        string res;
        stringstream ss(s);
        while (ss >> s) {
            reverse(s.begin(), s.end());
            if (!res.empty()) res += ' ';
            res += s;
        }
        return res;
    }
};
```



```python3

```

