#  [47. 全排列 II](https://leetcode-cn.com/problems/permutations-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> nums;
    vector<bool> vis;
    vector<int> t;
    void dfs(int pos) {
        if(pos == nums.size()) {
            res.push_back(t);
            return;
        }
        for(int i = 0; i < nums.size(); ++i) {
            if(vis[i]) continue;
            if(i > 0 && nums[i] == nums[i-1] && !vis[i-1]) continue;
            vis[i] = true;
            t.push_back(nums[i]);
            dfs(pos+1);
            t.pop_back();
            vis[i] = false;
        }
    }
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        this->nums = nums;
        this->vis = vector<bool>(nums.size());
        dfs(0);
        return res;
    }
};
```



```python3

```

