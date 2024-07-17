#  [231. 2的幂](https://leetcode.cn/problems/power-of-two/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isPowerOfTwo(int n) {
        return n > 0 && !(n & (n - 1));
    }
};
```



```python3

```

