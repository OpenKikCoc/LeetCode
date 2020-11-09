#  [40. 组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> t;
    void dfs(vector<int>& c, int pos, int tar) {
        if(!tar) {
            res.push_back(t);
            return;
        }
        for(int i = pos; i < c.size(); ++i) {
            if(c[i] > tar) return;
            if(i > pos && c[i] == c[i-1]) continue;
            t.push_back(c[i]);
            dfs(c, i+1, tar-c[i]);
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



```python3

```

