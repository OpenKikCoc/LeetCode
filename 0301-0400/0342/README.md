#  [342. 4的幂](https://leetcode-cn.com/problems/power-of-four/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isPowerOfFour(int num) {
        if(num <= 0) return false;
        // 判断是否是2的幂
        if(num & num-1) return false;
        // 与运算之后是本身 则是4的幂
        if((num & 0x55555555) == num) return true;
        return false;
    }
};

// yxc
// n 是4的整数次幂，等价于 n 是平方数，且 n 的质因子只有2。
// n 的质因子只有2，等价于 n 能整除 2^30 。
class Solution {
public:
    bool isPowerOfFour(int num) {
        if (num <= 0) return false;
        int t = sqrt(num);
        return t * t == num && ((1 << 30) % num) == 0;
    }
};
```



```python3

```

