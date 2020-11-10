#  [77. 组合](https://leetcode-cn.com/problems/combinations/)

## 题意



## 题解



```c++
class Solution {
public:
    int n, k;
    vector<vector<int>> res;
    vector<int> t;
    void dfs(int step) {
        if(t.size() == k) {
            res.push_back(t);
            return;
        }
        for(int i = step; i <= n; ++i) {
            t.push_back(i);
            dfs(i+1);
            t.pop_back();
        }
    }
    vector<vector<int>> combine(int n, int k) {
        this->n = n;
        this->k = k;
        dfs(1);
        return res;
    }
};
```



```python3

```

