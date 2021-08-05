#  [65. 有效数字](https://leetcode-cn.com/problems/valid-number/)

## 题意



## 题解

只留更标准的写法

```c++
class Solution {
public:
    int n;

    bool scanUnsignedInt(string & s, int & i) {
        int p = i;
        while (i < n && isdigit(s[i]))
            i ++ ;
        return i > p;
    }

    bool scanInt(string & s, int & i) {
        if (i < n && (s[i] == '+' || s[i] == '-'))
            i ++ ;
        return scanUnsignedInt(s, i);
    }

    bool isNumber(string s) {
        this->n = s.size();
        int i = 0;

        while (i < n && s[i] == ' ')
            i ++ ;
        
        bool flag = scanInt(s, i);
        // scanUnsignedInteger scanInteger 必须放前面
        // 避免短路原则导致 i 没有 ++ 
        if (i < n && s[i] == '.')
            flag = scanUnsignedInt(s, ++ i) || flag ;
        if (i < n && (s[i] == 'e' || s[i] == 'E'))
            flag = scanInt(s, ++ i) && flag;
        
        while (i < n && s[i] == ' ')
            i ++ ;

        return flag && i == n;
    }
};
```



```python3

```

