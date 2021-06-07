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



```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        if not n:return []
        res =[]

        def dfs(path, i):
            if len(path) == k:
                res.append(path[:])
                return 
            for u in range(i, n + 1):
                path.append(u)   # 踩坑：需要在循环里把当前数加入到path中
                dfs(path, u + 1)
                path.pop()

        dfs([], 1)
        return res
```

