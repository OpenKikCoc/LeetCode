#  [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

## 题意



## 题解



```c++
class Solution {
public:
    bool match(char a, char b) {
        if(a == '(') return b == ')';
        else if(a == '[') return b == ']';
        else if(a == '{') return b == '}';
        return false;
    }
    bool isValid(string s) {
        stack<char> st;
        for(int i = 0; i < s.size(); ++i) {
            char c = s[i];
            if(!st.empty() && match(st.top(), c)) st.pop();
            else st.push(c);
        }
        return st.empty();
    }
};
```



```python3

```

