#  [762. 二进制表示中质数个计算置位](https://leetcode.cn/problems/prime-number-of-set-bits-in-binary-representation/)

## 题意



## 题解



```c++
class Solution {
public:
    int countPrimeSetBits(int L, int R) {
        unordered_set<int> primes{2, 3, 5, 7, 11, 13, 17, 19};
        int res = 0;
        for (int i = L; i <= R; ++ i ) {
            int s = 0;
            for (int j = i; j; j >>= 1) s += j & 1;
            res += primes.count(s);
        }
        return res;
    }
};
```



```python3

```

