#  [13. 罗马数字转整数](https://leetcode-cn.com/problems/roman-to-integer/)

## 题意



## 题解



```c++
class Solution {
public:
    int getValue(char c) {
        if (c == 'I') return 1;
        else if (c == 'V') return 5;
        else if (c == 'X') return 10;
        else if (c == 'L') return 50;
        else if (c == 'C') return 100;
        else if (c == 'D') return 500;
        else return 1000;
        //else if (c == 'M') return 1000;
    }
    int romanToInt(string s) {
        int len = s.size();
        int res = 0, tl, tr;
        for (int i = 0; i < len-1; ++i) {
            tl = getValue(s[i]);
            tr = getValue(s[i+1]);
            if (tl < tr) res -= tl;
            else res += tl;
        }
        res += getValue(s[len-1]);
        return res;
    }
};
```



```python
# 定义映射，将单一字母映射到数字。
# 从前往后扫描，如果发现 s[i+1] 的数字比 s[i] 的数字大，res减去当前数；否则直接累计 s[i] 的值。
# 最后一个数字一定是加上去的，所以第一个if判断里 要加一个条件 i + 1 < n
class Solution:
    def romanToInt(self, s: str) -> int:
        my_dict = {'I' : 1, 'V' : 5, 'X' : 10, 'L' : 50, 'C' : 100, 'D' : 500, 'M' : 1000}
        n = len(s)
        res = 0

        for i in range(n):
            if i+1 < n and my_dict[s[i]] < my_dict[s[i+1]]:  # 踩坑：i+1 < n这里要记得
                res -= my_dict[s[i]]
            else:
                res += my_dict[s[i]]
        return res
```

