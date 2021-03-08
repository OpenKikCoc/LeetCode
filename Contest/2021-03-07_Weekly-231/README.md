## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-231/)


### [5697. 检查二进制字符串字段](https://leetcode-cn.com/problems/check-if-binary-string-has-at-most-one-segment-of-ones/)

略

```c++
class Solution {
public:
    bool checkOnesSegment(string s) {
        int n = s.size(), p = -1;
        for (int i = 0; i < n; ++ i )
            if (s[i] == '1') {
                if (p != -1 && p != i - 1)
                    return false;
                else p = i;
            }
        return true;
    }
};
```


### [5698. 构成特定和需要添加的最少元素](https://leetcode-cn.com/problems/minimum-elements-to-add-to-form-a-given-sum/)

简单计数

```c++
class Solution {
public:
    using LL = long long;
    int minElements(vector<int>& nums, int limit, int goal) {
        int n = nums.size();
        LL s = 0;
        for (auto v : nums)
            s += v;
        LL d = abs(goal - s);
        return (d + limit - 1) / limit;
    }
};
```

### [5699. 从第一个节点出发到最后一个节点的受限路径数](https://leetcode-cn.com/problems/number-of-restricted-paths-from-first-to-last-node/)

注意 dijkstra auto 不能写引用 会出问题 // todo

```c++
class Solution {
public:
    const static int N = 20010, M = 100010, MOD = 1e9 + 7, INF = 0x3f3f3f3f;
    using PII = pair<int, int>;
    
    // gragh
    int h[N], e[M], w[M], ne[M], idx;
    
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    // val
    int n;
    int dist[N], f[N];
    bool st[N];
    
    void init() {
        memset(h, -1, sizeof h);
        memset(st, 0, sizeof st);
        idx = 0;
    }
    
    void dijkstra(int s) {
        memset(dist, 0x3f, sizeof dist);
        memset(st, 0, sizeof st);
        priority_queue<PII, vector<PII>, greater<PII>> heap;
        heap.push({0, s});
        dist[s] = 0;
        while (!heap.empty()) {
            auto [d, u] = heap.top(); heap.pop();
            if (st[u]) continue;
            st[u] = true;
            for (int i = h[u]; ~i; i = ne[i]) {
                int j = e[i];
                if (dist[j] > d + w[i]) {
                    dist[j] = d + w[i];
                    heap.push({dist[j], j});
                }
            }
        }
    }
    
    void dfs(int u) {
        if (f[u] != -1) return;
        
        f[u] = 0;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (dist[u] > dist[j]) {
                dfs(j);
                f[u] = (f[u] + f[j]) % MOD;
            }
        }
    }
    
    int countRestrictedPaths(int n, vector<vector<int>>& edges) {
        init();
        this->n = n;
        for (auto & e : edges)
            add(e[0], e[1], e[2]), add(e[1], e[0], e[2]);
        
        dijkstra(n);
        
        memset(f, -1, sizeof f);
        memset(st, 0, sizeof st);
        f[n] = 1;
        dfs(1);
        return f[1];
    }
};
```

因为必然可达，所以可以直接 sort

```c++
using PII = pair<int, int>;
#define x first
#define y second

class Solution {
public:
    const int INF = 0x3f3f3f3f, MOD = 1e9 + 7;
    vector<vector<PII>> g;
    vector<int> f, dist;
    vector<bool> st;
    
    int countRestrictedPaths(int n, vector<vector<int>>& edges) {
        g.resize(n + 1), f.resize(n + 1), dist.resize(n + 1, INF), st.resize(n + 1);
        for(auto& e: edges) {
            int a = e[0], b = e[1], c = e[2];
            g[a].push_back({b, c});
            g[b].push_back({a, c});
        }
        queue<int> q;
        q.push(n);
        dist[n] = 0;
        while (q.size()) {
            auto t = q.front();
            q.pop();
            st[t] = false;
            
            for (auto& v: g[t]) {
                int j = v.x, w = v.y;
                if (dist[j] > dist[t] + w) {
                    dist[j] = dist[t] + w;
                    if (!st[j]) {
                        q.push(j);
                        st[j] = true;
                    }
                }
            }
        }
        
        vector<PII> vs;
        for (int i = 1; i <= n; i ++ ) vs.push_back({dist[i], i});
        sort(vs.begin(), vs.end());
        
        f[n] = 1;
        for (auto& v: vs) {
            int d = v.x, u = v.y;
            for (auto p: g[u]) {
                int j = p.x;
                if (d > dist[j])
                    f[u] = (f[u] + f[j]) % MOD;
            }
        }
        return f[1];
    }
};
```

### [5700. 使所有区间的异或结果为零](https://leetcode-cn.com/problems/make-the-xor-of-all-segments-equal-to-zero/) [TAG]

以 k 为周期

注意各类细节

```c++
class Solution {
public:
    // 直觉: 更改最靠右的元素 ==> WA
    // 考虑：分组
    const static int M = 1024;
    const int INF = 1e8;
    int s[M];
    int minChanges(vector<int>& nums, int k) {
        int n = nums.size(), m = (n + k - 1) / k;
        // 第 k 组为止异或状态值
        vector<vector<int>> f(k + 1, vector<int>(M, INF));
        f[0][0] = 0;

        // 所有列都先使用众数，随后修改众数个数最少的一列即可
        int sum = 0, minv = INF;
        for (int i = 1; i <= k; ++ i ) {
            memset(s, 0, sizeof s);
            int len = m;
            if (n % k && n % k < i) -- len; // 最后一行的某些列 不足m
            
            // 计数
            for (int j = 0; j < len; ++ j )
                s[nums[j * k + i - 1]] ++ ;
            // 众数 某一列用了一个全新的数
            int maxv = 0;
            for (int j = 0; j < M; ++ j )
                if (s[j])
                    maxv = max(maxv, s[j]);
            sum += len - maxv, minv = min(minv, maxv);
            
            // 某一列都用了原来的某个数
            for (int j = 0; j < M; ++ j )
                for (int u = 0; u < len; ++ u ) {
                    int x = nums[u * k + i - 1], cost = len - s[x];
                    f[i][j] = min(f[i][j], f[i - 1][j ^ x] + cost);
                }
        }
        return min(sum + minv, f[k][0]);
    }
};
```
