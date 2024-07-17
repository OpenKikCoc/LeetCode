#  [8. 字符串转换整数 (atoi)](https://leetcode.cn/problems/string-to-integer-atoi/)

## 题意



## 题解



```c++
class Solution {
public:
    int myAtoi(string s) {
        int n = s.size();
        int p = 0, f = 1;
        while (p < n && s[p] == ' ') ++ p ;
        if (s[p] == '+') ++ p ;
        else if (s[p] == '-') f = -1, ++ p ;
        int res = 0;
        while (p < n && isdigit(s[p])) {
            int v = s[p] - '0';
            if (res > INT_MAX / 10 || res == INT_MAX / 10 && v > 7) return INT_MAX;
            if (res < INT_MIN / 10 || res == INT_MIN / 10 && v > 8) return INT_MIN; // ATTENTION > 8
            res = res * 10 + f * v;
            ++ p ;
        }
        return res;
    }
};
```



```python
# # python3
# 该学习的地方：用sign来区分 正负数
# 用一个 sign 来表示 这是一个 正数 【sign = 1】还是 负数 【sign = -1】 
# 1. 先去掉前面的空格
# 2. 再判断 空格 后的第一个字符是不是‘+‘ / ’-‘ ，如果是负数的话，要把 sign = -1
# 3. 开始循环，只有当 s[i] 在【0，9】之间才会加入到结果中。用num=0【非法情况 也是返回0，所以可以初始化位0】
# 4. 计算完成后要根据 sign 判断当前数 是 正数 还是 负数；最后再判断是否超出范围。返回结果即可。

class Solution:
    def strToInt(self, s: str) -> int:
        i, sign = 0, 1
        while i < len(s) and s[i] == ' ':i += 1

        if i < len(s) and s[i] == '+':
            i += 1
        elif i < len(s) and s[i] == '-':
            i += 1 
            sign = -1
        
        num = 0
        while i < len(s) and '0' <= s[i] <= '9':
            num = num * 10 + int(s[i])
            i += 1
        

        num *= sign
        maxv = (1 << 31)

        if num > 0 and num > maxv - 1:
            num = maxv - 1 
        if num < 0 and num < -maxv:
            num = -maxv
        return num
```

