#  [1953. 你可以工作的最大周数](https://leetcode-cn.com/problems/maximum-number-of-weeks-for-which-you-can-work/)

## 题意



## 题解



```c++

```



```python
class Solution:
    def numberOfWeeks(self, nums: List[int]) -> int:
        res = 0
        nums.sort()
        n = len(nums)
        for i in range(n-1):
            res += nums[i]
        if res < nums[n-1]:
            res += (res + 1)
        else:
            res += nums[n-1]
        return res
            
```

