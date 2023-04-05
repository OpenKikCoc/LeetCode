## [比赛链接](https://leetcode.cn/contest/biweekly-contest-101/)


### [2605. 从两个数字数组里生成最小数字](https://leetcode.cn/problems/form-smallest-number-from-two-digit-arrays/)



```c++
class Solution {
public:
    bool has(vector<int> & a, int b) {
        for (auto x : a)
            if (x == b)
                return true;
        return false;
    }
    
    int minNumber(vector<int>& nums1, vector<int>& nums2) {
        for (int i = 1; i < 100; ++ i ) {
            int x = i;
            bool f1 = false, f2 = false;
            while (x) {
                int d = x % 10;
                x /= 10;
                f1 |= has(nums1, d), f2 |= has(nums2, d);
            }
            if (f1 && f2)
                return i;
        }
        return -1;
    }
};
```


### [2606. 找到最大开销的子字符串](https://leetcode.cn/problems/find-the-substring-with-maximum-cost/)



```c++
class Solution {
public:
    int vs[30];
    
    int maximumCostSubstring(string s, string chars, vector<int>& vals) {
        for (int i = 0; i < 26; ++ i )
            vs[i] = i + 1;
        for (int i = 0; i < chars.size(); ++ i )
            vs[chars[i] - 'a'] = vals[i];
        
        int minv = 0, sum = 0, res = 0;
        for (auto c : s) {
            sum += vs[c - 'a'];
            // cout << " minv = " << minv << " sum = " << sum << endl;
            
            res = max(res, sum - minv);
            minv = min(minv, sum);
        }
        return res;
    }
};
```

### [2607. 使子数组元素和相等](https://leetcode.cn/problems/make-k-subarray-sums-equal/) [TAG]

结论

```c++
class Solution {
public:
    // 经典结论：对于一个长度为 n 的环，如果环上所有间隔为 k 的元素都要相等，那么环上所有间隔为 gcd(n, k) 的元素都要相等
    
    using LL = long long;
    
    LL get(vector<int> & a) {
        int n = a.size();
        if (n <= 1)
            return 0;
        
        sort(a.begin(), a.end());
        LL x = a[n / 2], res = 0;
        for (auto y : a)
            res += abs(y - x);
        return res;
    }
    
    long long makeSubKSumEqual(vector<int>& arr, int k) {
        int n = arr.size();
        int d = __gcd(n, k);
        // 如果刚好可以划分为整数个周期 则直接算
        vector<int> t[d];
        for (int i = 0; i < n; ++ i )
            t[i % d].push_back(arr[i]);

        LL res = 0;
        for (int i = 0; i < d; ++ i )
            res += get(t[i]);
        return res;
    }
};
```

### [2607. 图中的最短环](https://leetcode.cn/problems/shortest-cycle-in-a-graph/) [TAG]

无向图最小环模版 边长为一的特例

```c++
class Solution {
public:
    // 无向图最小环模版题
    // 1. 删边 + bfs(dijkstra在边长为1的特例)
    // 2. 枚举点 + bfs(dijkstra在边长为1的特例)
    using PII = pair<int, int>;     // dis, u
    const static int N = 1010, M = N << 1, INF = 0x3f3f3f3f;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    // 删去 i-j 边后，假定 i->j dis 为 len 则最小环为 len+1
    // 枚举边 再跑 dijkstra 即可
    int work1(int n) {
        int res = INF;
        for (int i = 0; i < n; ++ i )
            for (int x = h[i]; ~x; x = ne[x]) {
                int j = e[x];
                // 枚举 i-j 边，删除此边
                static int d[N], st[N];
                memset(d, 0x3f, sizeof d), memset(st, 0, sizeof st);
                priority_queue<PII, vector<PII>, greater<PII>> q;
                q.push({0, i}); d[i] = 0;
                while (q.size()) {
                    auto [dis, u] = q.top(); q.pop();
                    if (st[u])
                        continue;
                    st[u] = 1;
                    for (int y = h[u]; ~y; y = ne[y]) {
                        int v = e[y];
                        if (u == i && v == j)   // 跳过被删除的边
                            continue;
                        if (d[v] > d[u] + 1) {
                            d[v] = d[u] + 1;
                            q.push({d[v], v});
                        }
                    }
                }
                res = min(res, d[j] + 1);
            }
        return res > INF / 2 ? -1 : res;
    }
    
    // 枚举起点，如果有发现能够重复到达某个点 v 则为两个相逢路径的和
    // “如果发现存在路径 1→2→3→5 和 路径 1→2→4→5 (1 和 5 之间并不存在环) 的情况无需排除，因为从 2 开始能找到更短的、合法的环路”
    int work2(int n) {
        int res = INF;
        for (int i = 0; i < n; ++ i ) {
            static int d[N], st[N];
            memset(d, 0x3f, sizeof d), memset(st, 0, sizeof st);
            priority_queue<PII, vector<PII>, greater<PII>> q;
            q.push({0, i}), d[i] = 0;
            
            static int mark[N]; // 记录是否访问过，如果访问过是从哪里来
            memset(mark, -1, sizeof mark);
            mark[i] = 0;
            
            while (q.size()) {
                auto [dis, u] = q.top(); q.pop();
                if (st[u])
                    continue;
                st[u] = true;
                for (int y = h[u]; ~y; y = ne[y]) {
                    int v = e[y];
                    // 第一次访问
                    if (d[v] > INF / 2) {
                        d[v] = d[u] + 1;
                        q.push({d[v], v});
                        mark[v] = u;
                    } else if (v != mark[u]) {  // ATTENTION 是 v != mark[u]
                        res = min(res, d[u] + d[v] + 1);
                    }
                }
            }
        }
        return res > INF / 2 ? -1 : res;
    }
    
    int findShortestCycle(int n, vector<vector<int>>& edges) {
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        // return work1(n);
        return work2(n);
    }
};
```
