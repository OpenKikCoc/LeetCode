#  [561. 数组拆分 I](https://leetcode-cn.com/problems/array-partition-i/)

## 题意



## 题解



```c++
class Solution {
public:
    int arrayPairSum(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        int res = 0;
        for (int i = 0; i < n; i += 2)
            //res += min(nums[i], nums[i + 1]);
            res += nums[i];
        return res;
    }
};
```



```python3

```

