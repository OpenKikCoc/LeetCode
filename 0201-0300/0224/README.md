#  [224. 基本计算器](https://leetcode-cn.com/problems/basic-calculator/)

## 题意



## 题解



```c++
class Solution {
public:
    stack<int> num;
    stack<char> op;
    void eval() {
        auto b = num.top(); num.pop();
        auto a = num.top(); num.pop();
        auto c = op.top(); op.pop();
        int r;
        if (c == '+') r = a + b;
        else r = a - b;
        num.push(r);
    }

    int calculate(string s) {
        for (int i = 0; i < s.size(); ++i) {
            auto c = s[i];
            if (c == ' ') continue;
            if (isdigit(c)) {
                int x = 0, j = i;
                while(j < s.size() && isdigit(s[j])) x = x * 10 + (s[j++] - '0');
                i = j - 1;
                num.push(x);
            } else if (c == '(') op.push(c);
            else if (c == ')') {
                while (op.top() != '(') eval();
                op.pop();
            } else {
                while (!op.empty() && op.top() != '(') eval();
                // 2021 leetcode更新数据
                // -2+ 1
                // 如果当前栈空 压入操作符前先加入0
                if (num.empty()) num.push(0);
                op.push(c);
            }
        }
        while (op.size()) eval();
        return num.top();
    }
};
```



```python
class Solution:
    def calculate(self, s: str) -> int:
        res = 0
        stack = []
        sign = 1
        i = 0
        n = len(s)
        while i < n:
            if s[i] == " ":
                i += 1
            elif s[i] == "-":
                sign = -1
                i += 1
            elif s[i] == "+":
                sign = 1
                i += 1
            elif s[i] == "(":
                stack.append(res)
                stack.append(sign)
                res = 0
                sign = 1
                i += 1
            elif s[i] == ")":
                # print(stack)
                res = res * stack.pop() + stack.pop()
                i += 1
            elif s[i].isdigit():
                tmp = int(s[i])
                i += 1
                while i < n and s[i].isdigit():
                    tmp = tmp * 10 + int(s[i])
                    i += 1
                res += tmp * sign
        return res
```

