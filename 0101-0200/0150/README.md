#  [150. 逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

## 题意



## 题解



```c++
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> stk;
        for (auto &t : tokens)
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                int a = stk.top();
                stk.pop();
                int b = stk.top();
                stk.pop();
                if (t == "+") stk.push(a + b);
                else if (t == "-") stk.push(b - a);
                else if (t == "*") stk.push(a * b);
                else stk.push(b / a);
            }
            else stk.push(atoi(t.c_str()));
            // else stk.push(stoi(t));
        return stk.top();
    }
};
```



```python
# 后续遍历
# 遍历所有元素。用一个栈来实现整个序列。如果当前元素是整数，那就压入栈；如果是运算符，则将栈顶两个元素弹出作出相应运算，再将结果入栈。

class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        def eval(s):
            a = int(stack.pop())
            b = int(stack.pop())
            if s == '+':
                stack.append(b+a)
            elif s == '-':
                stack.append(b-a)
            elif s == '*':
                stack.append(b*a)
            else:
                stack.append(int(b/a))
        
        stack = []
        for t in tokens:
            if t == "+" or t == "-" or t == "*" or t == "/":
                eval(t)
            else:
                stack.append(int(t))
        return stack[-1]
```

