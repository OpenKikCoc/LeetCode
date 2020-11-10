#  [78. 子集](https://leetcode-cn.com/problems/subsets/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> t;
    void dfs(vector<int>& nums, int pos) {
        if(pos == nums.size()) {
            res.push_back(t);
            return;
        }
        dfs(nums, pos+1);
        t.push_back(nums[pos]);
        dfs(nums, pos+1);
        t.pop_back();
    }
    vector<vector<int>> subsets(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        dfs(nums, 0);
        return res;
    }
};
```



```python3

```

