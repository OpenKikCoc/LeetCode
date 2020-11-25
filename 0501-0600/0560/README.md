#  [560. 和为K的子数组](https://leetcode-cn.com/problems/subarray-sum-equals-k/)

## 题意



## 题解



```c++
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int n = nums.size(), psum = 0, res = 0;
        unordered_map<int, int> m;
        m[0] = 1;
        for(int i = 0; i < n; ++i) {
            psum += nums[i];
            res += m[psum - k];
            ++m[psum];
        }
        return res;
    }
};
```



```python3

```

