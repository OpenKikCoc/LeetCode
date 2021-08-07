#  [491. 递增子序列](https://leetcode-cn.com/problems/increasing-subsequences/)

## 题意



## 题解

需判重 枚举path中每个位置应该放什么

```c++
// yxc
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    void dfs(vector<int> & nums, int pos) {
        if (path.size() >= 2) res.push_back(path);
        if (pos == nums.size()) return;
        unordered_set<int> S;
        for (int i = pos; i < nums.size(); ++ i )
            if (path.empty() || nums[i] >= path.back()) {
                // if (i > pos && nums[i] == nums[i - 1]) continue; // is wrong cause the `nums` is not sorted
                if (S.count(nums[i])) continue;
                S.insert(nums[i]);
                path.push_back(nums[i]);
                dfs(nums, i + 1);
                path.pop_back();
            }
    }
    vector<vector<int>> findSubsequences(vector<int>& nums) {
        dfs(nums, 0);
        return res;
    }
};


class Solution {
public:
    vector<vector<int>> res;
    vector<int> stack;
    bool is_first(vector<int>& nums, int last, int pos) {
        for (int i = last + 1; i < pos; ++ i )
            if (nums[i] == nums[pos]) return false;
        return true;
    }
    void dfs(vector<int>& nums, int last, int pos) {
        if (pos == nums.size()) return;
        if ((stack.empty() || nums[pos] >= stack.back()) && is_first(nums, last, pos)) {
            stack.push_back(nums[pos]);
            if (stack.size() >= 2) res.push_back(stack);
            dfs(nums, pos, pos + 1);
            stack.pop_back();
        }
        dfs(nums, last, pos + 1);
    }
    vector<vector<int>> findSubsequences(vector<int>& nums) {
        dfs(nums, -1, 0);
        return res;
    }
};
```



```python3

```

