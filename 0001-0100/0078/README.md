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



```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        if not nums:return []
        n = len(nums)
        res = []
        def dfs(path, idx):
            res.append(path[:])
            for k in range(idx, n):
                path.append(nums[k])
                dfs(path, k + 1)
                path.pop()

        dfs([], 0)
        return res
```

