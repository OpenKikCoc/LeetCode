#  [722. 删除注释](https://leetcode.cn/problems/remove-comments/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> removeComments(vector<string>& source) {
        string str;
        for (auto& s: source) str += s + '\n';
        vector<string> res;
        string line;

        int n = str.size();
        for (int i = 0; i < n; ) {
            if (i + 1 < n && str[i] == '/' && str[i + 1] == '/') {
                while (str[i] != '\n') i ++ ;
            } else if (i + 1 < n && str[i] == '/' && str[i + 1] == '*') {
                i += 2;
                while (str[i] != '*' || str[i + 1] != '/') i ++ ;
                i += 2;
            } else if (str[i] == '\n') {
                if (line.size()) {
                    res.push_back(line);
                    line.clear();
                }
                i ++ ;
            } else {
                line += str[i];
                i ++ ;
            }
        }
        return res;
    }
};
```



```python3

```

