#  [31. 下一个排列](https://leetcode-cn.com/problems/next-permutation/)

## 题意



## 题解



```c++
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        int p = n - 1;
        while (p && nums[p] <= nums[p - 1])
            p -- ;
        if (p == 0)
            reverse(nums.begin(), nums.end());
        else {
            int t = p + 1;
            while (t < n && nums[t] > nums[p - 1])
                t ++ ;
            swap(nums[p - 1], nums[t - 1]);
            reverse(nums.begin() + p, nums.end());
        }
    }
};
```



```python
# 答题思路：从后往前寻找第一个升序对(i,j)即nums[i]<nums[j] 再从后往前找第一个大于nums[i]的数即为大数，交换着两个元素即将大数换到前面，然后将大数后面的部分倒序
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        def reverse(i, j):
            while i < j:
                nums[i],nums[j] = nums[j], nums[i]
                i += 1
                j -= 1

        n = len(nums)
        if n < 2:return nums
        i = n - 1
        while i > 0 and nums[i-1] >= nums[i]:
            i -= 1
        if i == 0:return nums.reverse()
        j = n - 1
        while j > i-1 and nums[j] <= nums[i-1]:
            j -= 1
        nums[j],nums[i-1]=nums[i-1],nums[j]
        reverse(i, n-1)
```

