#  [12. 整数转罗马数字](https://leetcode-cn.com/problems/integer-to-roman/)

## 题意



## 题解



```c++
class Solution {
public:
    string intToRoman(int num) {
        string res;
        int nums[]{1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        string romans[]{"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        int p = 0;
        while(p < 13) {
            while(num >= nums[p]) num -= nums[p], res += romans[p];
            ++p;
        }
        return res;
    }
};
```



```python3

```

