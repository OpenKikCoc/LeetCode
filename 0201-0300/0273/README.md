#  [273. 整数转换英文表示](https://leetcode.cn/problems/integer-to-english-words/)

## 题意



## 题解



```c++
class Solution {
public:
    string num0_19[20] = {
        "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
        "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
        "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen",
        "Nineteen",
    };
    string num20_90[8] = {
        "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
        "Eighty", "Ninety",
    };
    string num1000[4] = {
        "Billion ", "Million ", "Thousand ", "",
    };

    // 返回 1 ~ 999 的英文表示
    string get(int x) {
        string res;
        if (x >= 100) {
            res += num0_19[x / 100] + " Hundred ";
            x %= 100;
        }
        if (x >= 20) {
            res += num20_90[x / 10 - 2] + " ";
            x %= 10;
            if (x) res += num0_19[x] + ' ';
        } else if (x) res += num0_19[x] + ' ';
        return res;
    }

    string numberToWords(int num) {
        if (!num) return "Zero";
        string res;
        for (int i = 1e9, j = 0; i >= 1; i /= 1000, ++ j )
            if (num >= i) {
                res += get(num / i) + num1000[j];
                num %= i;
            }
        res.pop_back();
        return res;
    }
};
```



```python3

```

