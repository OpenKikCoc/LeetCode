#  [207. 课程表](https://leetcode.cn/problems/course-schedule/)

## 题意



## 题解

直接 bfs topo 即可，略

也可以 bfs topo

```c++
class Solution {
public:
    bool dfs(int u, vector<vector<int>>& es, vector<int>& c) {
        c[u] = -1;
        for (auto v : es[u]) {
            if (c[v] < 0) return false;
            else if(!c[v] && !dfs(v, es, c)) return false;
        }
        c[u] = 1;
        return true;
    }
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> es(numCourses);
        for (auto e : prerequisites) {
            es[e[1]].push_back(e[0]);
        }
        vector<int> c(numCourses);
        for (int u = 0; u < numCourses; ++ u )
            if (!c[u])
                if(!dfs(u, es, c))
                    return false;
        
        return true;
    }
};
```

```c++
class Solution {
public:
    const static int N = 1e5 + 10;

    int h[N], e[N], ne[N], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }

    int d[N], q[N];

    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        init();
        memset(d, 0, sizeof d);
        for (auto & p : prerequisites)
            add(p[1], p[0]), d[p[0]] ++ ;
        
        int hh = 0, tt = -1;
        for (int i = 0; i < numCourses; ++ i )
            if (!d[i])
                q[ ++ tt] = i;
        while (hh <= tt) {
            int t = q[hh ++ ];
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                if ( -- d[j] == 0)
                    q[ ++ tt] = j;
            }
        }
        return tt == numCourses - 1;
    }
};
```


```python
# topsort 排序
# 在图论中，拓扑排序（Topological Sorting）是一个有向无环图（DAG, Directed Acyclic Graph）的所有顶点的线性序列。且该序列必须满足下面两个条件：
# 每个顶点出现且只出现一次。
# 若存在一条从顶点 A 到顶点 B 的路径，那么在序列中顶点 A 出现在顶点 B 的前面。



class Solution:
    def canFinish(self, n: int, pre: List[List[int]]) -> bool:
        N=10**5+10
        h=[-1]*N
        ev=[0]*N
        ne=[0]*N
        idx=0
        d=[0]*N 
        res=[]

        def add(a,b):
            nonlocal idx
            ev[idx]=b 
            ne[idx]=h[a]
            h[a]=idx
            idx+=1

        def topsort():
            from collections import deque
            q=deque()
            for i in range(n):
                if d[i]==0:
                    q.append(i)
            while q:
                t=q.popleft()
                res.append(t)
                i=h[t]
                while i!=-1:
                    j=ev[i]
                    d[j]-=1
                    if d[j]==0:
                        q.append(j)
                    i=ne[i]
            return len(res)==n

        for i in range(len(pre)):
            a,b=pre[i][0],pre[i][1]
            add(a,b)
            d[b]+=1
        
        if topsort():
            return True
        else:
            return False
```

