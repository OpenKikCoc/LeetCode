#  [479. 最大回文数乘积](https://leetcode-cn.com/problems/largest-palindrome-product/)

## 题意



## 题解



```c++
class Solution {
public:
    typedef long long LL;
    int largestPalindrome(int n) {
        if (n == 1) return 9;
        int maxv = pow(10, n) - 1;
        for (int i = maxv; ; -- i ) {
            auto s = to_string(i);
            auto t = s;
            reverse(t.begin(), t.end());
            // 根据某个 n 位数 s , 构造可能的回文数答案: num
            auto num = stoll(s + t);
            for (LL j = maxv; j * j >= num; -- j )
                if (num % j == 0) return num % 1337;
        }
        return 0;
    }
};
```



```python3

```

