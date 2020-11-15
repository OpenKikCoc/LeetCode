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
        long long l = 1, r = (long long)n+1;
        while(l < r) {
            long long mid = l+(r-l)/2;
            int ret = guess(mid);
            if(ret == 0) return mid;
            else if(ret > 0) l = mid+1;
            else if(ret < 0) r = mid;
        }
        return -1;
    }
};
```



```python3

```

