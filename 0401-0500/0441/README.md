#  [441. 排列硬币](https://leetcode.cn/problems/arranging-coins/)

## 题意



## 题解



```c++
class Solution {
public:
    // k*(k+1)/2 <= n
    // k <= 下界[-1 + sqrt(1 + 8.0 * n)] / 2
    int arrangeCoins(int n) {
        return (-1 + sqrt(1 + 8.0 * n)) / 2;
    }
    int arrangeCoins_2(int n) {
        int line = 0;
        while (n > line)  ++ line, n -= line;
        return line;
    }
};
```



```python3

```

