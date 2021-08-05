#  [39. 组合总和](https://leetcode-cn.com/problems/combination-sum/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> t;
    void dfs(vector<int>& c, int p, int tar) {
        if (!tar) {
            res.push_back(t);
            return;
        }
        for (int i = p; i < c.size(); ++ i ) {
            if (c[i] > tar) return;
            t.push_back(c[i]);
            dfs(c, i, tar - c[i]);
            t.pop_back();
        }
    }
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        dfs(candidates, 0, target);
        return res;
    }
};
```



```python
class Solution:
    def combinationSum(self, nums: List[int], target: int) -> List[List[int]]:
        if not nums:return []
        n = len(nums)
        nums.sort()
        res = []

        def dfs(path, target, i):
            if target == 0:
                res.append(path[:])
                return 
            for k in range(i, n):  # 这里的顺序 k 开始搜索，可以保证每个数在其他结果中不会被重复用
                if nums[k] > target:return 
                path.append(nums[k])
                dfs(path, target - nums[k], k)
                path.pop()

        dfs([], target, 0)
        return res
```

