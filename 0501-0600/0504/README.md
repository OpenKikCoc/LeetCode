#  [504. 七进制数](https://leetcode-cn.com/problems/base-7/)

## 题意



## 题解



```c++
class Solution {
public:
    string convertToBase7(int num) {
        if (!num) return "0";
        bool is_neg = num < 0;
        num = abs(num);
        string res;
        while (num) res += to_string(num % 7), num /= 7;
        reverse(res.begin(), res.end());
        if (is_neg) res = '-' + res;
        return res;
    }
};
```



```python3

```

