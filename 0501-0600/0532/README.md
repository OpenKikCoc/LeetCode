#  [532. 数组中的 k-diff 数对](https://leetcode-cn.com/problems/k-diff-pairs-in-an-array/)

## 题意



## 题解

双指针

```c++
class Solution {
public:
    int findPairs(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int res = 0;
        for (int i = 0, j = 0; i < nums.size(); ++ i ) {
            // 枚举后面的 可以保证解决 k = 0 的情况
            while (i + 1 < nums.size() && nums[i + 1] == nums[i]) ++ i ;
            while (j < i && nums[i] - nums[j] > k) ++ j ;
            if (j < i && nums[i] - nums[j] == k) ++ res;
        }
        return res;
    }
};
```



```python3

```

