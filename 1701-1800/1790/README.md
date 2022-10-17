#  [1790. 仅执行一次字符串交换能否使两个字符串相等](https://leetcode.cn/problems/check-if-one-string-swap-can-make-strings-equal/)

## 题意



## 题解



```c++

```



```python3
class Solution:
    def areAlmostEqual(self, s1: str, s2: str) -> bool:
        if len(s1) != len(s2):
            return False
        cnt, a, b = 0, '',''
        for i in range(len(s1)):
            if s1[i] != s2[i]:
                cnt += 1
                if cnt == 1:
                    a, b = s1[i], s2[i]
                elif cnt == 2 and (a != s2[i] or b != s1[i]):
                    return False
                elif cnt > 2:return False
        return cnt == 0 or cnt == 2
      
class Solution:
    def areAlmostEqual(self, s1: str, s2: str) -> bool:
        n = len(s1)
        res1, res2 = [], []
        cnt = 0
        for i in range(n):
            if s1[i] != s2[i]:
                cnt += 1
                if cnt > 2:
                    return False
                res1.append(s1[i])
                res2.append(s2[i])
        if cnt == 0:return True
        if cnt == 2 and res1[0] == res2[1] and res1[1] == res2[0]:
            return True
        return False
```

