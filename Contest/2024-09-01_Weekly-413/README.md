## [比赛链接](https://leetcode.cn/contest/weekly-contest-413/)


### [3274. 检查棋盘方格颜色是否相同](https://leetcode.cn/problems/check-if-two-chessboard-squares-have-the-same-color/)



```c++
class Solution {
public:
    bool get(string & s) {
        int a = s[0] - 'a' + 1, b = s[1] - '0';
        return (a + b) & 1;
    }
    
    bool checkTwoChessboards(string coordinate1, string coordinate2) {
        return get(coordinate1) == get(coordinate2);
    }
};
```


### [3275. 第 K 近障碍物查询](https://leetcode.cn/problems/k-th-nearest-obstacle-queries/)

最初想法 bit维护 实际上没有必要

```c++
class Solution {
public:
    const static int N = 2e5 + 10;
    
    int tr[N];
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int y) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += y;
    }
    int sum(int x) {
        int ret = 0;
        for (int i = x; i > 0; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    vector<int> xs;
    int get(int x) {
        return lower_bound(xs.begin(), xs.end(), x) - xs.begin() + 1;
    }
    
    void init() {
        memset(tr, 0, sizeof tr);
        xs.clear();
    }
    
    vector<int> resultsArray(vector<vector<int>>& queries, int k) {
        init();
        
        for (auto & q : queries) {
            int x = q[0], y = q[1];
            xs.push_back(abs(x) + abs(y));
        }
        sort(xs.begin(), xs.end());
        xs.erase(unique(xs.begin(), xs.end()), xs.end());
        
        int n = queries.size();
        vector<int> res;
        for (auto & q : queries) {
            int x = q[0], y = q[1];
            auto idx = get(abs(x) + abs(y));
            add(idx, 1);
            
            int l = 1, r = N;
            while (l < r) {
                int m = l + (r - l) / 2;
                if (sum(m) < k)
                    l = m + 1;
                else
                    r = m;
            }
            res.push_back(l == N ? -1 : xs[l - 1]);
        }
        return res;
    }
};
```

直接大根堆即可

```c++
class Solution {
public:
    vector<int> resultsArray(vector<vector<int>>& queries, int k) {
        priority_queue<int> heap;  // 大根堆
        vector<int> res;
        for (auto & q : queries) {
            int x = q[0], y = q[1];
            int d = abs(x) + abs(y);
            heap.push(d);
            while (heap.size() > k)
                heap.pop();
            
            res.push_back(heap.size() == k ? heap.top() : -1);
        }
        return res;
    }
};
```

### [3276. 选择矩阵中单元格的最大得分](https://leetcode.cn/problems/select-cells-in-grid-with-maximum-score/) [TAG]

重点在于思路拆解

分析题意

-   选取元素不同行
-   选取元素值不同

显然可以按值统计 对行状压

```c++
class Solution {
public:
    // 显然无法贪心 考虑暴搜或DP
    //
    // DP 无非两种
    // 1. 考虑到第i行 已经选了哪些元素 复杂度 O(n 2^(nm) nm)
    // 2. 考虑到第i个元素 已经用了哪些行 O(nm 2^n n)          => choosed
    //
    // [行数和值都不能重复，行数的大小明显小于值，所以对行数进行状态压缩，统计每个值所在的行]
    
    const static int N = 110, M = (1 << 10) + 1;
    
    int f[N][M];    // 考虑前i个数字 目前选取行数的状压表示为j的情况下 的最大值
    
    int maxScore(vector<vector<int>>& grid) {
        // 1. 将行状压 记录每个数字所在的行(可能多个行)
        unordered_map<int, int> pos;
        int n = grid.size();
        for (int i = 0; i < n; ++ i )
            for (int x : grid[i])
                pos[x] |= 1 << i;
        
        vector<int> all_nums;
        for (auto & [k, _] : pos)
            all_nums.push_back(k);
        
        int m = all_nums.size();
        int cap = 1 << n;
        
        memset(f, 0, sizeof f);
        
        for (int i = 1; i <= m; ++ i ) {
            int x = all_nums[i - 1];    // 当前数字为 x
            for (int j = 0; j < cap; ++ j ) {
                // 不选x
                f[i][j] = f[i - 1][j];
                // 选x 则之前的行不能冲突 (因为已经按数值做了聚合 可以保证数字一定不重复)
                for (int k = 0; k < n; ++ k )
                    if ((pos[x] >> k & 1) && (j >> k & 1) == 0)
                        f[i][j] = max(f[i][j], f[i - 1][j ^ (1 << k)] + x);
            }
        }
        
        int res = 0;
        for (int j = 0; j < cap; ++ j )
            res = max(res, f[m][j]);
        return res;
    }
};
```

### [3277. 查询子数组最大异或值](https://leetcode.cn/problems/maximum-xor-score-subarray-queries/) [TAG]

分析拆解过程

```c++
class Solution {
public:
    // [a,b,c]      -> [ab,bc]      -> [ab^2c]
    // [a,b,c,d]    -> [ab,bc,cd]   -> [ab^2c,bc^2d]    -> [ab^3c^3d] = [abc,bcd]
    //    =>
    // 假设 f[i][j] 表示下标 [i,j] 的子数组的 数组异或值 则有
    //      f[i][j] = f[i][j - 1] ^ f[i + 1][j]
    //
    // 设 [i,j] 之间所有子数组的 f 的最大值为 g[i][j] 则有
    //      g[i][j] = max(f[i][j], g[i][j - 1], g[i + 1][j])
    // 查询时直接访问 g 数组即可
    //
    // => 区间DP套区间DP
    
    const static int N = 2010;
    
    int f[N][N], g[N][N];
    
    void init() {
        memset(f, 0, sizeof f);
        memset(g, 0, sizeof g);
    }
    
    vector<int> maximumSubarrayXor(vector<int>& nums, vector<vector<int>>& queries) {
        int n = nums.size();
        init();
        
        for (int i = 1; i <= n; ++ i )
            f[i][i] = nums[i - 1];  // 初始化
        for (int w = 2; w <= n; ++ w )
            for (int l = 1; l + w - 1 <= n; ++ l ) {
                int r = l + w - 1;
                f[l][r] = f[l][r - 1] ^ f[l + 1][r];
            }
        
        for (int i = 1; i <= n; ++ i )
            g[i][i] = nums[i - 1];
        for (int w = 2; w <= n; ++ w )
            for (int l = 1; l + w - 1 <= n; ++ l ) {
                int r = l + w - 1;
                g[l][r] = max(f[l][r], max(g[l][r - 1], g[l + 1][r]));
            }
        
        vector<int> res;
        for (auto & q : queries) {
            int l = q[0], r = q[1];
            res.push_back(g[l + 1][r + 1]);
        }
        return res;
    }
};
```
