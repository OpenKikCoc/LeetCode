## [比赛链接](https://leetcode.cn/contest/sf-tech/)


### [顺丰鄂州枢纽运转中心环线检测](https://leetcode.cn/contest/sf-tech/problems/EUpcmh/)

spfa 判负环

略

```c++
class Solution {
public:
    const static int N = 110;
    
    int h[N], e[N], ne[N], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int q[N * N], dist[N], cnt[N];
    bool st[N];
    unordered_set<int> S;
    
    bool spfa() {
        memset(dist, 0, sizeof dist);
        memset(cnt, 0, sizeof cnt);
        memset(st, 0, sizeof st);
        
        int hh = 0, tt = -1, n = S.size();
        for (auto x : S)
            q[ ++ tt] = x, st[x] = true;
        
        while (hh <= tt) {
            int t = q[hh ++ ];
            st[t] = false;
            
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                if (dist[j] < dist[t] + 1) {
                    dist[j] = dist[t] + 1;
                    cnt[j] = cnt[t] + 1;
                    if (cnt[j] >= n)
                        return true;
                    if (!st[j])
                        q[ ++ tt ] = j, st[j] = true;
                }
            }
        }
        return false;
    }
    
    bool hasCycle(string graph) {
        init();
        
        stringstream in(graph);
        string s;
        while (getline(in, s, ',')) {
            int a, b;
            sscanf(s.c_str(), "%d->%d", &a, &b);
            add(a, b);
            S.insert(a), S.insert(b);
        }
        
        return spfa();
    }
};
```



```python
class Solution:
    def hasCycle(self, graph: str) -> bool:
        paths = graph.split(',')
        edge = defaultdict(set)
        d = defaultdict(int)
        for path in paths:
            x, y = path.split('->')
            edge[x].add(y)
            d[y] += 1
        queue = deque([x for x in edge if x not in d])
        vis = set(queue)
        while queue:
            node = queue.popleft()
            for x in edge[node]:
                d[x] -= 1
                if d[x] == 0:
                    queue.append(x)
                    vis.add(x)
        return len(vis) != len(edge)
```



### [小哥派件装载问题](https://leetcode.cn/contest/sf-tech/problems/cINqyA/)

01 背包

略

```c++
class Solution {
public:
    const static int N = 2010;
    
    int f[N];
    
    int minRemainingSpace(vector<int>& N, int V) {
        memset(f, 0, sizeof f);
        int n = N.size();
        for (int i = 0; i < n; ++ i )
            for (int j = V; j >= N[i]; -- j )
                f[j] = max(f[j], f[j - N[i]] + N[i]);
        return V - f[V];
    }
};
```



```python
class Solution:
    def minRemainingSpace(self, nums: List[int], m: int) -> int:
        n = len(nums)
        f = [0] * (m + 1)
        for i in range(n):
            for j in range(m, nums[i] - 1, -1):
                f[j] = max(f[j], f[j - nums[i]] + nums[i])
        return m - f[m]
```



###[收件节节高](https://leetcode.cn/contest/sf-tech/problems/8oimK4/) 

简单 dp

略

```c++
class Solution {
public:
    int findMaxCI(vector<int>& nums) {
        int res = 0, n = nums.size();
        for (int i = 0, c = 0; i < n; ++ i ) {
            if (i == 0 || nums[i] > nums[i - 1])
                c ++ ;
            else
                c = 1;
            res = max(res, c);
        }
            
        return res;
    }
};
```



```python
class Solution:
    def findMaxCI(self, nums: List[int]) -> int:
        if not nums:
            return 0
        n = len(nums)
        res, tmp = 1, 1
        for i in range(1, n):
            if nums[i] - nums[i - 1] > 0:
                tmp += 1
            else:
                tmp = 1
            res = max(res,tmp)        
        return res
      
# Mine      
class Solution:
    def findMaxCI(self, nums: List[int]) -> int:
        if not nums:return 0
        n = len(nums)
        l, r = 0, 0
        res = 1
        while r < len(nums) - 1:
            if nums[r] < nums[r + 1]:
                r += 1
            else:
                res = max(res, r - l + 1)
                r += 1
                l = r
        res = max(res, r - l + 1)
        return res      
```



