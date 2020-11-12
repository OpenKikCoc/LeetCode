#  [191. 位1的个数](https://leetcode-cn.com/problems/number-of-1-bits/)

## 题意



## 题解



```c++
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int res = 0;
        while(n) ++res, n &= (n-1);
        return res;
    }
};
```



```python3

```

