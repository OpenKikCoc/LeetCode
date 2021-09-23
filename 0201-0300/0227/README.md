#  [227. 基本计算器 II](https://leetcode-cn.com/problems/basic-calculator-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    stack<int> num;
    stack<char> op;

    void eval() {
        int b = num.top(); num.pop();
        int a = num.top(); num.pop();
        char c = op.top(); op.pop();
        int r;
        if (c == '+') r = a + b;
        else if (c == '-') r = a - b;
        else if (c == '*') r = a * b;
        else r = a / b;
        num.push(r);
    }

    int calculate(string s) {
        unordered_map<char, int> pr;
        pr['+'] = pr['-'] = 1, pr['*'] = pr['/'] = 2;
        for (int i = 0; i < s.size(); i ++ ) {
            char c = s[i];
            if (c == ' ') continue;
            if (isdigit(c)) {
                int x = 0, j = i;
                while (j < s.size() && isdigit(s[j])) x = x * 10 + (s[j ++ ] - '0');
                num.push(x);
                i = j - 1;
            } else {
                while (op.size() && pr[op.top()] >= pr[c]) eval();
                op.push(c);
            }
        }
        while (op.size()) eval();
        return num.top();
    }
};
```



```python
"""
(栈) O(n)
这道题主要是需要考虑加减和乘除的优先级问题，用栈来处理，遇到加减就把数字压栈，遇到乘除就把栈顶弹出，与数字进行乘除处理。主要注意的是运算符是放在两个数字的中间，而我们想要的是在遇到运算符时，用于运算的两个数字已经被解析出来了，因此用sign来记录前一个运算符，在遇到一个新的运算符或者到字符串的结尾时再考虑对前一个运算符进行处理。
"""
class Solution:
    def calculate(self, s: str) -> int:
        nums = []
        ops = []
        i = 0
        while i < len(s):
            if s[i] == " ":
                i += 1
            elif s[i] in ["+","-","*","/"]:
                ops.append(s[i])
                i += 1
            else:
                a = 0
                while i < len(s) and "0" <= s[i] <= "9":
                    a *= 10
                    a += int(s[i])
                    i += 1
                if ops:
                    if ops[-1] == "*":
                        nums[-1] *= a
                        ops.pop()
                    elif ops[-1] == "/":
                        nums[-1] = int(nums[-1] / a)
                        ops.pop()
                    else:
                        nums.append(a)
                else:
                    nums.append(a)
        for i in range(len(ops)):
            if ops[i] == "+":
                nums[0] += nums[i + 1]
            else:
                nums[0] -= nums[i + 1]
        return nums[0]
```

