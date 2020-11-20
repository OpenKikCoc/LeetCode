#  [462. 最少移动次数使数组元素相等 II](https://leetcode-cn.com/problems/minimum-moves-to-equal-array-elements-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int minMoves2(vector<int>& nums) {
        int res = 0, l = 0, r = nums.size()-1;
        sort(nums.begin(), nums.end());
        while(l < r) {
            res += nums[r--] - nums[l++];
        }
        return res;
    }
};
```



```python3

```

