## [比赛链接](https://leetcode.cn/contest/biweekly-contest-113/)

>   156 / 3028
>   0:05:34
>   0:09:37  1
>   0:29:10
>   0:55:18
>   2396.4
>   加速


### [2855. 使数组成为递增数组的最少右移次数](https://leetcode.cn/problems/minimum-right-shifts-to-sort-the-array/)



```c++
class Solution {
public:
    int minimumRightShifts(vector<int>& nums) {
        int n = nums.size();
        for (int i = n; i > 0; -- i ) {
            bool flag = true;
            for (int j = 0; j < n - 1; ++ j ) {
                int x = i + j;
                if (nums[x % n] >= nums[(x + 1) % n]) {
                    flag = false;
                    break;
                }
            }
            if (flag)
                return n - i;
        }
        return -1;
    }
};
```


### [2856. 删除数对后的最小数组长度](https://leetcode.cn/problems/minimum-array-length-after-pair-removals/)



```c++
class Solution {
public:
    // 类似CF袋鼠的题
    int minLengthAfterRemovals(vector<int>& nums) {
        int n = nums.size(), p = 0;
        for (int i = n / 2; i < n && p < n / 2; ++ i )  // ATTENTION: p < n / 2
            if (nums[i] > nums[p])
                p ++ ;
        return n - p * 2;
    }
};
```

### [2857. 统计距离为 k 的点对](https://leetcode.cn/problems/count-pairs-of-points-with-distance-k/)

根据数据范围 枚举思路

```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;
    
    // 思考: 如何转化 x1^x2 + y1^y2 ?
    //  直觉比较困难 考虑结合 k<=100
    // =>   x1^x2 = 0, y1^y2 = k
    //      x1^x2 = 1, y1^y2 = k - 1
    //      ...
    //      x1^x2 = k, y1^y2 = 0

    int countPairs(vector<vector<int>>& coordinates, int k) {
        int n = coordinates.size();
        map<PII, int> S;
        
        int res = 0;
        // 考虑 i<j 的顺序关系，需要外层循环枚举元素，内层枚举异或值
        for (int i = 0; i < n; ++ i ) {
            // 枚举 x 的异或值
            int x1 = coordinates[i][0], y1 = coordinates[i][1];
            for (int l = 0; l <= k; ++ l ) {
                int r = k - l;
                PII other = {x1 ^ l, y1 ^ r};
                if (S.count(other))
                    res += S[other];
            }
            // 边遍历边维护
            S[{x1, y1}] ++ ;
        }
        return res;
    }
};
```

### [2858. 可以到达每一个节点的最少边反转次数](https://leetcode.cn/problems/minimum-edge-reversals-so-every-node-is-reachable/)

树形 DP

```c++
class Solution {
public:
    // 显然是树形DP 考虑状态设计与转移
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    int h[N], e[M], w[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int f[N], g[N];
    
    void dfs_d(int u, int fa) {
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            dfs_d(j, u);
            f[u] += f[j] + (w[i] == 1);
        }
    }
    void dfs_u(int u, int fa) {
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            //    向上的部分 + 本条边        +  父节点的其他子树
            g[j] = g[u] + (w[i ^ 1] == 1) + (f[u] - f[j] - (w[i] == 1));
            dfs_u(j, u);
        }
    }
    
    vector<int> minEdgeReversals(int n, vector<vector<int>>& edges) {
        init();
        
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            add(a, b, 0);
            add(b, a, 1);   // ATTENTION 反转的边代价计为 1 则后续 DP 时即为统计某节点为根向外 1 的边的数量
        }
        
        memset(f, 0, sizeof f);
        memset(g, 0, sizeof g);
        dfs_d(0, -1);
        dfs_u(0, -1);
        
        // for (int i = 0; i < n; ++ i )
        //     cout << " i = " << i << ' ' << f[i] << ' ' << g[i] << endl;
        // cout << endl;
        
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            res.push_back(f[i] + g[i]);
        return res;
    }
};
```
