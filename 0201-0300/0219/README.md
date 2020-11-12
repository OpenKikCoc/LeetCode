#  [219. 存在重复元素 II](https://leetcode-cn.com/problems/contains-duplicate-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        int n = nums.size();
        unordered_map<int, int> m;
        for(int i = 0; i < n; ++i) {
            if(m[nums[i]] && i-m[nums[i]]+1 <= k) return true;
            m[nums[i]] = i+1;
        }
        return false;
    }
};
```



```python3

```

