## [比赛链接](https://leetcode.cn/contest/weekly-contest-364/)


### [2864. 最大二进制奇数](https://leetcode.cn/problems/maximum-odd-binary-number/)



```c++
class Solution {
public:
    string maximumOddBinaryNumber(string s) {
        int n = s.size(), t = 0;
        for (auto x : s)
            if (x == '1')
                t ++ ;
        t -- ;
        
        s[n - 1] = '1';
        for (int i = 0; i < n - 1; ++ i )
            if (i < t)
                s[i] = '1';
            else
                s[i] = '0';
        return s;
    }
};
```


### [2865. 美丽塔 I](https://leetcode.cn/problems/beautiful-towers-i/)

同 3 数据范围更小

### [2866. 美丽塔 II](https://leetcode.cn/problems/beautiful-towers-ii/)

经典前后缀分解

```c++
class Solution {
public:
    // 考虑枚举中心位置
    // 则 对于一个具体的中心位置 i 其高度必然为 maxHeight[i]
    //   左右延展时必须小于等于当前值 且小于等于历史最小值 => 显然不能暴力计算
    // 考虑前后缀分解 => 这样答案很好求
    // 问题在于前后缀求解什么
    //      => l: 类似 LIS 的总和, 当高度增加时很好处理 高度减少时需要回退 => 单调栈
    
    using LL = long long;
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    LL l[N], r[N];
    
    long long maximumSumOfHeights(vector<int>& maxHeights) {
        int n = maxHeights.size();
        memset(l, 0, sizeof l), memset(r, 0, sizeof r);
        {
            stack<PII> st;  // [height, cnt]
            LL sum = 0;
            for (int i = 1; i <= n; ++ i ) {
                int x = maxHeights[i - 1];
                sum += x;
                
                PII t = {x, 1};
                while (st.size()) {
                    auto [height, cnt] = st.top();
                    if (height < t.first)
                        break;
                    st.pop();
                    
                    int diff = height - x;
                    sum -= (LL)diff * cnt;
                    t.second += cnt;
                }
                st.push(t);
                l[i] = sum;
            }
        }
        {
            stack<PII> st;
            LL sum = 0;
            for (int i = n; i >= 1; -- i ) {
                int x = maxHeights[i - 1];
                sum += x;
                
                PII t = {x, 1};
                while (st.size()) {
                    auto [height, cnt] = st.top();
                    if (height < t.first)
                        break;
                    st.pop();
                    
                    int diff = height - x;
                    sum -= (LL)diff * cnt;
                    t.second += cnt;
                }
                st.push(t);
                r[i] = sum;
            }
        }
        LL res = 0;
        for (int i = 1; i <= n; ++ i )
            res = max(res, l[i] + r[i + 1]);
        return res;
    }
};
```

### [2867. 统计树中的合法路径数目](https://leetcode.cn/problems/count-valid-paths-in-a-tree/) [TAG]

树形 DP 边遍历边计算

```c++
class Solution {
public:
    // 初看似乎是 lca 应用, 麻烦的点在于复杂度无法接受枚举两个端点
    // 转换思路 & 反向思考: 假设某个点的编号是质数[数据范围不超过1e4个质数]，那么恰好经过当前点有多少条可行的路径？
    //  =>  dfs 遍历显然可以解 问题在于如何减少重复的双向遍历? => [标记已经被遍历过的点即可]
    //      ====> 【加强此类"边遍历边计算"的敏感度】
    using LL = long long;
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    // -------------------- graph --------------------
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    // -------------------- primes --------------------
    int ps[N], tot;
    bool st[N];
    void get_primes() {
        memset(st, 0, sizeof st);
        // ATTENTION set 1 因为 1 会被用到
        st[1] = true;
        tot = 0;
        for (int i = 2; i < N; ++ i ) {
            if (!st[i])
                ps[tot ++ ] = i;
            for (int j = 0; ps[j] <= (N - 1) / i; ++ j ) {
                st[ps[j] * i] = true;
                if (i % ps[j] == 0)
                    break;
            }
        }
    }
    
    // -------------------- dfs --------------------
    LL res;
    int f[N][2];    // 以 i 为最高点，向子树延伸，分别包含 0/1 个质数节点的方案数
    
    void dfs(int u, int fa) {
        f[u][!st[u]] = 1;    // st[u] = false 是质数
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            dfs(j, u);

            // ATTENTION 边遍历边累加 [此时 f[u] 是此前子树的状态和]
            res += (LL)f[j][0] * f[u][1] + (LL)f[j][1] * f[u][0];
            if (!st[u]) {    // 质数
                f[u][1] += f[j][0];
            } else {        // 非质数
                f[u][0] += f[j][0];
                f[u][1] += f[j][1];
            }
        }
    }
    
    long long countPaths(int n, vector<vector<int>>& edges) {
        init();
        get_primes();
        
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            add(a, b), add(b, a);
        }
        
        res = 0;
        memset(f, 0, sizeof f);
        dfs(1, -1);
        return res;
    }
};
```
