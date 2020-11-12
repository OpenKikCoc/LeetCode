#  [213. 打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if(n == 1) return nums[0];
        int st = 0, no = 0;
        for(int i = 0; i < n-1; ++i) {
            int a = st, b = no;
            st = b + nums[i];
            no = max(a, b);
        }
        int res1 = max(st, no);
        st = 0, no = 0;
        for(int i = 1; i < n; ++i) {
            int a = st, b = no;
            st = b + nums[i];
            no = max(a, b);
        }
        int res2 = max(st, no);
        return max(res1, res2);
    }
};
```



```python3

```

