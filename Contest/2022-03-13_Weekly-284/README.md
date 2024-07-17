## [比赛链接](https://leetcode.cn/contest/weekly-contest-284/)


### [2200. 找出数组中的所有 K 近邻下标](https://leetcode.cn/problems/find-all-k-distant-indices-in-an-array/)

模拟即可

```c++
class Solution {
public:
    vector<int> findKDistantIndices(vector<int>& nums, int key, int k) {
        int n = nums.size();
        vector<bool> st(n);
        for (int i = 0; i < n; ++ i )
            if (nums[i] == key) {
                for (int j = max(0, i - k); j <= min(n, i + k); ++ j )
                    st[j] = true;
            }
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            if (st[i])
                res.push_back(i);
        return res;
    }
};
```


### [2201. 统计可以提取的工件](https://leetcode.cn/problems/count-artifacts-that-can-be-extracted/)

简单前缀和

```c++
class Solution {
public:
    const static int N = 1e3 + 10;
    
    int g[N][N];
    
    int get(int r1, int c1, int r2, int c2) {
        return g[r2][c2] - g[r1 - 1][c2] - g[r2][c1 - 1] + g[r1 - 1][c1 - 1];
    }
    
    int digArtifacts(int n, vector<vector<int>>& artifacts, vector<vector<int>>& dig) {
        memset(g, 0, sizeof g);
        for (auto & d : dig)
            g[d[0] + 1][d[1] + 1] = true;
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= n; ++ j )
                g[i][j] = g[i - 1][j] + g[i][j - 1] - g[i - 1][j - 1] + g[i][j];
        
        int res = 0;
        for (auto & a : artifacts) {
            int r1 = a[0] + 1, c1 = a[1] + 1, r2 = a[2] + 1, c2 = a[3] + 1;
            if (get(r1, c1, r2, c2) == (c2 - c1 + 1) * (r2 - r1 + 1))
                res ++ ;
        }
        return res;
    }
};
```

### [2202. K 次操作后最大化顶端元素](https://leetcode.cn/problems/maximize-the-topmost-element-after-k-moves/) [TAG]

思维题：分情况讨论 + 分析

分析速度需要加快

最简代码：

```c++
class Solution {
public:
    int maximumTop(vector<int>& nums, int k) {
        // case 1:
        int n = nums.size();
        if (n == 1)
            return (k & 1 ? -1 : nums[0]);
        
        int res = -1;
        // case 2:
        for (int i = 0; i < n && i <= k; ++ i ) {
            if (i == k - 1)
                continue;
            else
                res = max(res, nums[i]);
        }
        
        return res;
    }
};
```

### [2203. 得到要求路径的最小带权子图](https://leetcode.cn/problems/minimum-weighted-subgraph-with-the-required-paths/) [TAG]

经典图论：**枚举中间点**

```c++
class Solution {
public:
    using LL = long long;
    using PLL = pair<LL, LL>;
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    int h[N], rh[N], e[M], w[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        memset(rh, -1, sizeof rh);
        idx = 0;
    }
    void add(int h[], int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    LL d[3][N];
    
    void dijkstra(int src, int h[], LL d[]) {
        for (int i = 0; i < n; ++ i )
            d[i] = 1e18;
        bool st[N];
        memset(st, 0, sizeof st);
        
        priority_queue<PLL, vector<PLL>, greater<PLL>> heap;
        heap.push({0, src}); d[src] = 0;
        while (heap.size()) {
            auto [dis, u] = heap.top(); heap.pop();
            if (st[u])
                continue;
            st[u] = true;
            for (int i = h[u]; ~i; i = ne[i]) {
                int j = e[i], c = w[i];
                if (d[j] > d[u] + c) {
                    d[j] = d[u] + c;
                    heap.push({d[j], j});
                }
            }
        }
    }
    
    long long minimumWeight(int n, vector<vector<int>>& edges, int src1, int src2, int dest) {
        init();
        for (auto & e : edges)
            add(h, e[0], e[1], e[2]), add(rh, e[1], e[0], e[2]);
        this->n = n;
        
        dijkstra(src1, h, d[0]);
        dijkstra(src2, h, d[1]);
        dijkstra(dest, rh, d[2]);
        
        LL res = 1e18;
        for (int i = 0; i < n; ++ i )
            res = min(res, d[0][i] + d[1][i] + d[2][i]);
        if (res >= 1e18)
            return -1;
        return res;
    }
};
```
