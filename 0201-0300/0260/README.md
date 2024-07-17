#  [260. 只出现一次的数字 III](https://leetcode.cn/problems/single-number-iii/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        int len = nums.size();
        int t = 0;
        for (int i = 0; i < len; ++ i ) t ^= nums[i];
        int mask = t & (-t);
        vector<int> ans(2, 0);
        for (int i = 0; i < len; ++ i ) {
            if ((nums[i] & mask) == 0)
                ans[0] ^= nums[i];
            else
                ans[1] ^= nums[i];
        }
        return ans;
    }
};
```


```c++
// yxc
class Solution {
public:
    int get(vector<int>& nums, int k, int t) {
        int res = 0;
        for (auto x: nums)
            if ((x >> k & 1) == t)
                res ^= x;
        return res;
    }

    vector<int> singleNumber(vector<int>& nums) {
        int ab = 0;
        for (auto x: nums) ab ^= x;
        int k = 0;
        while ((ab >> k & 1) == 0) k ++ ;
        return {get(nums, k, 0), get(nums, k, 1)};
    }
};
```


```python3

```

