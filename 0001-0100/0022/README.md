#  [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> res;
    void dfs(int n, int l, int r, string now) {
        //cout <<l<<" "<<r<<" "<<now<<endl;
        if(l == n && r == n) {
            res.push_back(now);
            return;
        }
        if(l > r) {
            string next = now;
            next.push_back(')');
            dfs(n, l, r+1, next);
        }
        if(l < n) {
            string next = now;
            next.push_back('(');
            dfs(n, l+1, r, next);
        }
    }
    vector<string> generateParenthesis(int n) {
        dfs(n, 0, 0, "");
        return res;
    }
};
```



```python3

```

