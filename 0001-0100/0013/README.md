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



```python3

```

