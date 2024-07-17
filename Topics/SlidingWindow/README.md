# 滑动窗口/双指针







#### [209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)

```c++
    int minSubArrayLen(int s, vector<int>& nums) {
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
```

