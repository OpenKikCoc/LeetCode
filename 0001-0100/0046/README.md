#  [46. 全排列](https://leetcode-cn.com/problems/permutations/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<bool> vis;
    vector<int> t;
    vector<vector<int>> res;
    void dfs(vector<int>& nums, int pos) {
        if(pos == nums.size()) {
            res.push_back(t);
            return;
        }
        for(int i = 0; i < nums.size(); ++i) {
            if(vis[i]) continue;
            vis[i] = true;
            t.push_back(nums[i]);
            dfs(nums, pos+1);
            t.pop_back();
            vis[i] = false;
        }
    }
    vector<vector<int>> permute(vector<int>& nums) {
        this->vis = vector<bool>(nums.size());
        dfs(nums, 0);
        return res;
    }
};
```



```python3

```

