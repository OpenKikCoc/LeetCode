#  [172. 阶乘后的零](https://leetcode-cn.com/problems/factorial-trailing-zeroes/)

## 题意



## 题解

求 $n!$ 中因子 $p$ 的个数，则因为 $n!=1*2*..*n$

所以含有一个 $p$ 的有 $\frac{n}{p}$ 个

含有两个 $p$ 的有 $\frac{n}{p^2}$ 个

累加即可

```c++
class Solution {
public:
    int trailingZeroes(int n) {
        int ans = 0;
        while (n) {
            n /= 5;
            ans += n;
        }
        return ans;
    }
  
    int trailingZeroes(int n) {
        return n == 0 ? 0 : n / 5 + trailingZeroes(n / 5);
    }
};
```



```python
# 如果要在末位产生0，则必然是5×2，即使是原数中包含的0也可以分解，由于2的出现次数一定比5多
# 因此将题目简化为寻找阶乘中5的个数，即n//5，但是要考虑到这只找到了n中是5倍数的所有数
class Solution:
    def trailingZeroes(self, n: int) -> int:
        res = 0
        while n > 0:
            n //= 5
            res += n
        return res
```

