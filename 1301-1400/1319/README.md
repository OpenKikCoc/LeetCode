# [1319. 连通网络的操作次数](https://leetcode.cn/problems/number-of-operations-to-make-network-connected/) 

## 题意



## 题解



```c++

```



```python
class Solution:
    def makeConnected(self, n: int, nums: List[List[int]]) -> int:
        def find(x):
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]
 
        m = len(nums)
        if m < n - 1:
            return -1
        p = [i for i in range(n)]
        n1 = 0
        for x in nums:
            a, b = x[0], x[1]
            if find(a) == find(b):
                continue
            p[find(a)] = find(b)

        for i in range(n):
            if p[i] == i:
                n1 += 1
        return n1 - 1
```

