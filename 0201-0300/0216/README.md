#  [216. 组合总和 III](https://leetcode.cn/problems/combination-sum-iii/)

## 题意



## 题解



```c++
class Solution {
public:
    int n, k;
    vector<vector<int>> res;
    vector<int> t;
    void dfs(int pos, int tar) {
        if (!tar) {
            if (t.size() == k) res.push_back(t);
            return;
        }
        for (int i = pos; i <= 9; ++ i ) {
            t.push_back(i);
            dfs(i + 1, tar - i);
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



```python
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        if n == 0:return []
        res = []

        def dfs(path, n, i):
            if n == 0 and len(path) == k:  # 踩坑1: 别忘了 个数 要为 k 这个条件！！
                res.append(path[:])
                return 
            for j in range(i, 10):  # 踩坑2：这里遍历的尾部 不能写 n, 因为n在每次递归的过程中 都发生了变化
                if j > n:return  # 剪枝
                path.append(j)
                dfs(path, n - j, j + 1) 
                path.pop()
        dfs([], n, 1)
        return res
```

