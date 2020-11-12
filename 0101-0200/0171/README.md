#  [171. Excel表列序号](https://leetcode-cn.com/problems/excel-sheet-column-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int titleToNumber(string s) {
        int res = 0;
        for(auto & c : s) {
            int v = c - 'A' + 1;
            res = res * 26 + v;
        }
        return res;
    }
};
```



```python3

```

