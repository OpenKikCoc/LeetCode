#  [674. 最长连续递增序列](https://leetcode.cn/problems/longest-continuous-increasing-subsequence/)

## 题意



## 题解



```c++
class Solution {
public:
    int findLengthOfLCIS(vector<int>& nums) {
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n && nums[j] > nums[j - 1])
                ++ j ;
            res = max(res, j - i);
            i = j - 1;
        }
        return res;
    }
};
```



```python3

```

