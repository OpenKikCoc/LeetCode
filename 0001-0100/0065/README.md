#  [65. 有效数字](https://leetcode-cn.com/problems/valid-number/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isNumber(string s) {
        int len = s.size();
        int p = 0, d1 = 0, dot = 0, d2 = 0, e = 0, d3 = 0;
        while(p < len && s[p] == ' ') ++p;
        if(s[p] == '-' || s[p] == '+') {
            ++p;
        }
        while(p < len && s[p] >= '0' && s[p] <= '9') {
            d1 = ++p;
        }
        if(p < len && s[p] == '.') {
            dot = ++p;
            while(p<len && s[p] >= '0' && s[p] <= '9') {
                d2 = ++p;
            }
        }
        if(dot && !d1 && !d2) return false;
        if(p<len && (d1||d2) && s[p]=='e') e = ++p;
        if(p<len && e && (s[p]=='+'|s[p]=='-')) ++p;
        while(p<len && s[p] >= '0' && s[p] <= '9') {
                d3 = ++p;
        }
        if(e && (!(d1||d2) || !d3)) return false;
        while(p<len && s[p] == ' ') ++p;
        if(!d1 && !d2) return false;
        return p==len;
    }
};



class Solution {
public:
    bool isNumber(string s) {
        int i = 0;
        while (i < s.size() && s[i] == ' ') i ++ ;

        bool numberic = scanInteger(s, i);

        // scanUnsignedInteger scanInteger 必须放前面
        // 避免短路原则导致 i 没有 ++ 
        if (s[i] == '.') numberic = scanUnsignedInteger(s,  ++ i) || numberic;
        if (s[i] == 'e' || s[i] == 'E') numberic = scanInteger(s,  ++ i) && numberic;

        while (i < s.size() && s[i] == ' ') i ++ ;

        return numberic && i == s.size();
    }

    bool scanInteger(string& s, int& pos) {
        if (s[pos] == '+' || s[pos] == '-') pos ++ ;
        return scanUnsignedInteger(s, pos);
    }

    bool scanUnsignedInteger(string& s, int& pos) {
        int p = pos;
        while (pos < s.size() && s[pos] >= '0' && s[pos] <= '9') pos ++ ;
        return pos > p;
    }
};
```



```python3

```

