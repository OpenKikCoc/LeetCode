#  [343. 整数拆分](https://leetcode-cn.com/problems/integer-break/)

## 题意



## 题解



```c++
class Solution {
public:
    int integerBreak(int n) {
        if(n < 3) return 1;
        else if(n == 3) return 2;
        int res = 1;
        if(n%3 == 1) n -= 4, res *= 4;
        while(n >= 3) n -= 3, res *= 3;
        if(n) res *= n;
        return res;
    }
};
```



```python3

```

