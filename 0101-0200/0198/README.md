#  [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)

## 题意



## 题解



```c++
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        int st = 0, no = 0;
        for(int i = 0; i < n; ++i) {
            int a = st, b = no;
            st = b + nums[i];
            no = max(a, b);
        }
        return max(st, no);
    }
};
```



```python3

```

