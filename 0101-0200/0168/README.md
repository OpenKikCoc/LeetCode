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



```python
# 进制转换题 ： 【除留余数法】 ==> 参照 一个数字如何从10进制 转化到 10进制的。
#  每一次循环里，先取 %，得到当前位的（第一次是个位）数；然后进入下一次循环前， 取 // 
#  10 进制包括数字：0~9； 16 进制包括：0-15；  26 进制应包括：0~25
#  因为 Excel 取值范围为 1~26，故可将 26 进制 逻辑上的 个位、十位、百位…均减 1 映射到 0~25 即可，最后转换为字符。

class Solution:
    def convertToTitle(self, n: int) -> str:
        s = ''
        while n:
            n -= 1
            s = chr(n % 26 + 65) + s
            n = n // 26
        return s
```

