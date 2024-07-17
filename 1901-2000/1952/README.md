# [1952. 三除数](https://leetcode.cn/problems/three-divisors/) 

## 题意



## 题解



```c++

```



```python
class Solution:
    def isThree(self, n: int) -> bool:
        if n <= 0:return False
        my_set = set()
        for i in range(1, n + 1):
            if n % i == 0:
                my_set.add(i)
        return len(my_set) == 3

```

