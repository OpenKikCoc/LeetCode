#  [77. 组合](https://leetcode.cn/problems/combinations/)

## 题意



## 题解



```c++
class Solution {
public:
    int n, k;
    vector<vector<int>> res;
    vector<int> t;
    void dfs(int step) {
        if (t.size() == k) {
            res.push_back(t);
            return;
        }
        for (int i = step; i <= n; ++ i ) {
            t.push_back(i);
            dfs(i + 1);
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
"""
深度优先搜索，每层枚举第 u 个数选哪个，一共枚举 k 层。由于这道题要求组合数，不考虑数的顺序，所以我们需要再记录一个值，表示当前数需要从几开始选，来保证所选的数递增。

时间复杂度分析：一共有 Ckn 个方案，另外记录每个方案时还需要 O(k)的时间，所以时间复杂度是 O(Ckn×k)。
"""

class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        if not n:return []
        res =[]

        def dfs(path, i):
            if len(path) == k:
                res.append(path[:])
                return 
            for u in range(i, n + 1):
                # 踩坑：需要在循环里把当前数加入到path中，否则就是必须从第一个数字开始组合
                path.append(u)   
                dfs(path, u + 1)
                path.pop()

        dfs([], 1)
        return res
```

