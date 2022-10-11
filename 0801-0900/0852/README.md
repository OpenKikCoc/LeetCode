#  [852. 山脉数组的峰顶索引](https://leetcode.cn/problems/peak-index-in-a-mountain-array/)

## 题意



## 题解



```c++

```



```python3
class Solution:
    def peakIndexInMountainArray(self, arr: List[int]) -> int:
        n = len(arr)
        l, r = 0, n 
        while l < r:
            m = l + (r - l) // 2
            if m + 1 < n and arr[m] < arr[m+1]:
                l = m + 1
            else:
                r = m 
        return l
```

