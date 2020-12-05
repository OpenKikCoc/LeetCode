#  [592. 分数加减运算](https://leetcode-cn.com/problems/fraction-addition-and-subtraction/)

## 题意



## 题解



```c++
class Solution {
public:
    string fractionAddition(string expression) {
        int n = 0;
        for (auto c :expression)
            if (c == '/')
                ++ n;
        expression = '+' + expression;
        // 初始 0/1
        int a = 0, b = 1, offset = 0;
        int c, d;
        char e;
        for (int i = 0; i < n; ++ i ) {
            // 对于 +-3/15 e读取+ c读-3 d读15
            // 对于  3/15  e读取+ c读3 d读15
            sscanf(expression.c_str() + offset, "%c%d/%d", &e, &c, &d);
            offset += (e + to_string(c) + '/' + to_string(d)).size();
            if (e == '-') c = -c;
            // x 分子     y 分母
            int x = a * d + b * c, y = b * d;
            int z = __gcd(x, y);
            a = x / z, b = y / z;
        }
        if (b < 0) a = -a, b = -b;
        return to_string(a) + '/' + to_string(b);
    }
};
```



```python3

```

