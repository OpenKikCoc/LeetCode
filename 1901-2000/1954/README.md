# [1954. 收集足够苹果的最小花园周长](https://leetcode-cn.com/problems/minimum-garden-perimeter-to-collect-enough-apples/) 

## 题意



## 题解



```c++

```



```python
class Solution:
    def minimumPerimeter(self, apps: int) -> int:
        res, x = 0, 0
        while res * 4 < apps:
            x += 1
            res += (x - 1) * x * 3 + x * 3 
        return x * 8
```

