#  [283. 移动零](https://leetcode.cn/problems/move-zeroes/)

## 题意



## 题解



```c++
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int k = 0;
        for (auto x: nums)
            if (x)
                nums[k ++ ] = x;
        while (k < nums.size()) nums[k ++ ] = 0;
    }
};
```



```python
#普通双指针: 一个指针往后走，另外一个指针存储有效数字
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        n = len(nums)
        p1, p2 = 0, 0
        while p2 < n:
            if nums[p2] != 0:
                nums[p1] = nums[p2]
                p1 += 1
            p2 += 1
        while p1 < n:
            nums[p1] = 0
            p1 += 1
```

