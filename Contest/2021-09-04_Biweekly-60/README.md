## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-60/)


### [1991. 找到数组的中间位置](https://leetcode-cn.com/problems/find-the-middle-index-in-array/)

求和统计即可

```c++
class Solution {
public:
    int findMiddleIndex(vector<int>& nums) {
        int n = nums.size();
        vector<int> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + nums[i - 1];
        for (int i = 1; i <= n; ++ i )
            if (s[i - 1] == s[n] - s[i])
                return i - 1;
        return -1;
    }
};
```


### [1992. 找到所有的农场组](https://leetcode-cn.com/problems/find-all-groups-of-farmland/)

易知每个农场都是不相交的矩形，显然可以 dfs

```c++
// 可以直接修改原数组 从而删除st数组 实现略
class Solution {
public:
    vector<vector<int>> g;
    vector<vector<bool>> st;
    int n, m;
    int mx, my;
    
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    void dfs(int x, int y) {
        st[x][y] = true;
        mx = max(mx, x), my = max(my, y);
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && g[nx][ny] && !st[nx][ny])
                dfs(nx, ny);
        }
    }
    
    vector<vector<int>> findFarmland(vector<vector<int>>& land) {
        this->g = land;
        this->n = land.size(), this->m = land[0].size();
        this->st = vector<vector<bool>>(n, vector<bool>(m));
        
        vector<vector<int>> res;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j] && !st[i][j]) {
                    mx = 0, my = 0;
                    dfs(i, j);
                    res.push_back({i, j, mx, my});
                }
        return res;
    }
};
```

也可以直接 while 向右向下扫描

```c++
// Heltion
class Solution {
public:
    vector<vector<int>> findFarmland(vector<vector<int>>& land) {
        vector<vector<int>> res;
        for (int i = 0; i < land.size(); i += 1)
            for (int j = 0; j < land[0].size(); j += 1)
                if (land[i][j] == 1 && (j == 0 || land[i][j - 1] == 0) && (i == 0 || land[i - 1][j] == 0)) {
                    int x = i, y = j;
                    while (x + 1 < land.size() and land[x + 1][j] == 1) x += 1;
                    while (y + 1 < land[0].size() and land[i][y + 1] == 1) y += 1;
                    res.push_back({i, j, x, y});
                }
        return res;
    }
};
```



### [1993. 树上的操作](https://leetcode-cn.com/problems/operations-on-tree/)

同时建边及反向边即可

考虑到数据范围 2000，在 `upgrade` 中暴力 dfs 也不会 TLE，略

```c++
class LockingTree {
public:
    const static int N = 2010, M = N << 1;
    
    // Graph
    int n;
    int h[N], hs[N], e[M], ne[M], idx;
    int has[N];
    void init() {
        memset(h, -1, sizeof h);
        memset(hs, -1, sizeof hs);
        idx = 0;
        memset(has, 0, sizeof has);
    }
    void add(int h[], int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    // func
    bool go(int u, int h[]) {
        if (has[u])
            return true;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (go(j, h))
                return true;
        }
        return false;
    }
    void op(int u) {
        has[u] = 0;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            op(j);
        }
    }
    
    // Interface
    
    LockingTree(vector<int>& parent) {
        init();
        this->n = parent.size();
        for (int i = 1; i < n; ++ i )
            add(h, parent[i], i), add(hs, i, parent[i]);
    }
    
    bool lock(int num, int user) {
        if (has[num])
            return false;
        has[num] = user;
        return true;
    }
    
    bool unlock(int num, int user) {
        if (has[num] != user)
            return false;
        has[num] = 0;
        return true;
    }
    
    bool upgrade(int num, int user) {
        if (has[num])
            return false;
        if (!go(num, h) || go(num, hs))
            return false;
        op(num);
        has[num] = user;
        return true;
    }
};

/**
 * Your LockingTree object will be instantiated and called as such:
 * LockingTree* obj = new LockingTree(parent);
 * bool param_1 = obj->lock(num,user);
 * bool param_2 = obj->unlock(num,user);
 * bool param_3 = obj->upgrade(num,user);
 */
```

### [1994. 好子集的数目](https://leetcode-cn.com/problems/the-number-of-good-subsets/) [TAG]

非常好的状态压缩 + 组合计数应用题

