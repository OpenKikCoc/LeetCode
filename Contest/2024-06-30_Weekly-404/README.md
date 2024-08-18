## [比赛链接](https://leetcode.cn/contest/weekly-contest-404/)

>   virtual rank: 346 / 3486
>
>   19  1:57:10  0:02:32  0:10:57  0:45:56 4  1:27:10 2


### [3200. 三角形的最大高度](https://leetcode.cn/problems/maximum-height-of-a-triangle/)



```c++
class Solution {
public:
    int maxHeightOfTriangle(int red, int blue) {
        for (int h = 1, a = 0, b = 0; ; ++ h ) {
            if (h & 1)
                a += h;
            else
                b += h;
            
            if (a <= red && b <= blue || a <= blue && b <= red)
                continue;
            return h - 1;
        }
        return -1;
    }
};
```


### [3201. 找出有效子序列的最大长度 I](https://leetcode.cn/problems/find-the-maximum-length-of-valid-subsequence-i/)



```c++
class Solution {
public:
    // 相邻两个的和的奇偶性相同
    // => 要么都是 奇/偶 要么挨个变换
    
    const static int N = 2e5 + 10;
    
    int f[N][4];
    
    int maximumLength(vector<int>& nums) {
        memset(f, 0, sizeof f);
        
        int n = nums.size();
        for (int i = 1; i <= n; ++ i ) {
            int x = nums[i - 1];
            
            if (x & 1) {
                f[i][0] = f[i - 1][0];
                f[i][1] = f[i - 1][1] + 1;
                f[i][2] = f[i - 1][2];
                f[i][3] = f[i - 1][2] + 1;
            } else {
                f[i][0] = f[i - 1][0] + 1;
                f[i][1] = f[i - 1][1];
                f[i][2] = f[i - 1][3] + 1;
                f[i][3] = f[i - 1][3];
            }
        }
        
        return max({f[n][0], f[n][1], f[n][2], f[n][3]});
    }
};
```

### [3202. 找出有效子序列的最大长度 II](https://leetcode.cn/problems/find-the-maximum-length-of-valid-subsequence-ii/)

最初代码

```c++
// 1. all is same
// 2. x, y, x, y, x, y, ... 
const static int N = 1010;

int f[N][N + N];
// 考虑前i个数 与前面的差值为j 的最长长度
// f[i][mod][j] = f[i-1][mod][j] + 1;
// f[i][mod][t] = f[i-1][last][-t] + 1;          last+t=mod => last=mod-t

class Solution {
public:
    
    int maximumLength(vector<int>& nums, int k) {
        memset(f, 0, sizeof f);
        int n = nums.size();
        
        static int g[N + N];
        for (int i = 1; i <= n; ++ i ) {
            int x = nums[i - 1] % k;
            
            for (int j = -k; j <= k; ++ j ) {
                int last = (x - j + k) % k;
                g[j + N] = f[last][-j + N] + 1;
            }
            for (int j = -k; j <= k; ++ j )
                f[x][j + N] = max(f[x][j + N], g[j + N]);
        }
        int res = 0;
        for (int x = 0; x < k; ++ x )
            for (int j = -k; j <= k; ++ j )
                res = max(res, f[x][j + N]);
        return res;
    }
};
```

状态定义简化转移计算

```c++
// 1. all is same
// 2. x, y, x, y, x, y, ... 
const static int N = 1010;

int f[N][N];
// 本质上 可以记录最后两项模k分别为x,y的子序列
// f[y][x] = f[x][y] + 1 (x=nums[i]%k)      => trick

class Solution {
public:
    int maximumLength(vector<int>& nums, int k) {
        memset(f, 0, sizeof f);
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            int x = nums[i] % k;
            for (int y = 0; y < k; ++ y )
                f[y][x] = f[x][y] + 1;  // 思考 递推顺序 为什么不会有问题
        }
        int res = 0;
        for (int x = 0; x < k; ++ x )
            for (int y = 0; y < k; ++ y )
                res = max(res, f[x][y]);
        return res;
    }
};
```

### [3203. 合并两棵树后的最小直径](https://leetcode.cn/problems/find-minimum-diameter-after-merging-two-trees/) [TAG]

经典结论：两棵树合并后，新直径的两个端点，一定是原来两棵树直径的四个端点里的其中两个

=> $max({(d1 + 1) / 2 + (d2 + 1) / 2 + 1, d1, d2})$

```c++
class Solution {
public:
    // ATTENTION: connect one node from the first tree with another node from the second tree [with an edge].
    const static int N = 1e5 + 10, M = 4e5 + 10, INF = 0x3f3f3f3f;
    
    int h1[N], h2[N], e[M], ne[M], idx;
    void init() {
        memset(h1, -1, sizeof h1), memset(h2, -1, sizeof h2);
        idx = 0;
    }
    void add(int h[], int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int ret;
    int d1[N], d2[N];
    
    void dfs(int h[], int u, int pa) {
        d1[u] = d2[u] = 1;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            dfs(h, j, u);
            if (d1[j] + 1 >= d1[u])
                d2[u] = d1[u], d1[u] = d1[j] + 1;
            else if (d1[j] + 1 > d2[u])
                d2[u] = d1[j] + 1;
        }
        ret = max(ret, d1[u] + d2[u] - 1);
    }
    
    int calc(int h[], int n) {
        this->ret = 0;
        memset(d1, 0, sizeof d1), memset(d2, 0, sizeof d2);
        dfs(h, 0, -1);
        return ret - 1; // 减一求的边的长度而非点的数量
    }
    
    int minimumDiameterAfterMerge(vector<vector<int>>& edges1, vector<vector<int>>& edges2) {
        init();
        
        for (auto & e : edges1) {
            int a = e[0], b = e[1];
            add(h1, a, b), add(h1, b, a);
        }
        for (auto & e : edges2) {
            int a = e[0], b = e[1];
            add(h2, a, b), add(h2, b, a);
        }
        
        int d1 = calc(h1, edges1.size() + 1), d2 = calc(h2, edges2.size() + 1);
        
        // ATTENTION
        // 直接返回 d1+d2+1 是错误的，因为可能比原来tr1的直径还小，所以需要推导
        // =>   如果新直径不经过合并边，那么它就是原来两个直径中的较大值
        //      如果新直径经过合并边，考虑合并边的某个端点 u 以及原来这棵树直径的两个端点 [x, y]
        //          要最小化 [u, x] 与 [u, y] 显然需要在直径中点 及 (d + 1) / 2
        return max({(d1 + 1) / 2 + (d2 + 1) / 2 + 1/*额外增加的一条边*/, d1, d2});
    }
};
```
