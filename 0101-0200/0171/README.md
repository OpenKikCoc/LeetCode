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



```python
# 进制转换，类比其他进制怎么转换的。同理，需要注意的是 这里A 代表 1.（而不是0）
class Solution:
    def titleToNumber(self, s: str) -> int:
        res = 0
        for x in s:
            res *= 26
            res += ord(x) - 65 + 1
        return res
```

