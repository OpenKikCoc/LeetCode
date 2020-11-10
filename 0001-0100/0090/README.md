#  [90. 子集 II](https://leetcode-cn.com/problems/subsets-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> t;
    void dfs(vector<int>& nums, int step) {
        res.push_back(t);
        for(int i = step; i < nums.size(); ++i) {
            if(i > step && nums[i] == nums[i-1]) continue;
            t.push_back(nums[i]);
            dfs(nums, i+1);
            t.pop_back();
        }
    }
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        dfs(nums, 0);
        return res;
    }
};
```



```python3

```

