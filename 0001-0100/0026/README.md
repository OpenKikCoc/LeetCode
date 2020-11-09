#  [26. 删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

## 题意



## 题解



```c++
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int n = nums.size(), p = 0;
        if(!n) return 0;
        for(int i = 1; i < n; ++i) {
            if(nums[i] != nums[p]) nums[++p] = nums[i];
        }
        return p+1;
    }
};
```



```python3

```

