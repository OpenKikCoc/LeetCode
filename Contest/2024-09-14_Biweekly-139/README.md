## [比赛链接](https://leetcode.cn/contest/biweekly-contest-139/)

### [3285. 找到稳定山的下标](https://leetcode.cn/problems/find-indices-of-stable-mountains/)



```c++
class Solution {
public:
    vector<int> stableMountains(vector<int>& height, int threshold) {
        int n = height.size();
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            if (i && height[i - 1] > threshold)
                res.push_back(i);
        return res;
    }
};
```

### [3286. 穿越网格图的安全路径](https://leetcode.cn/problems/find-a-safe-walk-through-a-grid/)

经典思路

加快速度

```c++
class Solution {
public:
    // 经典算法 假设最后处在[n-1,m-1]的健康度最小为1 倒推初始位置最少应该多少
    
    using PII = pair<int, int>;
    const static int N = 55;
    
    int n, m;
    vector<vector<int>> g;
    int d[N][N];
    bool st[N][N];
    
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    
    void bfs(int sx, int sy) {
        memset(d, 0x3f, sizeof d);
        memset(st, 0, sizeof st);
        
        priority_queue<PII, vector<PII>, greater<PII>> q;
        d[sx][sy] = 1 + g[sx][sy];    // ATTENTION 如果最后一格有障碍 进去之前最少是2
        q.push({d[sx][sy], sx * m + sy});
        
        while (q.size()) {
            auto [dis, idx] = q.top(); q.pop();
            int x = idx / m, y = idx % m;
            if (st[x][y])
                continue;
            st[x][y] = true;
            
            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                    continue;
                int nd = dis + g[nx][ny];
                if (d[nx][ny] > nd) {
                    d[nx][ny] = nd;
                    q.push({nd, nx * m + ny});
                }
            }
        }
    }
    
    bool findSafeWalk(vector<vector<int>>& grid, int health) {
        this->g = grid;
        this->n = g.size(), this->m = g[0].size();
        
        bfs(n - 1, m - 1);
        
        // cout << "d = " << d[n - 1][m - 1] << " d00 = " << d[0][0] << " h = " << health << endl;
        
        return d[0][0] <= health;
    }
};
```

### [3287. 求出数组中最大序列值](https://leetcode.cn/problems/find-the-maximum-sequence-value-of-array/) [TAG]

标准前后缀分解

结合数据范围 直接暴力枚举

注意状态转移的计算推导逻辑

加快速度

```c++
class Solution {
public:
    // ...[子序列]
    // 题意: 将原数组分成左右两侧, 左侧选k个[或] 右侧选k个[或]
    //      求如何选使得二者[异或]最大
    //
    // 考虑 f[i][j][x] 表示左侧i个数 已经选了j个 凑出状态x是否合法
    //      400*200*(1 << 7) = 80000*64 = 5e6
    //
    // ATTENTION 状态转移实现 (当前往下一个位置计算)
    
    const static int N = 410, M = 1 << 7;
    
    bool l[N][N / 2][M], r[N][N / 2][M];
    
    int maxValue(vector<int>& nums, int k) {
        memset(l, 0, sizeof l), memset(r, 0, sizeof r);
        int n = nums.size();
        
        {
            // 左边
            l[0][0][0] = true;
            // 考虑前i个位置 选了j个 状态为x
            // ATTENTION: 状态推导时 从当前计算下一个更简单 (如果根据前一个计算当前 状态比较难处理)
            for (int i = 0; i < n; ++ i )
                for (int j = 0; j <= k; ++ j )
                    for (int x = 0; x < M; ++ x ) {
                        // 不选当前
                        l[i + 1][j][x] |= l[i][j][x];
                        // 选当前
                        if (j < k)
                            l[i + 1][j + 1][x | nums[i]] |= l[i][j][x];
                    }
        }
        {
            // 右边
            r[n + 1][0][0] = true;
            // 考虑前i个位置 选了j个 状态为x
            for (int i = n + 1; i > 1; -- i )
                for (int j = 0; j <= k; ++ j )
                    for (int x = 0; x < M; ++ x ) {
                        // 不选当前
                        r[i - 1][j][x] |= r[i][j][x];
                        // 选当前
                        if (j < k)
                            r[i - 1][j + 1][x | nums[i - 1 - 1]] |= r[i][j][x];
                    }
        }
        
        int res = 0;
        for (int i = k; i + k <= n; ++ i )  // 枚举分界点
            for (int x = 0; x < M; ++ x )
                for (int y = 0; y < M; ++ y )
                    if (l[i][k][x] && r[i + 1][k][y])
                        res = max(res, x ^ y);
        
        return res;
    }
};
```

### [3288. 最长上升路径的长度](https://leetcode.cn/problems/length-of-the-longest-increasing-path/) [TAG]

1. 分割点思想: 容易想到 显然可以将 `k` 位置作为分界点 分别计算 `k` 之前/之后的 LIS
2. 细节: 求后面部分是需要 reverse value
3. 排序: 初始化排序时 第二维度比较关系需要反转 避免 `x` 相同的干扰

```c++
class Solution {
public:
    // 1. 分割点思想: 容易想到 显然可以将k位置作为分界点 分别计算k之前/之后的LIS
    // 2. 细节: 求后面部分是需要 reverse value
    // 3. 排序: 初始化排序时 第二维度比较关系需要反转 避免x相同的干扰
    using PIII = tuple<int, int, int>;
    
    int get_lis(vector<int> & xs) {
        int last_val = xs.back();
        vector<int> t;
        for (auto x : xs)
            if (t.empty() || t.back() < x)  // 互不相同
                t.push_back(x);
            else
                *lower_bound(t.begin(), t.end(), x) = x;
        
        for (int i = 0; i < t.size(); ++ i )
            if (t[i] == last_val)
                return i + 1;
        return 0;
    }
    
    int maxPathLength(vector<vector<int>>& coordinates, int k) {
        int n = coordinates.size();
        vector<PIII> xs;
        for (int i = 0; i < n; ++ i )
            xs.push_back({coordinates[i][0], coordinates[i][1], i});
        sort(xs.begin(), xs.end(), [](const PIII & a, const PIII & b) {
            if (get<0>(a) != get<0>(b))
                return get<0>(a) < get<0>(b);
            return get<1>(a) > get<1>(b);   // ATTENTION 避免x相同、y不同的情况下，后续逻辑发生干扰
        });
        // 现在x天然有序 y待排序
        int p = -1;
        for (int i = 0; i < n; ++ i )
            if (get<2>(xs[i]) == k)
                p = i;
        
        int res = 0;
        {
            // 从左往右
            vector<int> t;
            for (int i = 0; i <= p; ++ i )
                t.push_back(get<1>(xs[i]));
            res += get_lis(t);
        }
        {
            vector<int> t;
            for (int i = n - 1; i >= p; -- i )
                t.push_back(-get<1>(xs[i]));    // ATTENTION reverse value
            res += get_lis(t);
        }
        
        return res - 1;
    }
};
```
