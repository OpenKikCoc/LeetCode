#  [283. 移动零](https://leetcode-cn.com/problems/move-zeroes/)

## 题意



## 题解



```c++
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int n = nums.size();
        int p = 0;
        for(auto v : nums) if(v) nums[p++] = v;
        while(p < n) nums[p++] = 0;
    }
};
```



```python3

```

