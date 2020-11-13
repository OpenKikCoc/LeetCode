#  [301. 删除无效的括号](https://leetcode-cn.com/problems/remove-invalid-parentheses/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isvalid(string s) {
        int cnt = 0;
        for (auto c : s) {
            if (c == '(') cnt++;
            else if (c == ')') {
                cnt--;
                if (cnt < 0) return false;
            }
        }
        return cnt == 0;
    }

    void dfs(string s, int st, int l, int r, vector<string>& ans) {
        if(l == 0 && r == 0) {
            if(isvalid(s)) ans.push_back(s);
            return;
        }
        for(int i = st; i < s.size(); ++i) {
            if(i != st && s[i] == s[i-1]) continue;
            if(s[i] == '(' && l > 0)
                dfs(s.substr(0, i) + s.substr(i+1, s.size()-1-i), i, l - 1, r, ans);
            if(s[i] == ')' && r > 0)
                dfs(s.substr(0, i) + s.substr(i+1, s.size()-1-i), i, l, r - 1, ans);
        }
    }

    vector<string> removeInvalidParentheses(string s) {
        int left = 0;
        int right = 0;
        vector<string> ans;

        for(auto c : s) {
            if(c == '(') left++;
            else if (c == ')') {
                if (left > 0) left--;
                else right++;
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

