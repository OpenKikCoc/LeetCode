#  [9. 回文数](https://leetcode.cn/problems/palindrome-number/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isPalindrome(int x) {
        // 使用这种写法 必须先判断 x && x%10==0
        if (x < 0 || x && x % 10 == 0) return false;
        int s = 0;
        while (s <= x) {
            s = s * 10 + x % 10;
            if (s == x || s == x / 10) return true;
            x /= 10;
        }
        return false;
    }
};
```

或者数值方法

```c++
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0) return 0;
        int y = x;
        long long res = 0;
        while (x) {
            res = res * 10 + x % 10;
            x /= 10;
        }
        return res == y;
    }
};
```



```python
# 数字转化为字符串，再进行判断=== 可能这种方法会被面试官打
class Solution:
    def isPalindrome(self, x: int) -> bool:
        s = str(x)
        if s[0] == '-':return False 
        i, j = 0, len(s) - 1
        while i < j:
            if s[i] != s[j]:return False
            i += 1
            j -= 1
        return True


# 数值方法
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:return False
        tmp = x 
        s = 0
        while x:
            s = s * 10 + x % 10
            x //= 10 
        return s == tmp

```

