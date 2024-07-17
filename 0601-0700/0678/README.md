#  [678. 有效的括号字符串](https://leetcode.cn/problems/valid-parenthesis-string/)

## 题意



## 题解



```c++
class Solution {
public:
    bool checkValidString(string s) {
        // 栈存的都是左括号 所以本质上只用常量存左括号数量即可
        // * 考虑其影响左括号数量的范围
        // low high 存左括号数量范围
        int low = 0, high = 0;
        for (auto c : s) {
            if (c == '(')
                ++ low , ++ high ;
            else if (c == ')')
                -- low , -- high ;
            else
                -- low , ++ high ;
            low = max(low, 0);
            if (low > high)
                return false;
        }
        return !low;
    }
};
```



```python3

```

