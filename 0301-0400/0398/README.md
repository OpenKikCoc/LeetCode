#  [398. 随机数索引](https://leetcode-cn.com/problems/random-pick-index/)

## 题意



## 题解



```c++
class Solution {
public:
    unordered_map<int, vector<int>> mp;
    Solution(vector<int>& nums) {
        for (int i = 0; i < nums.size(); ++ i )
            mp[nums[i]].push_back(i);
    }
    
    int pick(int target) {
        auto & ve = mp[target];
        int sz = ve.size();
        return ve[rand() % sz];
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(nums);
 * int param_1 = obj->pick(target);
 */
```



```python3

```

