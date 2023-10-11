## [比赛链接](https://leetcode.cn/contest/biweekly-contest-114/)

>   virtual rank: 109 / 2406
>   0:35:20 0:03:54 0:07:25  1 0:15:51 0:30:20


### [2869. 收集元素的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-collect-elements/)



```c++
class Solution {
public:
    const static int N = 55;
    
    bool st[N];
    
    int minOperations(vector<int>& nums, int k) {
        memset(st, 0, sizeof st);
        int n = nums.size();
        for (int i = n - 1, j = 0; i >= 0; -- i ) {
            int x = nums[i];
            if (x <= k && !st[x]) {
                st[x] = true;
                j ++ ;
            }
            if (j == k)
                return n - i;
        }
        return n;
    }
};
```


### [2870. 使数组为空的最少操作次数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-array-empty/)



```c++
class Solution {
public:
    int minOperations(vector<int>& nums) {
        unordered_map<int, int> h;
        for (auto x : nums)
            h[x] ++ ;
        
        int res = 0;
        for (auto & [k, v] : h) {
            if (v == 1)
                return -1;
            
            int t = v % 3;
            if (t == 0) {
                res += v / 3;
            } else if (t == 1) {
                res += v / 3 + 1;
            } else if (t == 2) {
                res += v / 3 + 1;
            }
        }
        return res;
    }
};
```

### [2871. 将数组分割成最多数目的子数组](https://leetcode.cn/problems/split-array-into-maximum-number-of-subarrays/)



```c++
class Solution {
public:
    // 思考: 和最小的情况显然是把所有元素都 & 起来
    //   要使得子树组数量最多 则
    //      - 如果所有元素&为0 则拆分多个0的段即可 => 贪心即可
    //      - 如果所有元素&不为0 则只能有一段
    int maxSubarrays(vector<int>& nums) {
        int n = nums.size(), st = nums[0];
        for (int i = 1; i < n; ++ i )
            st &= nums[i];
        if (st)
            return 1;
        
        int res = 0;
        st = -1;
        for (int i = 0; i < n; ++ i ) {
            if (st == -1)
                st = nums[i];
            else
                st &= nums[i];
            
            if (!st) {
                // cout << " i = " << i << " res before = " << res << endl;
                st = -1;  // ATTENTION 重置
                res ++ ;
            }
        }
        return res;
    }
};
```

### [2872. 可以被 K 整除连通块的最大数目](https://leetcode.cn/problems/maximum-number-of-k-divisible-components/)

经典树形DP

```c++
class Solution {
public:
    // 思考: 如果某个边可以割，那割完之后的左右两侧一定需要上k整数倍，这样两侧才能独自一体或继续被割
    //   题目保证values之和可以被k整除 则一定有解
    // 1. dfs 求以某个节点为根的联通块数量及模数 返回根节点的数据即可
    // 2. 问题在于 不同的根结果是否不同？ ==> 结论是不会 【重点是证明】
    
    const static int N = 3e4 + 10, M = 6e4 + 10;
    
    // ---------------------- graph ----------------------
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    // ---------------------- dfs ----------------------
    int f[N], g[N]; // 数量 模数
    
    void dfs(int u, int fa) {
        f[u] = 0, g[u] = vs[u] % k;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            dfs(j, u);
            f[u] += f[j], g[u] = (g[u] + g[j]) % k;
        }
        if (!g[u])
            f[u] ++ ;
    }
    
    int n, k;
    vector<int> vs;
    
    int maxKDivisibleComponents(int n, vector<vector<int>>& edges, vector<int>& values, int k) {
        init();
        this->n = n, this->k = k, this->vs = values;
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            add(a, b), add(b, a);
        }
        
        dfs(0, -1);
        
        return f[0];
    }
};
```
