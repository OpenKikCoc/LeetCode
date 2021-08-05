#  [32. 最长有效括号](https://leetcode-cn.com/problems/longest-valid-parentheses/)

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



```python3

```

