#  [633. 平方数之和](https://leetcode.cn/problems/sum-of-square-numbers/)

## 题意



## 题解



```c++
class Solution {
public:
    bool judgeSquareSum(int c) {
        long l = 0, r = sqrt(c);
        long res;
        while (l <= r) {
            res = l * l + r * r;
            if (res == c) return true;
            else if (res > c) -- r ;
            else ++ l ;
        }
        return false;
    }

    bool judgeSquareSum_2(int c) {
        // 直角三角形 一个边从1开始小于等于sqrt(c/2)
        int top = sqrt(c / 2);  // top < 4*10^4
        int t, j;
        for (int i = 0; i <= top; ++ i ) {
            t = c - i * i;
            j = sqrt(t);
            if (j * j == t) return true;
        }
            
        return false;
    }
};
```



```python
#法一：直接枚举（两种写法）
class Solution:
    def judgeSquareSum(self, c: int) -> bool:
        # i = 0
        # while i * i <= c:
        #     j = c - i * i 
        #     r = int(math.sqrt(j))
        #     if r * r == j:return True 
        #     i += 1
        # return False
        for i in range(int(c ** 0.5) + 1):
            j = c - i ** 2
            r = int(j ** 0.5)
            if r ** 2 == j:return True 
        return False
      
#法二：双指针算法
class Solution:
    def judgeSquareSum(self, c: int) -> bool:
        # j = int(math.sqrt(c))
        j = int(c ** 0.5) + 1
        i = 0
        while i <=j:
            if c == i * i + j * j:
                return True
            elif i * i + j * j > c:
                j -= 1
            else:
                i += 1
        return False
```

