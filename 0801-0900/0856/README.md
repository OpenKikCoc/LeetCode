#  [856. 括号的分数](https://leetcode.cn/problems/score-of-parentheses/)

## 题意



## 题解



```c++

```



```python3
class Solution:
    def scoreOfParentheses(self, s: str) -> int:
        stack = [0]
        for c in s:
            if c == '(':
                stack.append(0)
            else:
                cur = stack.pop()
                stack[-1] += cur * 2 if cur else 1
        return stack[0]
```

