#  [394. 字符串解码](https://leetcode-cn.com/problems/decode-string/)

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



```python3

```

