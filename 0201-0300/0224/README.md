#  [224. 基本计算器](https://leetcode-cn.com/problems/basic-calculator/)

## 题意



## 题解



```c++
class Solution {
public:
    // 1.
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
                op.push(c);
            }
        }
        while (op.size()) eval();
        return num.top();
    }

    // 2.
    int calculate_2(string s) {
        stack<int> st;
        int res = 0, n = s.size(), sign = 1;
        for(int i = 0; i < n; ++i) {
            int num = 0;
            if(s[i] >= '0') {
                while(i < n && s[i] >= '0') {
                    num = num*10 + (s[i] - '0');
                    ++i;
                }
                --i;
                res += sign * num;
            } else if(s[i] == '+') sign = 1;
            else if(s[i] == '-') sign = -1;
            else if(s[i] == '(') {
                st.push(res);
                st.push(sign);
                res = 0, sign = 1;
            } else if(s[i] == ')') {
                res *= st.top(); st.pop();
                res += st.top(); st.pop();
            }
        }
        return res;
    }
};
```



```python3

```

