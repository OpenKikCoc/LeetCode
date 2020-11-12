#  [168. Excel表列名称](https://leetcode-cn.com/problems/excel-sheet-column-title/)

## 题意



## 题解



```c++
class Solution {
public:
    string convertToTitle(int n) {
        string res;
        while(n) {
            int mod = (n-1) % 26;
            res.push_back('A' + mod);
            n = (n-1) / 26;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```



```python3

```

