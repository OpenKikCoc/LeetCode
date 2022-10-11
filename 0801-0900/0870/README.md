#  [870. 优势洗牌](https://leetcode.cn/problems/advantage-shuffle/)

## 题意



## 题解



```c++

```



> 贪心：
>
> 1. nums1 和 nums2 从小到大排序；
> 2. 在 nums2 定义双指针，如果 nums1[i] > nums[l], 就安排，否则就安排 nums2 最大的数字；
> 3. 贪心的正确性是 nums1 中的每个数字都要尽可能的干掉 nums2 中的一个数字，如果干不掉，则消耗掉 nums2 中剩余最大的数字

```python3
class Solution:
    def advantageCount(self, nums1: List[int], nums2: List[int]) -> List[int]:
        n = len(nums1)
        res = [0] * n
        nums1.sort()
        ids = sorted(range(n), key=lambda i: nums2[i]) # ids[0] 对应 nums2 中最小值的下标
        l, r = 0, n - 1
        for x in nums1:
            if x > nums2[ids[l]]:
                res[ids[l]] = x
                l += 1
            else:
                res[ids[r]] = x
                r -= 1
        return res
```

```python
class Solution:
    def advantageCount(self, nums1: List[int], nums2: List[int]) -> List[int]:
        nums1.sort()
        t = sorted((v, i) for i, v in enumerate(nums2))
        n = len(nums2)
        ans = [0] * n
        i, j = 0, n - 1
        for v in nums1:
            if v <= t[i][0]:
                ans[t[j][1]] = v
                j -= 1
            else:
                ans[t[i][1]] = v
                i += 1
        return ans
```

