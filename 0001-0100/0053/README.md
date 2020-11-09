#  [53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int sum = 0, res = INT_MIN;
        for(auto& v : nums) {
            sum = max(sum, 0) + v;
            res = max(res, sum);
        }
        return res;
    }
};
```



```python3

```

