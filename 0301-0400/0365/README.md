#  [365. 水壶问题](https://leetcode.cn/problems/water-and-jug-problem/)

## 题意



## 题解



```c++
class Solution {
public:
    bool canMeasureWater(int x, int y, int z) {
        if (x + y < z) return false;
        return !z || z % __gcd(x, y) == 0;
    }
};



class Solution {
public:
    bool canMeasureWater(int x, int y, int z) {
        if (x + y < z) return false;
        if (x == 0 || y == 0) return z == 0 || x + y == z;
        return z % __gcd(x, y) == 0;
    }
};
```



```python3

```

