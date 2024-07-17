#  [693. 交替位二进制数](https://leetcode.cn/problems/binary-number-with-alternating-bits/)

## 题意



## 题解



```c++
class Solution {
public:
    bool hasAlternatingBits(int n) {
        for (int i = 1; 1ll << i <= n; i ++ ) {
            int a = n >> i - 1 & 1;
            int b = n >> i & 1;
            if (a == b) return false;
        }
        return true;
    }
};
```

旧代码

```c++
class Solution {
public:
    bool hasAlternatingBits(int n) {
        n = (n ^ (n >> 1));               // 若合法 经过本操作变为全1
        return (n & ((long)n + 1)) == 0;  // +1 首位为1后面全0
    }
};
```





```python3

```

