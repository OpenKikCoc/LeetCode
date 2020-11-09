#  [14. 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)

## 题意



## 题解



```c++
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        int n = strs.size();
        if(!n) return "";
        sort(strs.begin(), strs.end());
        string res;
        for(int i = 0; i < strs[0].size(); ++i) {
            if(strs[0][i] == strs[n-1][i]) res.push_back(strs[0][i]);
            else break;
        }
        return res;
    }
};
```



```python3

```

