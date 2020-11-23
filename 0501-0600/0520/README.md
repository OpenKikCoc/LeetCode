#  [520. 检测大写字母](https://leetcode-cn.com/problems/detect-capital/)

## 题意



## 题解



```c++
class Solution {
public:
    bool check(char c) {
        return c >= 'A' && c <= 'Z';
    }
    bool detectCapitalUse(string word) {
        int s = 0;
        for (auto c : word)
            if (check(c)) ++ s ;
        return s == word.size() || !s || s == 1 && check(word[0]);
    }
};
```



```python3

```

