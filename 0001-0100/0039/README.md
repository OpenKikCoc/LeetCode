#  [39. 组合总和](https://leetcode.cn/problems/combination-sum/)

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
# 无重复元素，并且 每个数字可以用无数次

class Solution:
    def combinationSum(self, nums: List[int], target: int) -> List[List[int]]:
        if not nums:return []
        n = len(nums)
        # 要先排序，排序是为了剪枝；不然后面 nums[k] > target的时候 就没办法直接 return
        nums.sort()
        res = []

        def dfs(path, target, i):
            if target == 0:
                res.append(path[:])
                return 
            # 这里的顺序k开始搜索，可以保证每个数在其他结果中不会被重复用，不需要用另外一个变量st
            for k in range(i, n):  
                if nums[k] > target:return 
                path.append(nums[k])
                dfs(path, target - nums[k], k)
                path.pop()

        dfs([], target, 0)
        return res
      
      
      
      
      # !!!这种 dfs 是错误的，这个代码的意思是，不管怎么样，一定要把第一个元素加入到路径中
      # 这种代码是类似 求 二叉树的 根 到 叶子结点的路径的题
        def dfs(idx, path, target):
            if nums[idx] > target:return 
            path.append(nums[idx])
            target -= nums[idx]
            if target == 0:
                res.append(path[:])
                return 
            for k in range(idx, n):
                dfs(k, path, target)
                path.pop()
        dfs(0, [], target)
        return res
```

