#  [524. 通过删除字母匹配到字典里最长单词](https://leetcode.cn/problems/longest-word-in-dictionary-through-deleting/)

## 题意



## 题解



```c++
class Solution {
public:
    bool check(string & s, string & ds) {
        int p = 0;
        for (auto c : s)
            if (p < ds.size() && c == ds[p]) ++ p;
        return p == ds.size();
    }
    string findLongestWord(string s, vector<string>& d) {
        string res;
        for (auto ds : d) if (check(s, ds)) {
            if (res.empty() || ds.size() > res.size() || ds.size() == res.size() && ds < res)
                res = ds;
        }
        return res;
    }
};
```



```python3

```

