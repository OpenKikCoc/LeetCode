#  [228. 汇总区间](https://leetcode-cn.com/problems/summary-ranges/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> res;
        for (int i = 0; i < nums.size(); ++i) {
            int j = i + 1;
            while (j < nums.size() && nums[j] == nums[j-1] + 1) ++j;
            if (j == i + 1) res.push_back(to_string(nums[i]));
            else res.push_back(to_string(nums[i]) + "->" + to_string(nums[j - 1]));
            i = j - 1;
        }
        return res;
    }
};
```



```python3

```

