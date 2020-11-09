#  [17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> mp{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    vector<string> res;
    string t;
    void dfs(string& digits, int pos) {
        if(pos == digits.size()) {
            // 处理输入是 [""] 空的情况
            // if(!t.empty()) 
            res.push_back(t);
            return;
        }
        for(auto c : mp[digits[pos]-'0']) {
            t.push_back(c);
            dfs(digits, pos+1);
            t.pop_back();
        }
    }
    vector<string> letterCombinations(string digits) {
        if(digits.empty()) return vector<string>{};
        dfs(digits, 0);
        return res;
    }
};
```



```python3

```

