#  [547. 省份数量](https://leetcode-cn.com/problems/number-of-provinces/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> p;

    int find(int x) {
        if (p[x] != x) p[x] = find(p[x]);
        return p[x];
    }

    int findCircleNum(vector<vector<int>>& M) {
        int n = M.size();
        for (int i = 0; i < n; i ++ ) p.push_back(i);

        int cnt = n;
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < n; j ++ )
                if (M[i][j] && find(i) != find(j)) {
                    p[find(i)] = find(j);
                    cnt -- ;
                }

        return cnt;
    }
};
```



```python
# 并查集 问题
"""
此题为并查集的入门题。
基础的并查集能解决的一类问题是不断将两个元素所在集合合并，并随时询问两个元素是否在同一集合。
定义数组 f(i) 表示 i 元素所在集合的根结点（代表元素）。初始时，所有元素所在集合的根结点就是自身。
合并时，直接将两个集合的根结点合并，即修改 f 数组。
查询时，不断通过判断 i 是否等于 f(i) 的操作，若不相等则递归判断 f(f(i))，直到 i == f(i) 为止。
但以上做法会在一条链的情况下单次查询的时间复杂度退化至线性，故可以采用路径压缩优化，将复杂度降到近似常数。读者可以自行查阅相关资料。
对于此题，最后只需检查有多少个元素为一个集合的根结点即可。
O(n2)
"""
class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n=len(isConnected)
        p=[i for i in range(n)]
        count=n

        def find(x):
            if x!=p[x]:
                p[x]=find(p[x])
            return p[x]
        
        def merge(a,b):
            nonlocal count
            if find(a)==find(b):
                return
            p[find(a)]=find(b)
            count-=1
            return find(b)

        for i in range(n):
            for j in range(i+1,n):
                if isConnected[i][j]==1:
                    merge(i,j)
        return count
```

