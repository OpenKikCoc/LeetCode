#  [300. 最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

## 题意



## 题解



```c++
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> f;
        for(int i = 0; i < n; ++i) {
            if(f.empty() || f.back() < nums[i]) f.push_back(nums[i]);
            else *lower_bound(f.begin(), f.end(), nums[i]) = nums[i];
        }
        return f.size();
    }
};
```



```python3

```

