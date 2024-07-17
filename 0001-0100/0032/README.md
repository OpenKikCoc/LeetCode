#  [32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/)

## 题意



## 题解

```c++
class Solution {
public:
    int longestValidParentheses(string s) {
        int n = s.size();
        vector<int> f(n + 1);
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            if (s[i - 1] == ')') {
                if (i - 1 >= 1 && s[i - 2] == '(')
                    f[i] = f[i - 2] + 2;
                else if (i - 2 - f[i - 1] >= 0 && s[i - 2 - f[i - 1]] == '(')
                    f[i] = f[i - 2 - f[i - 1]] + f[i - 1] + 2;
                res = max(res, f[i]);
            }
        return res;
    }
};
```



```c++
class Solution {
public:
    int longestValidParentheses(string s) {
        int n = s.size();
        vector<int> f(n+1);
        f[0] = 0;   // f[1] = 1;
        int res = 0;
        for(int i = 2; i <= n; ++i) {
            if(s[i-1] == ')') {
                if(s[i-2] == '(') f[i] = f[i-2] + 2;
                else if(i-2-f[i-1] >= 0 && s[i-2-f[i-1]] == '(') f[i] = f[i-1] + f[i-2-f[i-1]] + 2;
            }
            res = max(res, f[i]);
        }
        return res;
    }
};
```



**思路1**

**动态规划**

1. 状态表示：f(i) 为以 i 为结尾的最长合法子串；初始时，f(0) = 0

2. 状态转移时，我们仅考虑当前字符是 ) 的时候。因为如果当前字符是"("，f[i] == 0

   1）如果上一个字符是"("，即字符串的形式是"...()"，那么f(i) = f(i − 2) + 2

   2）如果上一个字符是"("，即字符串的形式是"...))"，则需要判断i-f[i-1]-1的位置是够是左括号，这个位置是以s[i-1]结尾的最长合法括号长度，如果是"("，即 "...((合法))"，则可以转移:

   ​	f(i) = f(i − 1) + 2 + f(i − f(i − 1) − 2)。

3. 最终答案为动规数组中的最大值。

```python
"""
1. 状态表示：f(i) 为以 i 为结尾的最长合法子串；初始时，f(0)=0
2. 状态转移时，我们仅考虑当前字符是 ) 的时候。如果上一个字符是 (，即 ...() 结尾的情况，则 f(i)=f(i−1)+2。
3. 如果上一个字符是 )，即 ...)) 的情况，则我们通过上一个字符的动规结果，判断是否能匹配末尾的 )。
		判断 s[i - f(i - 1) - 2] 是 (，即 ...((合法))，则可以转移 f(i)=f(i−1)+2+f(i−f(i−1)−2)。
最终答案为动规数组中的最大值。

"""

class Solution:
    def longestValidParentheses(self, s: str) -> int:
        n = len(s)
        f = [0] * (n + 1)
        f[0] = 0
        res = 0
        for i in range(2, n + 1):
            if s[i-1] == ')':
                if s[i-2] == '(':
                    f[i] = f[i-2] + 2
                elif i - 2 - f[i-1] >= 0 and s[i-2-f[i-1]] == '(':
                    f[i] = f[i-1] + f[i-2-f[i-1]] + 2
            res = max(res, f[i])
        return res
      
```



**思路2**

**栈模拟**

使用栈来模拟操作。栈顶保存当前扫描的时候，当前合法序列前的一个位置位置下标是多少。初始时栈中元素为-1。然后遍历整个字符串

如果s[i] =='('，那么把i进栈。
如果s[i] == ')',那么弹出栈顶元素 （代表栈顶的左括号匹配到了右括号）
如果此时栈为空，将i进栈。说明之前没有与之匹配的左括号，那么就将当前的位置入栈。
否则，i - st[-1]就是当前右括号对应的合法括号序列长度。

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        n = len(s)
        res = 0
        stack = []
        stack.append(-1)
        for i in range(n):
            if s[i] == '(':
                stack.append(i)
            else:
                stack.pop()
                if not stack:
                    stack.append(i)
                else:
                    res = max(res, i - stack[-1])
        return res
```

