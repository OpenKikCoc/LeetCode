#  [78. 子集](https://leetcode-cn.com/problems/subsets/)

## 题意



## 题解

```c++
class Solution {
public:
    vector<int> ns;
    int n;
    vector<vector<int>> res;
    vector<int> t;

    void dfs(int u) {
        if (u == ns.size()) {
            res.push_back(t);
            return;
        }
        dfs(u + 1);
        t.push_back(ns[u]);
        dfs(u + 1);
        t.pop_back();
    }

    vector<vector<int>> subsets(vector<int>& nums) {
        this->ns = nums;
        this->n = ns.size();
        dfs(0);
        return res;
    }
};
```

```c++
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> res;
        for (int i = 0; i < 1 << n; ++ i ) {
            vector<int> t;
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1)
                    t.push_back(nums[j]);
            res.push_back(t);
        }
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

