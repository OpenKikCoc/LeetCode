#  [504. 七进制数](https://leetcode-cn.com/problems/base-7/)

## 题意



## 题解



```c++
class Solution {
public:
    string convertToBase7(int num) {
        if (!num) return "0";
        bool negative = false;
        if (num < 0) negative = true, num = - num;
        string res;
        while (num) {
            int v = num % 7;
            res.push_back('0' + v);
            num /= 7;
        }
        reverse(res.begin(), res.end());
        return negative ? '-' + res : res;
    }
};
```



```python3

```

