#  [633. 平方数之和](https://leetcode-cn.com/problems/sum-of-square-numbers/)

## 题意



## 题解



```c++
class Solution {
public:
    bool judgeSquareSum(int c) {
        long l = 0, r = sqrt(c);
        long res;
        while (l <= r) {
            res = l * l + r * r;
            if (res == c) return true;
            else if (res > c) -- r ;
            else ++ l ;
        }
        return false;
    }

    bool judgeSquareSum_2(int c) {
        // 直角三角形 一个边从1开始小于等于sqrt(c/2)
        int top = sqrt(c / 2);  // top < 4*10^4
        int t, j;
        for (int i = 0; i <= top; ++ i ) {
            t = c - i * i;
            j = sqrt(t);
            if (j * j == t) return true;
        }
            
        return false;
    }
};
```



```python3

```

