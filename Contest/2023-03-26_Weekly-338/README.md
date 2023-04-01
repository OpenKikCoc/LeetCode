## [比赛链接](https://leetcode.cn/contest/weekly-contest-338/)


### [2600. K 件物品的最大和](https://leetcode.cn/problems/k-items-with-the-maximum-sum/)



```c++
class Solution {
public:
    int kItemsWithMaximumSum(int numOnes, int numZeros, int numNegOnes, int k) {
        int res = 0;
        while (numOnes && k)
            k -- , numOnes -- , res ++ ;
        while (numZeros && k)
            k -- , numZeros -- ;
        while (numNegOnes && k)
            k -- , numNegOnes -- , res -- ;
        return res;
    }
};
```


### [2601. 质数减法运算](https://leetcode.cn/problems/prime-subtraction-operation/)



```c++
class Solution {
public:
    const static int N = 1010;
    
    int primes[N], cnt;
    bool st[N];
    void init() {
        memset(st, 0, sizeof st);
        cnt = 0;
        for (int i = 2; i < N; ++ i ) {
            if (!st[i])
                primes[cnt ++ ] = i;
            for (int j = 0; primes[j] <= (N - 1) / i; ++ j ) {
                st[primes[j] * i] = true;
                if (i % primes[j] == 0)
                    break;
            }
        }
    }
    
    bool primeSubOperation(vector<int>& nums) {
        init();
        
        int n = nums.size();
        for (int i = 0, last = 0; i < n; ++ i ) {
            int x = nums[i];
            
            int l = 0, r = cnt;
            while (l < r) {
                int m = l + r >> 1;
                // ATTENTION 找到最大的 m 使得 x-primes[m] > last
                //          => 找到第一个使得 x-primes[m] <= last 的值
                if (x - primes[m] <= last)
                    r = m;
                else
                    l = m + 1;
            }
            if (l == 0) {
                // do nothing
            } else {
                x -= primes[l - 1];
                nums[i] = x;
            }
            // last 更新要放在这里
            last = x;
        }
        
        for (int i = 1; i < n; ++ i )
            if (nums[i] <= nums[i - 1])
                return false;
        return true;
    }
};
```

### [2602. 使数组元素全部相等的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-make-all-array-elements-equal/)



```c++
class Solution {
public:
    // 显然无法接受每次查询都扫描一遍 nums，考虑离线操作
    //      => 将原数组与查询数组都按照升序排列 扫描过程中维护代价
    // 为了方便双指针维护 需要把两个数组的值放在一起离散化
    //
    // ==> 其实可以直接利用【前缀和】 这样的实现非常简单 【思维要想的到】
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL s[N];
    
    vector<long long> minOperations(vector<int>& nums, vector<int>& queries) {
        int n = nums.size(), m = queries.size();
        
        sort(nums.begin(), nums.end());
        s[0] = 0;
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + nums[i - 1];
        
        vector<LL> res;
        for (int i = 0; i < m; ++ i ) {
            int x = queries[i];
            
            // 找到第一个大于等于 x 的位置
            int l = 1, r = n;
            while (l < r) {
                int m = l + (r - l) / 2;
                if (nums[m - 1] < x)
                    l = m + 1;
                else
                    r = m;
            }
            
            int less_cnt = l - 1;
            if (l == n && nums[l - 1] < x)
                less_cnt = l;
            
            // left + right
            LL t = ((LL)x * less_cnt - s[less_cnt]) + (s[n] - s[less_cnt] - (LL)x * (n - less_cnt));
            res.push_back(t);
        }
        return res;
    }
};
```

### [2603. 收集树中金币](https://leetcode.cn/problems/collect-coins-in-a-tree/) [TAG]

TODO more details

```c++
class Solution {
public:
    // 【可以选择从任意一个节点出发】
    // 对题意做等价转换：
    //      - 收集所有的金币：一颗最小子树 访问子树可以在扩展两个节点距离的情况下收集所有金币
    //      - 需要返回原点：子树的最长路走一次 其他路径都要走两次
    // 考虑枚举树根 则容易得到对应的子树【】 也就能得到相应的开销
    // ATTENTION 距离为 2 意味着可以在每一个点向下暴力枚举 => ?
    const static int N = 3e4 + 10, M = 6e4 + 10;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    vector<int> cs;
    int n;
    
    // ATTENTION 难点在于想到状态定义：【定义距离恰好为1的情况的路程】
    int f[N], f1[N], f2[N];     // 以 i 为根的子树，收集 [所有金币/距离恰好为1的金币/距离2或以上的金币] 的路程
    int g[N], g1[N], g2[N];     // 向上的路程
    
    void dfs_d(int u, int pa) {
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            
            dfs_d(j, u);
            
            // j 需要走过去再回来
            f[u] += f[j] + (f2[j] > 0 ? 2 : 0);
            
            // 距离恰好为 1 的情况下统计
            f1[u] += cs[j];
            
            // 2 个或者以上的情况下统计
            f2[u] += f1[j] + f2[j];
        }
    }
    
    void dfs_u(int u, int pa) {
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            
            // 以 j 为根向上:
            //          上面的部分                +      兄弟节点的部分
            g[j] = (g[u] + (g2[u] > 0 ? 2 : 0)) + (f[u] - f[j] - (f2[j] > 0 ? 2 : 0));
            
            // 距离恰好为 1 的情况下:
            //          上面的部分            +   兄弟节点的部分?
            g1[j] = (pa != -1 ? cs[pa] : 0) + (f1[u] - cs[j]);
            
            // 距离大于等于 2 的情况下
            //          上面的部分  + 其他兄弟节点?
            g2[j] = g1[u] + g2[u] + (f2[u] - (f1[j] + f2[j]));
            
            dfs_u(j, u);
        }
    }
    
    int collectTheCoins(vector<int>& coins, vector<vector<int>>& edges) {
        this->cs = coins;
        this->n = cs.size();
        
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        // cleanup
        memset(f, 0, sizeof f);
        memset(g, 0, sizeof g);
        
        dfs_d(0, -1);
        dfs_u(0, -1);

        int res = 2e9;
        for (int i = 0; i < n; ++ i )
            res = min(res, f[i] + g[i] + (g2[i] > 0 ? g[i] + 2 : 0));
        return res;
    }
};
```
