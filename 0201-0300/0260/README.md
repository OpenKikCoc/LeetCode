#  [260. 只出现一次的数字 III](https://leetcode-cn.com/problems/single-number-iii/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        int len = nums.size();
        int t = 0;
        for(int i = 0; i < len; ++i) t ^= nums[i];
        int mask = t&(-t);
        vector<int> ans(2, 0);
        for(int i = 0; i < len; ++i) {
            if((nums[i]&mask) == 0) ans[0] ^= nums[i];
            else ans[1] ^= nums[i];
        }
        return ans;
    }
};
```



```python3

```

