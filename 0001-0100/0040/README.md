#  [40. 组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> t;
    void dfs(vector<int>& c, int pos, int tar) {
        if (!tar) {
            res.push_back(t);
            return;
        }
        for (int i = pos; i < c.size(); ++ i ) {
            if (c[i] > tar) return;
            if (i > pos && c[i] == c[i - 1]) continue;
            t.push_back(c[i]);
            dfs(c, i + 1, tar - c[i]);
            t.pop_back();
        }
    }
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        dfs(candidates, 0, target);
        return res;
    }
};
```



```python
class Solution:
    def combinationSum2(self, nums: List[int], target: int) -> List[List[int]]:
        if not nums:return []
        n = len(nums)
        nums.sort()
        res = []

        def dfs(i, path, target):
            if target == 0:
                res.append(path[:])
                return
            for k in range(i, n):
                if nums[k] > target:return  # 剪枝
                if k > i and nums[k] == nums[k - 1]:continue  #去重
                path.append(nums[k])
                dfs(k + 1, path, target - nums[k]) # 每个数只能用一次，所以这里是 k + 1
                path.pop()
        
        dfs(0, [], target)
        return res
```

