#  [8. 字符串转换整数 (atoi)](https://leetcode-cn.com/problems/string-to-integer-atoi/)

## 题意



## 题解



```c++
class Solution {
public:
    int myAtoi(string s) {
        int n = s.size();
        int p = 0, f = 1;
        while(p < n && s[p] == ' ') ++p;
        if(s[p] == '+') ++p;
        else if(s[p] == '-') f = -1, ++p;
        int res = 0;
        while(p < n && isdigit(s[p])) {
            int v = s[p] - '0';
            if(res > INT_MAX / 10 || res == INT_MAX / 10 && v > 7) return INT_MAX;
            if(res < INT_MIN / 10 || res == INT_MIN / 10 && v > 8) return INT_MIN;
            res = res * 10 + f * v;
            ++p;
        }
        return res;
    }
};
```



```python3

```

