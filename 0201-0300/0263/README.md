#  [263. 丑数](https://leetcode.cn/problems/ugly-number/)

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



```python
class Solution:
    def isUgly(self, n: int) -> bool:
        if n == 0:return False
        for p in 2, 3, 5:
            while n and n % p == 0:
                n //= p
        return n == 1
      

```

