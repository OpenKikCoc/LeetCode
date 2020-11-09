#  [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

## 题意

返回下标

## 题解



```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        int n = nums.size();
        for(int i = 0; i < n; ++i) {
            int v = nums[i], nv = target - v;
            if(mp.count(nv)) return vector<int>{mp[nv], i};
            mp[v] = i;
        }
        return vector<int>{};
    }
};
```



```python3

```

