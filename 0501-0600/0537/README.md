#  [537. 复数乘法](https://leetcode-cn.com/problems/complex-number-multiplication/)

## 题意



## 题解



```c++
class Solution {
public:
    string complexNumberMultiply(string a, string b) {
        int x1, y1, x2, y2;
        sscanf(a.c_str(), "%d+%di", &x1, &y1);
        sscanf(b.c_str(), "%d+%di", &x2, &y2);
        return to_string(x1 * x2 - y1 * y2) + "+" + to_string(x1 * y2 + x2 * y1) + "i";
    }
};
```



```python3

```

