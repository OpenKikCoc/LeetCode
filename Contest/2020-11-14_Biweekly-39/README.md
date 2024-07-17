## [比赛链接](https://leetcode.cn/contest/biweekly-contest-39/)


### [1652. 拆炸弹](https://leetcode.cn/problems/defuse-the-bomb/)



```c++
class Solution {
public:
    vector<int> decrypt(vector<int>& code, int k) {
        vector<int> res(code.size());
        for (int i = 0; i < code.size(); i ++ ) {
            if (!k) res[i] = 0;
            else if (k > 0) {
                for (int j = 1; j <= k; j ++ )
                    res[i] += code[(i + j) % code.size()];
            } else {
                for (int j = -1; j >= k; j -- )
                    res[i] += code[(i + j + code.size()) % code.size()];
            }
        }
        return res;
    }
    vector<int> decrypt_2(vector<int>& code, int k) {
        int n = code.size();
        vector<int> res(n);
        for (int i = 0; i < n; ++ i ) {
            int v = 0;
            int op = k > 0 ? 1 : -1;
            for (int j = 1; j <= abs(k); ++ j )
                v += (code[(i + op * j + n) % n]);
            res[i] = v;
        }
        return res;
    }
};
```


### [1653. 使字符串平衡的最少删除次数](https://leetcode.cn/problems/minimum-deletions-to-make-string-balanced/)



```c++
class Solution {
public:
    int minimumDeletions(string s) {
        // 等价于从某个位置开始全是b 左侧全a 计数
        int n = s.size();
        vector<int> ca(n + 2), cb(n + 2);
        for (int i = 1; i <= n; ++ i ) cb[i] = cb[i-1] + (s[i-1] == 'b');
        for (int i = n; i >= 1; -- i ) ca[i] = ca[i+1] + (s[i-1] == 'a');
        
        int res = 0x3f3f3f3f;
        for (int i = 1; i <= n + 1; ++ i ) res = min(res, cb[i-1] + ca[i]);
        return res;
    }
};
```

### [1654. 到家的最少跳跃次数](https://leetcode.cn/problems/minimum-jumps-to-reach-home/)

bfs

```c++

const int N = 100000;
int dist[N][2];

class Solution {
public:
// 可以证明，一定可以在下标 [0,M + a + b] 的范围内找到最优解，M = max(F_{i},x)
// 因为 M,a,b≤2000，也就是说搜索范围不会超过 6000。

    // 0 无状态 1 只能向右
    typedef pair<int, int> PII;
    int minimumJumps(vector<int>& forbidden, int a, int b, int x) {
        memset(dist, -1, sizeof dist);
        for (auto v : forbidden) dist[v][0] = dist[v][1] = 1e8;
        
        queue<PII> q;
        q.push({0, 0});
        dist[0][0] = 0;
        int res = 0;
        while (!q.empty()) {
            auto [u, st] = q.front(); q.pop();
            int d = dist[u][st];
            if (u == x) return d;
            int lx = u - b, rx = u + a;
            if (rx < N && dist[rx][0] == -1) {
                dist[rx][0] = d + 1;
                q.push({rx, 0});
            }
            if (!st && lx >= 0 && dist[lx][1] == -1) {
                dist[lx][1] = d + 1;
                q.push({lx, 1});
            }
        }
        return -1;
    }
};
```

### [1655. 分配重复整数](https://leetcode.cn/problems/distribute-repeating-integers/)

状压dp

>    **[TAG]**
>
>   枚举子集加速
>
>   ```c++
>   for (int k = t; k; k = (k - 1) & t)
>   ```



```c++
class Solution {
public:
    bool canDistribute(vector<int>& nums, vector<int>& q) {
        unordered_map<int, int> hash;
        for (auto x: nums) hash[x] ++ ;
        vector<int> w(1);
        for (auto [x, y]: hash) w.push_back(y);
        int n = w.size() - 1, m = q.size();
        vector<vector<int>> f(n + 1, vector<int>(1 << m));
        vector<int> s(1 << m);
        for (int i = 0; i < 1 << m; i ++ )
            for (int j = 0; j < m; j ++ )
                if (i >> j & 1)
                    s[i] += q[j];
        
        f[0][0] = 1;
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < 1 << m; j ++ )
                if (f[i][j]) {
                    f[i + 1][j] = 1;
                    for (int t = j ^ ((1 << m) - 1), k = t; k; k = (k - 1) & t) {
                        if (s[k] <= w[i + 1])
                            f[i + 1][j | k] = 1;
                    }
                }
        
        return f[n][(1 << m) - 1];        
    }
};
```
