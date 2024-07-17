#  [684. 冗余连接](https://leetcode.cn/problems/redundant-connection/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> p;
    int find(int x) {
        if (p[x] != x) return p[x] = find(p[x]);
        return p[x];
    }
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        p.resize(n + 1);
        for (int i = 1; i <= n; ++ i ) p[i] = i;

        for (auto & e : edges) {
            int a = find(e[0]), b = find(e[1]);
            if (a != b) p[a] = p[b];
            else return e;
        }
        return {};
    }
};
```



```python
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        p = [i for i in range(n + 1)]

        def find(x):
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]

        for x in edges:
            a, b = x[0], x[1]
            pa, pb = find(a), find(b)
            if pa != pb:
                p[pb] = pa
            else:
                return x
```

