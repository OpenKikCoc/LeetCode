#  [367. 有效的完全平方数](https://leetcode-cn.com/problems/valid-perfect-square/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isPerfectSquare(int num) {
        if (num < 2) return true;
        long long x = num / 2;
        while (x * x > num) x = (x + num / x) / 2;
        return x * x == num;
    }
};
```

```c++
class Solution {
public:
    bool isPerfectSquare(int num) {
        int l = 1, r = num;
        while (l < r) {
            int mid = l + 1ll + r >> 1;
            if (mid <= num / mid) l = mid;
            else r = mid - 1;
        }
        return r * r == num;
    }
};
```


```python3

```

