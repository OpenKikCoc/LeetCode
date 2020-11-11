#  [150. 逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

## 题意



## 题解



```c++
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> sta;
        for (auto &t : tokens)
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                int a = sta.top();
                sta.pop();
                int b = sta.top();
                sta.pop();
                if (t == "+") sta.push(a + b);
                else if (t == "-") sta.push(b - a);
                else if (t == "*") sta.push(a * b);
                else sta.push(b / a);
            }
            else sta.push(atoi(t.c_str()));
        return sta.top();
    }
};
```



```python3

```

