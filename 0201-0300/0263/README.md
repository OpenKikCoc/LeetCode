#  [263. 丑数](https://leetcode-cn.com/problems/ugly-number/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isUgly(int num) {
        if (num <= 0) return false;
        while (num % 2 == 0) num /= 2;
        while (num % 3 == 0) num /= 3;
        while (num % 5 == 0) num /= 5;
        return num == 1;
    }
};
```



```python3

```

