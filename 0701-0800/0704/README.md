#  [704. 二分查找](https://leetcode-cn.com/problems/binary-search/)

## 题意



## 题解



```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size();
        while (l < r) {
            int m = l + r >> 1;
            if (nums[m] < target)
                l = m + 1;
            else
                r = m;
        }
        return r < nums.size() && nums[r] == target ? r : -1;
    }
};
```



```python3

```

