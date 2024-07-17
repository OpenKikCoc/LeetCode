#  [643. 子数组最大平均数 I](https://leetcode.cn/problems/maximum-average-subarray-i/)

## 题意



## 题解



```c++
class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        double res = -1e5;
        for (int i = 0, j = 0, s = 0; i < nums.size(); ++ i ) {
            s += nums[i];
            if (i - j + 1 > k) s -= nums[j ++ ];
            if (i >= k - 1) res = max(res, s / (double)k);
        }
        return res;
    }

    double findMaxAverage_2(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> s(n + 1);
        for (int i = 1; i <= n; ++ i ) s[i] = s[i - 1] + nums[i - 1];

        double res = INT_MIN;
        for (int i = k; i <= n; ++ i )
            res = max(res, (double)(s[i] - s[i - k]) / k);
        return res;
    }
};
```



```python3

```

