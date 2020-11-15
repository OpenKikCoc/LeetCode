#  [371. 两整数之和](https://leetcode-cn.com/problems/sum-of-two-integers/)

## 题意



## 题解



```c++
class Solution {
public:
    int getSum(int a, int b) {
        while (b) {
            int t = a ^ b;
            // 处理负数 unsigned 形如 a = -1, b = 1
            int carry = (unsigned)(a & b) << 1;
            a = t, b = carry;
        }
        return a;
    }
};
```



```python3

```

