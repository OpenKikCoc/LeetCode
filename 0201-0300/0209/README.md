#  [209. 长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

## 题意



## 题解



```c++
class Solution {
public:
    int minSubArrayLen(int s, vector<int>& nums) {
        int res = INT_MAX;
        for (int i = 0, j = 0, sum = 0; i < nums.size(); ++i) {
            sum += nums[i];
            while (sum - nums[j] >= s) sum -= nums[j++];
            if (sum >= s) res = min(res, i - j + 1);
        }
        if (res == INT_MAX) return 0;
        return res;
    }
    int minSubArrayLen_2(int s, vector<int>& nums) {
        int n = nums.size(), res = INT_MAX;
        int l = 0, r = 0, sum = 0;
        while(r < n) {
            sum += nums[r++];
            while(sum >= s) {
                res = min(res, r-l);
                sum -= nums[l++];
            }
        }
        return res == INT_MAX ? 0 : res;
    }
};
```



```python
class Solution:
    def minSubArrayLen(self, s: int, nums: List[int]) -> int:
        res = float('inf')
        l = 0; sumn = 0
        for r in range(len(nums)):
            sumn += nums[r]
            while l <= r and sumn - nums[l] >= s:
                sumn -= nums[l]
                l += 1
            if sumn >= s:
                res = min(res, r - l + 1)
        return res if res != float('inf') else 0
```

