#  [301. 删除无效的括号](https://leetcode-cn.com/problems/remove-invalid-parentheses/)

## 题意



## 题解

### 括号匹配问题两个原则

-   左右括号数量相同
-   对于任意前缀，左括号数量都大于等于右括号数量

风格一致的写法

```c++
class Solution {
public:
    vector<string> ans;

    vector<string> removeInvalidParentheses(string s) {
        // l 代表左括号比右括号多的个数(不计要删的右括号)
        // r 代表需要删除的右括号个数
        int l = 0, r = 0;
        for (auto x: s)
            if (x == '(') l ++ ;
            else if (x == ')') {
                if (l == 0) r ++ ;
                else l -- ;
            }

        dfs(s, 0, "", 0, l, r);
        return ans;
    }

    void dfs(string& s, int u, string path, int cnt, int l, int r) {
        if (u == s.size()) {
            if (!cnt) ans.push_back(path);
            return;
        }

        if (s[u] != '(' && s[u] != ')') dfs(s, u + 1, path + s[u], cnt, l, r);
        else if (s[u] == '(') {
            int k = u;
            while (k < s.size() && s[k] == '(') k ++ ;
            l -= k - u;
            // 剪枝: 枚举删除多少个括号字符 而非在哪个位置删除
            for (int i = k - u; i >= 0; i -- ) {
                if (l >= 0) dfs(s, k, path, cnt, l, r);
                path += '(';
                cnt ++, l ++ ;
            }
        } else if (s[u] == ')') {
            int k = u;
            while (k < s.size() && s[k] == ')') k ++ ;
            r -= k - u;
            for (int i = k - u; i >= 0; i -- ) {
                // cnt >= 0 : 必须时刻满足当前已有的左括号数量大于等于右括号数量
                if (cnt >= 0 && r >= 0) dfs(s, k, path, cnt, l, r);
                path += ')';
                cnt --, r ++ ;
            }
        }
    }
};
```





```c++
class Solution {
public:
    bool isvalid(string s) {
        int cnt = 0;
        for (auto c : s) {
            if (c == '(') cnt ++ ;
            else if (c == ')') {
                cnt -- ;
                if (cnt < 0) return false;
            }
        }
        return cnt == 0;
    }

    void dfs(string s, int st, int l, int r, vector<string>& ans) {
        if (l == 0 && r == 0) {
            if (isvalid(s)) ans.push_back(s);
            return;
        }
        for (int i = st; i < s.size(); ++ i ) {
            if (i != st && s[i] == s[i - 1]) continue;
            if (s[i] == '(' && l > 0)
                dfs(s.substr(0, i) + s.substr(i + 1, s.size() - 1 - i), i, l - 1, r, ans);
            if (s[i] == ')' && r > 0)
                dfs(s.substr(0, i) + s.substr(i + 1, s.size() - 1 - i), i, l, r - 1, ans);
        }
    }

    vector<string> removeInvalidParentheses(string s) {
        int left = 0, right = 0;
        vector<string> ans;

        for (auto c : s) {
            if (c == '(')
                left ++ ;
            else if (c == ')') {
                if (left > 0)
                    left -- ;
                else
                    right++;
            }
        }
        // left和right表示左右括号要删除的个数
        dfs(s, 0, left, right, ans);
        return ans;
    }
};
```



```python3

```