### [顺丰中转场车辆入场识别-电子围栏 ](https://leetcode.cn/contest/sf-tech/problems/uWWzsv/)TODO

待整理模版

```c++
int sign(double x) { return fabs(x) <= 1e-8 ? 0 : (x > 0 ? 1 : -1); }
struct Point {
        double x, y;
        Point() {}
        Point(double x, double y) : x(x), y(y) {}
        int quad() const{return sign(y) == 1 || (sign(y)== 0&&sign(x)>= 0);}
    };
    Point operator + (const Point& p1, const Point& p2) {
        return Point(p1.x + p2.x, p1.y + p2.y);
    }
    Point operator - (const Point& p1, const Point& p2) {
        return Point(p1.x - p2.x, p1.y - p2.y);
    }
    Point operator / (const Point& p1, double d) {
        return Point(p1.x / d, p1.y / d);
    }
    Point operator * (const Point& p1, double d) {
        return Point(p1.x * d, p1.y * d);
    }
    double det(Point p1, Point p2) { return p1.x * p2.y - p1.y * p2.x; }
    double dot(Point p1, Point p2) { return p1.x * p2.x + p1.y * p2.y; }
    struct Line {
        Point a, b;
        Line() {}
        Line(Point a, Point b) : a(a), b(b) {}
        bool include(const Point &p) const{return sign(det(b - a, p - a))>0;}
    };
    bool onSeg(const Line &l, const Point &p) { // 点在线段上
	    return sign(det(p - l.a, l.b - l.a)) == 0 && sign(dot(p - l.a, p - l.b)) <= 0;
    }
class Solution {
public:
    int n;
    Point p[20001];
    bool in(Point x) {
        int ret = 0;
        for (int i = 1; i <= n; i ++) {
            Point u = p[i], v = p[i % n + 1];
            if (onSeg(Line(u, v), x)) return true;
            if (sign(u.y - v.y) <= 0) swap(u, v);
            if (sign(x.y - u.y) > 0 || sign(x.y - v.y) <= 0) continue;
            ret += sign(det(v - x, u - x)) > 0;
        }
        return ret & 1;
    }
    bool isPointInPolygon(double x, double y, vector<double>& coords) {
        n = coords.size() / 2;
        for (int i = 0; i < n; i ++) p[i + 1] = Point(coords[2 * i], coords[2 * i + 1]);
        Point o = Point(x, y);
        for (int i = 1; i <= n; i ++) {
            Line l = Line(p[i], p[i % n + 1]);
            if (onSeg(l, o)) return true;
        }
        return in(o);
    }
};
```

###  [慧眼神瞳](https://leetcode.cn/contest/sf-tech/problems/BN8jAm/)

经典并查集

略

```c++
class Solution {
public:
    const static int N = 110;
    
    int pa[N];
    void init() {
        for (int i = 0; i < N; ++ i )
            pa[i] = i;
    }
    int find(int x) {
        if (pa[x] != x)
            pa[x] = find(pa[x]);
        return pa[x];
    }
    
    bool isCompliance(vector<vector<int>>& d, int m) {
        init();
        
        int n = d.size(), res = n;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j ) {
                int dis = d[i][j];
                if (dis <= 2) {
                    int p1 = find(i), p2 = find(j);
                    if (p1 != p2) {
                        pa[p1] = p2;
                        res -- ;
                    }
                }
            }
        return res <= m;
    }
};
```



```python
class Solution:
    def isCompliance(self, dis: List[List[int]], n: int) -> bool:
        m = len(dis)
        p = [i for i in range(m)]
        
        def find(x):
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]
    
        size = m
        for i in range(m):
            for j in range(m):
                if dis[i][j] <= 2:
                    if find(i) != find(j):
                        p[find(i)] = find(j)
                        size -= 1
        
        return size <= n
```

