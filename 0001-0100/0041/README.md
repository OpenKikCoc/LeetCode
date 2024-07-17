#  [41. 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/)

## 题意



## 题解



```c++
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i])
                swap(nums[nums[i] - 1], nums[i]);
        for (int i = 0; i < n; ++ i )
            if(nums[i] != i + 1) return i + 1;
        return n + 1;
    }
};
```



```python
# 思路：一个萝卜一个坑。
# 把每个数放到该在的位置，注意：这里是从1开始的，所以还有一个下标映射的关系。
# 外层循环遍历整个数组，内层用while判断当前数字是否在该在的位置，如果不在的话，就一直交换。跳出while循环时，如果当前数字不等于下标，只能说明它重复了。
# 最后再从头到位遍历一遍数组，第一个与下标不对应的数字 就是 缺失的第一个正数。
# O(N) + S(1)

class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            while 0 <= nums[i]-1 < n and nums[nums[i]-1] != nums[i]:
                # tmp = nums[i] - 1
                # nums[i], nums[tmp] = nums[tmp], nums[i]
                nums[nums[i]-1], nums[i] = nums[i], nums[nums[i]-1]
            # 不能在跳出while循环就直接判断，这个和“寻找重复数字”不一样的点在于，当前值不在该在的位置的时候，确实可以判断这就是个重复数字。但是不能判断它为 缺失的第一个正数，因为可能有比当前数更小的数还在后面没有被处理。
            # if nums[i] != i+1:
            #     return i + 1
        for i in range(n):
            if nums[i] != i+1:
                return i + 1
        return n + 1
```

