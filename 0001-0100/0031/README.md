#  [31. 下一个排列](https://leetcode-cn.com/problems/next-permutation/)

## 题意



## 题解



```c++
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int k = nums.size()-1;
        while(k > 0 && nums[k-1] >= nums[k]) --k;
        if(k <= 0) reverse(nums.begin(), nums.end());
        else {
            int t = k;
            // not nums[t] >= nums[k-1]
            while(t < nums.size() && nums[t] > nums[k-1]) ++t;
            // nums[t] <= nums[k-1], 则nums[t-1] 是大于nums[k-1]的数
            swap(nums[t-1], nums[k-1]);
            reverse(nums.begin()+k, nums.end());
        }
    }
};

class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        if(n < 2) return;
        int i = n-2, j = n-1, k = n-1;
        while(i >= 0 && nums[i] >= nums[j]) --i, --j;
        if(i >= 0) {
            while(nums[i] >= nums[k]) --k;
            swap(nums[i], nums[k]);
        }
        for(i = j, j = n-1; i < j; ++i, --j) swap(nums[i], nums[j]);
    }
};
```



```python
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        答题思路：从后往前寻找第一个升序对(i,j)即nums[i]<nums[j] 再从后往前找第一个大于nums[i]的数即为大数，交换着两个元素即将大数换到前面，然后将大数后面的部分倒序
        """
        def reverse(nums, i, j):
            while i < j:
                nums[i],nums[j] = nums[j], nums[i]
                i += 1
                j -= 1

        n=len(nums)
        if n<2:return nums
        i=n-1
        while i>0 and nums[i-1]>=nums[i]:
            i-=1
        if i==0:
            return nums.reverse()
        else:
            j=n-1
            while j>i-1 and nums[j]<=nums[i-1]:
                j-=1
            nums[j],nums[i-1]=nums[i-1],nums[j]
            reverse(nums, i, n-1)
```

