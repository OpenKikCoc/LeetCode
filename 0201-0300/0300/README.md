#  [300. 最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

## 题意



## 题解



```c++
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> f;
        for (int i = 0; i < n; ++ i )
            if (f.empty() || f.back() < nums[i])
                f.push_back(nums[i]);
            else
                *lower_bound(f.begin(), f.end(), nums[i]) = nums[i];
        return f.size();
    }
};
```

```c++
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> q;
        for (auto x: nums) {
            if (q.empty() || x > q.back()) q.push_back(x);
            else {
                if (x <= q[0]) q[0] = x;
                else {
                    int l = 0, r = q.size() - 1;
                    while (l < r) {
                        int mid = l + r + 1 >> 1;
                        if (q[mid] < x) l = mid;
                        else r = mid - 1;
                    }
                    q[r + 1] = x;
                }
            }
        }
        return q.size();
    }
};
```


```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        if not nums:return 0
        n=len(nums)
        dp=[1]*(n+1)
        res=1
        for i in range(1,n+1):
            for j in range(1,i):
                if nums[i-1]>nums[j-1]:
                    dp[i]=max(dp[i],dp[j]+1)
            res=max(res,dp[i])
        return res
```

