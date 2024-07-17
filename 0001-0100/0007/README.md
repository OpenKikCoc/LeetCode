#  [7. 整数反转](https://leetcode.cn/problems/reverse-integer/)

## 题意



## 题解



```c++
class Solution {
public:
    int reverse(int x) {
        int res = 0;
        while (x) {
            int v = x % 10; x /= 10;
            if (res > INT_MAX / 10 || res == INT_MAX / 10 && v > 7) return 0;
            if (res < INT_MIN / 10 || res == INT_MIN / 10 && v < -8) return 0;
            res = res * 10 + v;
        }
        return res;
    }
};
```



```python
# 推荐以下写法，直接按照每一位来进行反转，依次把 x 的低位放到 res 的高位

class Solution:
    def reverse(self, x: int) -> int:
        sign = 1  # 用sign标记这是个负数 还是个正数，可以省好几行代码
        if x < 0 : sign = -1
        x = x * sign

        n = 0
        while x :
            n = n * 10 + x % 10
            x //= 10

        return n * sign if n < 2 ** 31 else 0
      
# 这种方法太复杂了...非常不推荐
class Solution:
    def reverse(self, x: int) -> int:
        s = str(x)
        s_list = list(s)
        s = s_list
        n = len(s)
        flag = False
        if s[0] == '-':
            flag = True
            i = 1 
        else:i = 0
        j = n - 1 
        while i < j:
            s[i], s[j] = s[j], s[i]
            i += 1 
            j -= 1
        if flag:
            tmp = ''.join(s[1:])
            s = str(s[0]) + tmp.lstrip('0')
        else:
            tmp = ''.join(s)
            s = tmp[:-1].lstrip('0') + tmp[-1]
        if int(s) > (1 << 31) - 1 or int(s) < - ((1 << 31) - 1):return 0
        return int(s)

```

