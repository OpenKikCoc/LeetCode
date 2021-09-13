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
        def reversed(i, j):
            while i < j:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
                j -= 1

        n = len(nums)
        i = n - 1
        
        # 踩坑！ 一定要记得 当nums[i] > nums[i-1]的时候 要跳出循环 有一种写法很容易进入死循话
        # while i > 0:
        #      if nums[i] <= nums[i-1]:
        #              i -= 1
        
        while i > 0 and nums[i] <= nums[i-1]:    
            i -= 1
        if i == 0:return nums.reverse()
        j = i - 1
        p = n - 1
        while p > j and nums[p] <= nums[j]:
            p -= 1
        nums[j], nums[p] = nums[p], nums[j]
        reversed(j+1, n-1)
```

