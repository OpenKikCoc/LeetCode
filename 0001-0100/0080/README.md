#  [80. 删除排序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int k = 0;
        for (auto x : nums)
            if (k < 2 || (nums[k - 1] != x || nums[k - 2] != x))
                nums[k ++ ] = x;
        return k;
    }
};
```



```python
# 一个指针存储的有效数字，一个指针往后走
# 由于相同的数字可以保存两个，所以可以用当前数和第前2个数相比较

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 2:return n 
        p1 = 1 
        for p2 in range(2, n):
            if nums[p2] != nums[p1 - 1]:
                p1 += 1
                nums[p1] = nums[p2]
        return p1 + 1
```

