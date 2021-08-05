#  [41. 缺失的第一个正数](https://leetcode-cn.com/problems/first-missing-positive/)

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



```python3

```

