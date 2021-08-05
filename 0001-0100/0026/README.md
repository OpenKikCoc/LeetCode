#  [26. 删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

## 题意



## 题解

```c++
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int k = 0;
        for (int i = 0; i < nums.size(); i ++ )
            if (!i || nums[i] != nums[i - 1])
                nums[k ++ ] = nums[i];
        return k;
    }
};
```



```c++
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int n = nums.size(), p = 0;
        if (!n) return 0;
        for (int i = 1; i < n; ++ i ) {
            if(nums[i] != nums[p]) nums[++ p ] = nums[i];
        }
        return p + 1;
    }
};
```



```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        n = len(nums)
        p1, p2 = 0, 1
        while p2 < n:
            if nums[p1] != nums[p2]:
                p1 += 1
                nums[p1] =  nums[p2]
            p2 += 1 
        return p1 + 1
```

