#  [9. 回文数](https://leetcode-cn.com/problems/palindrome-number/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isPalindrome(int x) {
        // 使用这种写法 必须先判断 x && x%10==0
        if(x < 0 || x && x%10 == 0) return false;
        int s = 0;
        while(s <= x) {
            s = s * 10 + x % 10;
            if(s == x || s == x/10) return true;
            x /= 10;
        }
        return false;
    }
};
```



```python3

```

