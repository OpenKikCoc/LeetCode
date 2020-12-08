#  [611. 有效三角形的个数](https://leetcode-cn.com/problems/valid-triangle-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int triangleNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int res = 0;
        // 枚举最大数 次大数 最小数   双指针
        for (int i = 0; i < nums.size(); ++ i )
            for (int j = i - 1, k = 0; j > 0 && k < j; -- j ) {
                while (k < j && nums[k] <= nums[i] - nums[j]) ++ k ;
                res += j - k;
            }
        return res;
    }
};
```



```python3

```

