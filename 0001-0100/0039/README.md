#  [39. 组合总和](https://leetcode-cn.com/problems/combination-sum/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> t;
    void dfs(vector<int>& c, int p, int tar) {
        if(!tar) {
            res.push_back(t);
            return;
        }
        for(int i = p; i < c.size(); ++i) {
            if(c[i] > tar) return;
            t.push_back(c[i]);
            dfs(c, i, tar-c[i]);
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



```python3

```

