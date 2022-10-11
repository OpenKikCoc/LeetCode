#  [801. 使序列递增的最小交换次数](https://leetcode.cn/problems/minimum-swaps-to-make-sequences-increasing/)

## 题意



## 题解



```c++

```



```python3
# f[i][0]表示第i个位置没有交换让序列合法的最小操作次数
# f[i][1]表示第i个位置交换过的让序列合法最小操作次数
# 考虑状态转移:通过考虑第i-1个位置是否交换进行转移
class Solution:
    def minSwap(self, a: List[int], b: List[int]) -> int:
        n = len(a)
        f = [[float('inf')] * 2 for _ in range(n)]
        f[0][0], f[0][1] = 0, 1
        for i in range(1, n):
            if a[i] > a[i - 1] and b[i] > b[i - 1]:
                f[i][0] = min(f[i][0], f[i - 1][0])
                f[i][1] = min(f[i][1], f[i - 1][1] + 1)
            if a[i] > b[i - 1] and b[i] > a[i - 1]:
                f[i][0] = min(f[i][0], f[i - 1][1])
                f[i][1] = min(f[i][1], f[i - 1][0] + 1)
        return min(f[n - 1][0], f[n - 1][1])
```

