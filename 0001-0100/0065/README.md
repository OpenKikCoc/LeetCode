#  [65. 有效数字](https://leetcode.cn/problems/valid-number/)

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



```python
# python3
# (模拟) O(n)
# 这道题边界情况很多，首先要考虑清楚的是有效的数字格式是什么，这里用A[.[B]][e|EC]或者.B[e|EC]表示，其中A和C都是整数(可以有正负号也可以没有)，B是无符号整数。

# 那么我们可以用两个辅助函数来检查整数和无符号整数的情况，从头到尾扫一遍字符串然后分情况判断，注意这里要传数字的引用或者用全局变量。


class Solution:
    def isNumber(self, s: str) -> bool:
        n = len(s)
        i = 0

        # 用来判断是否存在正数
        def scanUnsignedInt():
            # 用 nonlocal 踩坑，不能把 i 放进函数里传递
            nonlocal i  
            p = i 
            while i < n and s[i].isdigit():
                i += 1
            return p < i
        
        # 用来判断是否存在整数
        def scanInt():
            nonlocal i
            if i < n and (s[i] == '+' or s[i] == '-'):
                i += 1
            return scanUnsignedInt()

        while i < n and s[i] == ' ':
            i += 1

        flag = scanInt()
        if i < n and s[i] == '.':
            i += 1
            flag = scanUnsignedInt() or flag
        if i < n and (s[i] == 'e' or s[i] == 'E'):
            i += 1
            flag = scanInt() and flag

        while i < n and s[i] == ' ':
            i += 1
        return flag and i == n
```

