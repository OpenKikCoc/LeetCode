#  [476. 数字的补数](https://leetcode.cn/problems/number-complement/)

## 题意



## 题解



```c++
class Solution {
public:
    int findComplement(int num) {
        long tmp = 1;
        while (tmp <= num) tmp <<= 1;
        tmp -= 1;
        return tmp ^ num;
    }
};

class Solution {
public:
    int findComplement(int num) {
        if (!num) return 1;
        int cnt = 0;
        for (int x = num; x; x >>= 1) ++ cnt ;
        return ~num & ((1ll << cnt) - 1);
    }
};
```



```python3

```

