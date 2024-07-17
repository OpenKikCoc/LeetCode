#  [394. 字符串解码](https://leetcode.cn/problems/decode-string/)

## 题意



## 题解



```c++
class Solution {
public:
    string dfs(string & s, int & u) {
        string res;
        while (u < s.size() && s[u] != ']') {
            if (s[u] >= 'a' && s[u] <= 'z' || s[u] >= 'A' && s[u] <= 'Z') res += s[u ++ ];
            else if (s[u] >= '0' && s[u] <= '9') {
                int k = u;
                while (s[k] >= '0' && s[k] <= '9') ++ k ;
                int x = stoi(s.substr(u, k - u));
                // 左括号
                u = k + 1;
                string y = dfs(s, u);
                u ++ ;  // 过滤右括号
                while (x -- ) res += y;
            }
        }
        return res;
    }
    string decodeString(string s) {
        int u = 0;
        return dfs(s, u);
    }

    string decodeString_2(string s) {
        string res;
        stack<int> nums;
        stack<string> strs;
        int num = 0, len = s.size();
        for (int i = 0; i < len; ++ i ) {
            if (s[i] >= '0' && s[i] <= '9') num = num * 10 + s[i] - '0';
            else if ((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z')) res.push_back(s[i]);
            else if (s[i] == '[') {
                nums.push(num);
                num = 0;
                strs.push(res);
                res = "";
            } else {
                int times = nums.top();
                nums.pop();
                string top = strs.top();
                strs.pop();
                while (times -- ) top += res;
                res = top;
            }
        }
        return res;
    }
};
```



```python
# 法一：普通递归
class Solution:
    def decodeString(self, s: str) -> str:
        u = 0
        def dfs(s):
            nonlocal u  # 踩坑1：u需要在递归里 进行变化，并且还在本层 有使用到，所有要用nonlocal
            res = ''
            while u < len(s) and s[u] != ']':
                if s[u].isalpha(): #等价于if 'a' <= s[u] <= 'z' or 'A' <= s[u] <= 'Z':
                    res += s[u]
                    u += 1
                elif s[u].isdigit():  #等价于 if '0' <= s[u] <= '1'
                    k = u
                    while s[k].isdigit():
                        k += 1

                    x = int(s[u:k])
                    u = k + 1#跳过左括号
                    y = dfs(s, u)
                    u += 1 #跳过右括号

                    while x:
                        res += y
                        x -= 1
            return res
        return dfs(s)

#法二：辅助栈法 （ 遇到 “括号”类型的题 都可以想到用 栈 这个数据结构来辅助完成）
# 栈里每次存储两个信息（左括号前的字符串，左括号前的数字）；比如abc3[def], 当遇到第一个左括号的时候，压入栈中的是("abc", 3), 然后遍历括号里面的字符串def, 当遇到右括号的时候, 从栈里面弹出一个元素(s1, n1), 得到新的字符串为s1+n1*"def", 也就是abcdefdefdef。对于括号里面嵌套的情况也是同样处理方式。
# 当遇到 左括号 就进行压栈处理；遇到右括号就弹出栈（栈中记录的元素很重要）
class Solution:
    def decodeString(self, s: str) -> str:
        res, multi, stack = '', 0, []
        for c in s:
            if c.isdigit():    
                multi = multi * 10 + int(c)
            elif c == '[':
                stack.append([res, multi])
                res, multi = '', 0 
            elif c == ']':
                last = stack.pop()
                res = last[0] + last[1] * res 
            else:
                res += c 
        return res
```

