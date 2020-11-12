#  [172. 阶乘后的零](https://leetcode-cn.com/problems/factorial-trailing-zeroes/)

## 题意



## 题解



```c++
class Solution {
public:
    int trailingZeroes(int n) {
        int ans = 0;
        while(n) {
            n /= 5;
            ans += n;
        }
        return ans;
    }
  
    int trailingZeroes(int n) {
        return n == 0 ? 0 : n/5 + trailingZeroes(n/5);
    }
};
```



```python3

```

