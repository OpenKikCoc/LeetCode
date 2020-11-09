#  [7. 整数反转](https://leetcode-cn.com/problems/reverse-integer/)

## 题意



## 题解



```c++
class Solution {
public:
    int reverse(int x) {
        int res = 0;
        while(x) {
            int v = x % 10; x /= 10;
            if(res > INT_MAX / 10 || res == INT_MAX / 10 && v > 7) return 0;
            if(res < INT_MIN / 10 || res == INT_MIN / 10 && v > 8) return 0;
            res = res * 10 + v;
        }
        return res;
    }
};
```



```python3

```

