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

```c++
class Solution {
public:
    bool isValid(string s) {
        stack<char> stk;

        for (auto c : s) {
            if (c == '(' || c == '[' || c == '{') stk.push(c);
            else {
                if (stk.size() && abs(stk.top() - c) <= 2) stk.pop();
                else return false;
            }
        }

        return stk.empty();
    }
};
```


```python
# 把左括号 都加入到stack中，当来了右括号时，右括号的对应值 与 栈顶元素对比：如果相同 就继续对比
# 如果不同，就直接return False 
class Solution:
    def isValid(self, s: str) -> bool:
        my_dict = {")":"(", "}":"{", "]":"["}
        stack = []
        for c in s:
            if c not in my_dict:   # 把左括号 都加入到栈中
                stack.append(c)
            elif not stack or my_dict[c] != stack.pop(): # 踩坑：需要先判断stack不为空
                return False 
        return not stack
```

