#  [15. 三数之和](https://leetcode-cn.com/problems/3sum/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> res;
        if(n < 3) return res;
        sort(nums.begin(), nums.end());
        // if(nums[0] > 0 || nums[n-1] < 0) return res;
        for(int i = 0; i < n-2; ++i) {
            if(nums[i] > 0) break;  // 可以很多个 0
            if(i && nums[i] == nums[i-1]) continue;
            int l = i + 1, r = n - 1;
            while(l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if(sum == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while(l < r && nums[l+1] == nums[l]) ++l;
                    while(l < r && nums[r-1] == nums[r]) --r;
                    ++l, --r;
                } else if(sum < 0) ++l;
                else --r;
            }
        }
        return res;
    }
};
```



```python3

```

