#  [374. 猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)

## 题意



## 题解



```c++
/** 
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is lower than the guess number
 *			      1 if num is higher than the guess number
 *               otherwise return 0
 * int guess(int num);
 */

class Solution {
public:
    int guessNumber(int n) {
        int l = 1, r = n;
        while (l < r) {
            int mid = (long long)l + r >> 1;
            if (guess(mid) <= 0) r = mid;
            else l = mid + 1;
        }
        return l;
    }
};
```



```python
class Solution:
    def guessNumber(self, n: int) -> int:
        l, r = 1, n + 1
        while l < r:
            m = l + (r - l) // 2
            if guess(m) > 0:
                l = m + 1
            else:
                r = m
        return l
```

