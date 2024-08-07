#  [46. 全排列](https://leetcode.cn/problems/permutations/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> ns;
    int n;

    vector<vector<int>> res;
    vector<int> t;
    vector<bool> st;

    void dfs(int u) {
        if (u == n) {
            res.push_back(t);
            return;
        }

        for (int i = 0; i < n; ++ i ) {
            if (st[i])
                continue;
            st[i] = true;
            t.push_back(ns[i]);
            dfs(u + 1);
            t.pop_back();
            st[i] = false;
        }
    }

    vector<vector<int>> permute(vector<int>& nums) {
        this->ns = nums;
        this->n = ns.size();
        st = vector<bool>(n);
        
        dfs(0);

        return res;
    }
};
```



```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        res = []
        used = [False] * n 

        def dfs(path):
            if len(path) == n:
                res.append(path[:])
                return 
            for i in range(n):
                if not used[i]:
                    used[i] = True
                    path.append(nums[i])
                    dfs(path)
                    path.pop()
                    used[i] = False
        
        dfs([])
        return res
```

