#  [216. 组合总和 III](https://leetcode-cn.com/problems/combination-sum-iii/)

## 题意



## 题解



```c++
class Solution {
public:
    int n, k;
    vector<vector<int>> res;
    vector<int> t;
    void dfs(int pos, int tar) {
        if(!tar) {
            if(t.size() == k) res.push_back(t);
            return;
        }
        for(int i = pos; i <= 9; ++i) {
            t.push_back(i);
            dfs(i+1, tar-i);
            t.pop_back();
        }
    }
    vector<vector<int>> combinationSum3(int k, int n) {
        this->n = n; this->k = k;
        dfs(1, n);
        return res;
    }
};
```



```python3

```

