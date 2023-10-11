## [比赛链接](https://leetcode.cn/contest/weekly-contest-365/)


### [2873. 有序三元组中的最大值 I](https://leetcode.cn/problems/maximum-value-of-an-ordered-triplet-i/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long maximumTripletValue(vector<int>& nums) {
        int n = nums.size();
        LL res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                for (int k = j + 1; k < n; ++ k ) {
                    LL a = nums[i], b = nums[j], c = nums[k];
                    res = max(res, (a - b) * c);
                }
        return res;
    }
};
```


### [2874. 有序三元组中的最大值 II](https://leetcode.cn/problems/maximum-value-of-an-ordered-triplet-ii/)

数据范围更大 较显然的边扫描边维护即可

注意 mind / maxd 的计算细节

```c++
class Solution {
public:
    using LL = long long;
    
    long long maximumTripletValue(vector<int>& nums) {
        int n = nums.size();
        LL res = 0;
        LL minv = 1e9, maxv = -1e9, mind = 1e9, maxd = -1e9;
        for (int i = 0; i < n; ++ i ) {
            // 考虑当前作为 c 左侧可以使用的值
            LL x = nums[i];
            if (x == 0) {
                // do nothing
            } else if (i > 1) {
                LL a = mind * x, b = maxd * x;
                res = max(res, max(a, b));
            }
            
            mind = min(mind, minv - x), maxd = max(maxd, maxv - x);
            minv = min(minv, x), maxv = max(maxv, x);
        }
        return res;
    }
};
```

### [2875. 无限数组的最短子数组](https://leetcode.cn/problems/minimum-size-subarray-in-infinite-array/)

简单推导 略 加快速度

```c++
class Solution {
public:
    using LL = long long;
    
    int minSizeSubarray(vector<int>& nums, int target) {
        int n = nums.size();
        
        LL s = 0, tar = target;
        for (auto x : nums)
            s += x;
        
        int res = 0;
        if (tar >= s) {         // 已知 tar>=1 && s>0
            int t = tar / s;
            res += t * n, tar %= s;
        }
        
        // 接下来只需要选择原数组的一个连续子区间，使得连续区间内的和能够等于 tar 即可
        if (tar) {
            unordered_map<LL, int> h;
            h[0] = -1;      // 因为后面下标是0开始，这里必须是-1
            LL sum = 0;
            int d = 1e9;
            for (int i = 0; i < n + n - 1; ++ i ) {
                sum += nums[i % n];
                LL t = sum - tar;       // ATTENTION 需要 LL
                if (h.count(t))
                    d = min(d, i - h[t]);
                h[sum] = i;
            }
            if (d == 1e9)
                return -1;
            res += d;
        }
        return res;
    }
};
```

### [2876. 有向图访问计数](https://leetcode.cn/problems/count-visited-nodes-in-a-directed-graph/)

标准 scc + topo sorting

```c++
class Solution {
public:
    // 考虑有向图 可能有scc 且可能所有节点非联通的
    //   显然缩点跑dag即可
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    int h1[N], h2[N], e[M], ne[M], idx;
    void init() {
        memset(h1, -1, sizeof h1), memset(h2, -1, sizeof h2);
        idx = 0;
    }
    void add(int h[], int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int dfn[N], low[N], timestamp;
    int stk[N], top;
    bool in_stk[N];
    int id[N], scc_cnt, sz[N];
    int dout[N];
    
    void tarjan(int u) {
        dfn[u] = low[u] = ++ timestamp;
        stk[ ++ top] = u, in_stk[u] = true;
        for (int i = h1[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (!dfn[j]) {
                tarjan(j);
                low[u] = min(low[u], low[j]);
            } else if (in_stk[j])
                low[u] = min(low[u], dfn[j]);
        }
        
        if (dfn[u] == low[u]) {
            ++ scc_cnt;
            int y;
            do {
                y = stk[top -- ];
                in_stk[y] = false;
                id[y] = scc_cnt;
                sz[scc_cnt] ++ ;
            } while (y != u);
        }
    }
    
    int f[N];
    
    vector<int> countVisitedNodes(vector<int>& edges) {
        init();
        
        int n = edges.size();
        for (int i = 0; i < n; ++ i )
            add(h1, i, edges[i]);
        
        for (int i = 0; i < n; ++ i )
            if (!dfn[i])
                tarjan(i);
        
        for (int i = 0; i < n; ++ i )
            for (int j = h1[i]; ~j; j = ne[j]) {
                int k = e[j];
                int a = id[i], b = id[k];
                if (a != b)
                    add(h2, a, b);  // ATTENTION 注意遍历顺序与建图方向的关系 这里不需要反向图
            }
        
        memset(f, 0, sizeof f);
        // 注意顺序 拓扑序逆序本质就是scc序
        for (int i = 1; i <= scc_cnt; ++ i ) {
            if (!f[i]) {
                f[i] = sz[i];
            }
            for (int j = h2[i]; ~j; j = ne[j]) {
                int k = e[j];
                f[i] += f[k];
            }
        }
        
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            res.push_back(f[id[i]]);
        return res;
    }
};
```
