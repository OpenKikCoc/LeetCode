#  [131. 分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/)

## 题意



## 题解



```c++
class Solution {
public:
    int n;
    vector<vector<string>> res;
    vector<string> t;
    bool check(string& s) {
        int l = 0, r = s.size()-1;
        while(l < r && s[l] == s[r]) ++l, --r;
        return s[l] == s[r];
    }
    void dfs(string& s, int l) {
        if(l == n) {
            res.push_back(t);
            return;
        }
        for(int i = l+1; i <= n; ++i) {
            string sub = s.substr(l, i-l);
            if(check(sub)) {
                t.push_back(sub);
                dfs(s, i);
                t.pop_back();
            }
        }
    }
    vector<vector<string>> partition(string s) {
        this->n = s.size();
        dfs(s, 0);
        return res;
    }
};
```



```python3

```