按比特位划分是为了**去重**，详情参考第三份代码

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 10;
    const int MOD = 1e9 + 7;
    
    vector<int> ps = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};
    
    int numberOfGoodSubsets(vector<int>& nums) {
        vector<int> cnt(1 << N), sum(1 << N);
        // 1. 求每个数分解得到全素数集合，该全素数集合对应的原始数的个数
        // 本质上是将原始数组中合法的部分重新统计一遍
        for (auto x : nums) {
            int t = 0;
            for (int i = 0; i < N; ++ i )
                if (x % ps[i] == 0) {
                    t |= 1 << i;
                    // ATTENTION: 如果x包含两个p[i]，必然无效
                    if (x / ps[i] % ps[i] == 0) {
                        t = -1;
                        break;
                    }
                }
        
            if (t != -1)
                cnt[t] ++ ;
        }
        
        // 2. 遍历统计
        // 为什么可以遍历到 1 << N ? 因为按照合法性规则，最多包含ps中所有的元素 即2^10
        int res = 0;
        for (int i = 1; i < 1 << N; ++ i ) {
            // 该集合本身作为一个数
            sum[i] = cnt[i];
            // 集合拆分
            // ATTENTION 思考细节：【为什么实现需找第一个存在位来划分】
            // 【目的：去重】如果直接用子集去算会有重合部分
            for (int j = 0; j < N; ++ j )
                if (i >> j & 1) {
                    int k = i ^ (1 << j);
                    // 枚举k的子集（必然包含j的子集）作为第一部分【cnt[(1 << j) | x]】
                    // 其补集作为第二部分【sum[k ^ x]】
                    for (int x = (k - 1) & k; true; x = (x - 1) & k) {
                        sum[i] = (sum[i] + (LL)cnt[(1 << j) | x] * sum[k ^ x]) % MOD;
                        if (x == 0) // 注意 x 可以为空集，即第一部分只包含一个j
                            break;
                    }
                    // ATTENTION 能够根据一位不同去划分为两类即可
                    break;
                }
            // 统计
            res = (res + (LL)sum[i]) % MOD;
        }
        // 1的数量 任意选 2^cnt[0]
        for (int i = 0; i < cnt[0]; ++ i )
            res = (res + (LL)res) % MOD;
        return res;
    }
};
```

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 10;
    const int MOD = 1e9 + 7;
    
    vector<int> ps = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};
    
    int qpow(int a, int b) {
        LL res = 1;
        while (b) {
            if (b & 1)
                res = res * a % MOD;
            a = (LL)a * a % MOD;
            b >>= 1;
        }
        return res;
    }
    
    int numberOfGoodSubsets(vector<int>& nums) {
        vector<int> cnt(1 << N), sum(1 << N);
        // 1. 求每个数分解得到全素数集合，该全素数集合对应的原始数的个数
        // 本质上是将原始数组中合法的部分重新统计一遍
        for (auto x : nums) {
            int t = 0;
            for (int i = 0; i < N; ++ i )
                if (x % ps[i] == 0) {
                    t |= 1 << i;
                    // ATTENTION: 如果x包含两个p[i]，必然无效
                    if (x / ps[i] % ps[i] == 0) {
                        t = -1;
                        break;
                    }
                }
        
            if (t != -1)
                cnt[t] ++ ;
        }
        
        // 2. 遍历统计
        sum[0] = qpow(2, cnt[0]);
        
        for (int i = 1; i < 1 << N; ++ i ) {
            // ATTENTION 1: 只用sum不用nxt也可以过，因为是从小到大计算的
            auto nxt = sum;
            for (int j = 0; j < 1 << N; ++ j )
                if (!(i & j)) {
                    // i 与 j 无交叉
                    nxt[j | i] = (nxt[j | i] + (LL)sum[j] * cnt[i]) % MOD;
                }
            sum = nxt;
        }
        
        // ATTENTION 2: 这样res统计必须放在最后，因为前面for-loop未将当前结果统计完成
        int res = 0;
        for (int i = 1; i < 1 << N; ++ i )
            res = (res + (LL)sum[i]) % MOD;
        
        return res;
    }
};
```

```c++
class Solution {
public:
    // ...
    int numberOfGoodSubsets(vector<int>& nums) {
        vector<int> cnt(1 << N), sum(1 << N);
        for (auto x : nums) {
            // ...
            if (t != -1)
                cnt[t] ++ ;
        }
        
        sum[0] = qpow(2, cnt[0]);
        
        for (int i = 1; i < 1 << N; ++ i ) {
            int f = i & (-i);  // bit划分
            
            for (int j = i; j; j = (j - 1) & i) {
                // 会计算重复
                // DEBUG
                // if (cnt[j] && sum[i ^ j]) {
                //     cout << " i = " << i << " j = " << j << " cnt[j] = " << cnt[j] << " sum[i ^ j] = " << sum[i ^ j] << endl;
                // }
                // 去重
                if (j & f)
                    sum[i] = (sum[i] + (LL)cnt[j] * sum[i ^ j]) % MOD;
            }
            
            // if (sum[i])
            //     cout << " sum[" << i << "] = " << sum[i] << endl;
        }
        
        int res = 0;
        for (int i = 1; i < 1 << N; ++ i )
            res = (res + (LL)sum[i]) % MOD;
        
        return res;
    }
};
```

