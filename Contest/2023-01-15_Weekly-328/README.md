## [比赛链接](https://leetcode.cn/contest/weekly-contest-328)

> rank: 76 / 4776

### [6291. 数组元素和与数字和的绝对差](https://leetcode.cn/problems/difference-between-element-sum-and-digit-sum-of-an-array/)



```c++
class Solution {
public:
    int get(int x) {
        int ret = 0;
        string s = to_string(x);
        for (auto c : s)
            ret += c - '0';
        return ret;
    }
    
    int differenceOfSum(vector<int>& nums) {
        int a = 0, b = 0;
        for (auto x : nums) {
            a += x;
            b += get(x);
        }
        return abs(a - b);
    }
};
```

```python
class Solution:
    def differenceOfSum(self, nums: List[int]) -> int:
        sumA = sum(nums)
        sumB = 0
        for x in nums:
            while x:
                sumB += x % 10
                x //= 10
        return sumA - sumB if sumA - sumB > 0 else sumB - sumA
```

### [6292. 子矩阵元素加 1](https://leetcode.cn/problems/increment-submatrices-by-one/)

标准二维差分

```c++
class Solution {
public:
    const static int N = 510;
    
    int c[N][N];
    
    vector<vector<int>> rangeAddQueries(int n, vector<vector<int>>& queries) {
        memset(c, 0, sizeof c);
        for (auto & q : queries) {
            int u = q[0], l = q[1], d = q[2], r = q[3];
            // cout << " u " << u << " l " << l << " d " << d << " r " << r << endl;
            c[u][l] ++ , c[u][r + 1] -- , c[d + 1][l] -- , c[d + 1][r + 1] ++ ;
        }
        
        
        
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < n; ++ j ) {
                if (i)
                    c[i][j] += c[i - 1][j];
                if (j)
                    c[i][j] += c[i][j - 1];
                if (i && j)
                    c[i][j] -= c[i - 1][j - 1];
            }
        
        vector<vector<int>> res(n, vector<int>(n));
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < n; ++ j )
                res[i][j] = c[i][j];
        return res;
    }
};
```

```python
class Solution:
    def rangeAddQueries(self, n: int, queries: List[List[int]]) -> List[List[int]]:
        g = [[0] * (n + 1) for _ in range(n + 1)]
        for q in queries:
            u, l, d, r = q[0], q[1], q[2], q[3]
            g[u][l] += 1
            g[u][r + 1] -= 1
            g[d + 1][l] -= 1
            g[d + 1][r + 1] += 1
            
        for i in range(n):
            for j in range(n):
                if i > 0:
                    g[i][j] += g[i - 1][j]
                if j > 0:
                    g[i][j] += g[i][j - 1]
                if i > 0 and j > 0:
                    g[i][j] -= g[i - 1][j - 1]
        
        res = [[0] * (n) for _ in range(n)]
        for i in range(n):
            for j in range(n):
                res[i][j] = g[i][j]
        return res
```

### [6293. 统计好子数组的数目](https://leetcode.cn/problems/count-the-number-of-good-subarrays/)

标准滑动窗口

```c++
class Solution {
public:
    // 对于每一个固定的右端点 r，左端点一定是最左侧开始的连续区间
    // 随着右端点右移，左端点相应的右移
    // 可以维护一个【第一个不满足的左端点】的位置 中间的所有的都不够 k 对
    
    using LL = long long;
    
    LL tot = 0;
    unordered_map<int, int> hash;
    
    void add(int x) {
        int has = hash[x];
        tot += has;
        hash[x] ++ ;
    }
    void sub(int x) {
        hash[x] -- ;
        int has = hash[x];
        tot -= has;
    }
    
    long long countGood(vector<int>& nums, int k) {
        LL res = 0;
        int n = nums.size();
        for (int r = 0, l = 0; r < n; ++ r ) {
            add(nums[r]);
            while (l < r && tot >= k)
                sub(nums[l ++ ]);
            if (tot < k)
                res += l;
        }
        
        return res;
    }
};
```

```python
class Solution:
    def countGood(self, nums: List[int], k: int) -> int:
        self.sumn = 0
        myHash = collections.defaultdict(int)
        
        def add(x):
            num = myHash[x]
            self.sumn  += num
            myHash[x] += 1
            
        def remove(x):
            myHash[x] -= 1
            num = myHash[x]
            self.sumn  -= num
        
        res = 0
        n = len(nums)
        l = 0
        for r in range(0, n):
            add(nums[r])
            while l < r and self.sumn  >= k:
                remove(nums[l])
                l += 1
            if self.sumn  < k:
                res += l
        return res
```

### [6294. 最大价值和与最小价值和的差值](https://leetcode.cn/problems/difference-between-maximum-and-minimum-price-sum/)

标准换根 dp

```c++
class Solution {
public:
    // 求 每一个点为根时的 最大路径与最小路径
    // 因为价值都是正数 显然最小路径就是根节点本身 求最大路径要 dp
    using LL = long long;
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    vector<int> p;
    LL d1[N], d2[N], up[N];
    int p1[N];
    
    void dfs_d(int u, int fa) {
        d1[u] = d2[u] = 0;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            dfs_d(j, u);
            int v = d1[j];
            if (v > d1[u]) {
                d2[u] = d1[u], d1[u] = v;
                p1[u] = j;
            } else if (v > d2[u])
                d2[u] = v;
        }
        
        d1[u] += p[u], d2[u] += p[u];
    }
    void dfs_u(int u, int fa) {
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            
            if (p1[u] == j)
                up[j] = max(up[u], d2[u]) + p[j];
            else
                up[j] = max(up[u], d1[u]) + p[j];
            
            dfs_u(j, u);
        }
    }
    
    long long maxOutput(int n, vector<vector<int>>& edges, vector<int>& price) {
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        this->p = price;
        memset(p1, -1, sizeof p1);
        
        dfs_d(0, -1);
        dfs_u(0, -1);
        
        LL res = 0;
        for (int i = 0; i < n; ++ i )
            res = max(res, max(d1[i], up[i]) - p[i]);
        
        return res;
    }
};
```

```python

```