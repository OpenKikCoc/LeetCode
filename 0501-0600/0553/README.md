#  [553. 最优除法](https://leetcode.cn/problems/optimal-division/)

## 题意



## 题解



```c++
class Solution {
public:
    string optimalDivision(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return "";
        if (n == 1) return to_string(nums[0]);
        if (n == 2) return to_string(nums[0]) + '/' + to_string(nums[1]);

        string res = to_string(nums[0]) + "/(";
        for (int i = 1; i < n - 1; ++ i )
            res += to_string(nums[i]) + '/';
        res += to_string(nums.back()) + ')';
        return res;
    }
};
```



```python3

```

