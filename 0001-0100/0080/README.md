#  [80. 删除排序数组中的重复项 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int n = nums.size();
        if(n <= 2) return n;
        int idx = 1;
        for(int i = 2; i < n; ++i) {
            if(nums[i] != nums[idx-1]) {
                nums[++idx] = nums[i];
            }
        }
        return idx+1;
    }
};
```



```python3

```

