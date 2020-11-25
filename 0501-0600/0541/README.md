#  [541. 反转字符串 II](https://leetcode-cn.com/problems/reverse-string-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    string reverseStr(string s, int k) {
        for (int i = 0; i < s.size(); i += 2 * k)
            reverse(s.begin() + i, min(s.begin() + k + i, s.end()));
        return s;
    }
};
```



```python3

```

