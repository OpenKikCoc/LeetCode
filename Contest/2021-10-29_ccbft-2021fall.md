## [比赛链接](https://leetcode.cn/contest/ccbft-2021fall/)


### [建信01. 间隔删除链表结点](https://leetcode.cn/contest/ccbft-2021fall/problems/woGGnF/)

略

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* deleteListNode(ListNode* head) {
        ListNode * dummy = new ListNode(-1);
        auto pre = dummy;
        int cnt = 0;
        for (auto cur = head; cur;) {
            pre->next = cur;
            pre = cur;
            if (cur->next)
                cur = cur->next->next;
            else
                break;
        }
        pre->next = nullptr;
        return dummy->next;
    }
};
```


### [建信02. 柱状图分析](https://leetcode.cn/contest/ccbft-2021fall/problems/9Rs2aO/)

略

```c++
class Solution {
public:
    vector<int> analysisHistogram(vector<int>& heights, int cnt) {
        int n = heights.size();
        sort(heights.begin(), heights.end());
        
        vector<int> ds(n);
        int p = -1;
        for (int i = cnt - 1; i < n; ++ i ) {
            ds[i] = heights[i] - heights[i - cnt + 1];
            if (p == -1 || ds[i] < ds[p])
                p = i;
        }
        
        vector<int> res;
        for (int i = p - cnt + 1; i <= p; ++ i )
            res.push_back(heights[i]);
        return res;
    }
};
```

### [建信03. 地铁路线规划 ](https://leetcode.cn/contest/ccbft-2021fall/problems/zQTFs4/)[TAG]

经典最短路变形

```c++
class Solution {
public:
    const static int N = 10010, M = 20010;
    
    int n;
    int h[N], e[M], w[M], ne[M], idx;
    int belong[N];
    int st, ed;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
        
        memset(belong, -1, sizeof belong);
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    // TLE vector
    vector<int> res, path;
    bool vis[N];
    int ans;
    //         当前点    次数     当前线路
    void dfs(int u, int cost, int last) {
        // 剪枝
        if (cost > ans)
            return;
        if (u == ed) {
            if (cost < ans || (cost == ans && path < res)) {
                ans = cost;
                res = path;
            }
            return;
        }
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i], next = belong[i];
            if (!vis[j]) {
                vis[j] = true;
                path.push_back(j);
                dfs(j, cost + (next != last), next);
                path.pop_back();
                vis[j] = false;
            }
        }
    }
    
    vector<int> metroRouteDesignI(vector<vector<int>>& lines, int start, int end) {
        init();
        this->n = lines.size(), this->st = start, this->ed = end;
        for (int i = 0; i < n; ++ i ) {
            auto line = lines[i];
            int len = line.size();
            for (int j = 1; j < len; ++ j ) {
                belong[idx] = i;
                add(line[j - 1], line[j]);
                belong[idx] = i;
                add(line[j], line[j - 1]);
            }
        }
        
        memset(vis, 0, sizeof vis);
        this->ans = INT_MAX;
        this->res = this->path = vector<int>();
        
        // 起点可以选择不同的线路
        for (int i = h[st]; ~i; i = ne[i]) {
            int next = belong[i];
            vis[st] = true;
            path.push_back(st);
            dfs(st, 0, next);
            path.pop_back();
            vis[st] = false;
        }
        
        return res;
    }
};
```

### [建信04. 电学实验课](https://leetcode.cn/contest/ccbft-2021fall/problems/lSjqMF/) [TAG]

非常好的组合计数题

**重复做 TODO**

```c++
/*
1. 由于每一列只允许防止一个插孔，所以将所有目标插孔按照列从小到大排序后，考虑每两个目标插孔之间的方案数，然后求乘积就是答案。

2. 设 v 是一个长度为 row 的数组，v(j) 表示到达第 j 行的方案数。设二维转移矩阵 T，其中 T(i,j)=1 表示可以从前一列的第 i 行到达当前列的第 j 行。
所以每移动一列，v 就可以更新为 T⋅v。移动 k 列时，vk=T^k⋅v0。

3. 可以提前预处理出来所有二进制位的矩阵乘积结果，即 T1，T2，T4 直到 T29，然后根据两个目标插孔之间的距离进行组合，计算出方案数。

*/
class Solution {
public:
    using LL = long long;
    const static int N = 33, MOD = 1e9 + 7;
    
    int n, A[N][N][N];
    int t[N], g[N];
    
    void mul(int c[N][N], int a[N][N], int b[N][N]){
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < n; j ++ ){
                c[i][j] = 0;
                for (int k = 0; k < n; k ++ )
                    c[i][j] = (c[i][j] + 1ll * a[i][k] * b[k][j]) % MOD;
            }
    }
    
    void mul2(int c[N], int a[N], int b[N][N]){
        for (int i = 0; i < n; i ++ ) c[i] = 0;
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < n; j++)
                c[j] = (c[j] + 1ll * a[i] * b[i][j]) % MOD;
    }
    
    int electricityExperiment(int row, int col, vector<vector<int>>& p) {
        // Step 1: sorting
        this->n = row;
        sort(p.begin(), p.end(), [](vector<int> & a, vector<int> & b){
            return a[1] < b[1];
        });
        
        // Step 2: return 0 if impossible
        int len = p.size();
        for (int i = 1; i < len; i ++ )
            if (p[i][1] == p[i-1][1])
                return 0;
        
        // Step 3.1: init A[0]
        for (int i = 0; i < n; i ++ )
            for (int j = -1; j <= 1; j ++ )
                if (i + j >= 0 && i + j < n)
                    A[0][i + j][i] = 1;
        // Step 3.2: calc the A
        for (int k = 1; k <= 30; k ++ )
            mul(A[k], A[k - 1], A[k - 1]);
        
        // Step 4: calc the result
        int res = 1;
        for (int i = 1; i < len; i ++ ){
            memset(t, 0, sizeof t);
            t[p[i - 1][0]] = 1;
            int d = p[i][1] - p[i - 1][1];
            for (int k = 0; (1 << k) <= d; k ++ )
                if ((d >> k) & 1) {
                    mul2(g, t, A[k]);
                    memcpy(t, g, sizeof(g));
                }
            res = 1ll * res * t[p[i][0]] % MOD;
        }
        return res;
    }
};
```
