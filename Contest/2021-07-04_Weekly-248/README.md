## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-248)

>   rank: 31 / 4450


### [5800. 基于排列构建数组](https://leetcode-cn.com/problems/build-array-from-permutation/)

模拟即可 略

```c++
class Solution {
public:
    vector<int> buildArray(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);
        for (int i = 0; i < n; ++ i )
            res[i] = nums[nums[i]];
        return res;
    }
};
```


### [5801. 消灭怪物的最大数量](https://leetcode-cn.com/problems/eliminate-maximum-number-of-monsters/)

处理怪物抵达城堡的时间 贪心排序即可

```c++
class Solution {
public:
    using PII = pair<int, int>;
    int n;
    
    int eliminateMaximum(vector<int>& dist, vector<int>& speed) {
        this->n = dist.size();
        vector<int> ve;
        for (int i = 0; i < n; ++ i ) {
            int d = dist[i], p = speed[i];
            ve.push_back((d + p - 1) / p);
        }
        sort(ve.begin(), ve.end());
        
        int p = 0;
        for (int i = 0; i < n; ++ i ) {
            if (ve[p] <= i)
                return p;
            p ++ ;
        }
        return n;
    }
};
```

### [5802. 统计好数字的数目](https://leetcode-cn.com/problems/count-good-numbers/)

标准快速幂 略

```c++
class Solution {
public:
    using LL = long long;
    const LL MOD = 1e9 + 7;
    
    LL qpow(LL a, LL b) {
        LL ret = 1;
        while (b) {
            if (b & 1)
                ret = (ret * a) % MOD;
            a = (a * a) % MOD;
            b >>= 1;
        }
        return ret;
    }
    
    int countGoodNumbers(long long n) {
        LL odd = n / 2;
        LL even = n - odd;
        return qpow(4, odd) * qpow(5, even) % MOD;
    }
};
```

### [5803. 最长公共子路径](https://leetcode-cn.com/problems/longest-common-subpath/)

多字符串的 LCS 问题

SAM 模版题 略

```c++
class Solution {
public:
    const static int N = 100010;
    
    int tot, last;
    struct Node {
        int len, fa;
        unordered_map<int, int> ch; // 注意本题特殊 数据范围较大 数组改map
    } node[N];

    int ans[N], now[N];
    int h[N], e[N], ne[N], idx;
    
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
        tot = last = 1;
        memset(ans, 0, sizeof ans);
        memset(now, 0, sizeof now);
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    void extend(int c) {
        int p = last, np = last = ++ tot;
        node[np].len = node[p].len + 1;
        for (; p && !node[p].ch[c]; p = node[p].fa)
            node[p].ch[c] = np;
        if (!p)
            node[np].fa = 1;
        else {
            int q = node[p].ch[c];
            if (node[q].len == node[p].len + 1) node[np].fa = q;
            else {
                int nq = ++ tot;
                node[nq] = node[q], node[nq].len = node[p].len + 1;
                node[q].fa = node[np].fa = nq;
                for (; p && node[p].ch[c] == q; p = node[p].fa)
                    node[p].ch[c] = nq;
            }
        }
    }
    
    void dfs(int u) {
        for (int i = h[u]; ~i; i = ne[i]) {
            dfs(e[i]);
            now[u] = max(now[u], now[e[i]]);
        }
    }
    
    int longestCommonSubpath(int n, vector<vector<int>>& paths) {
        init();
        
        auto pth = paths[0];
        for (auto c : pth)
            extend(c);
        for (int i = 1; i <= tot; ++ i )
            ans[i] = node[i].len;
        for (int i = 2; i <= tot; ++ i )
            add(node[i].fa, i);
        
        int m = paths.size();
        for (int i = 1; i < m; ++ i ) {
            auto pth = paths[i];
            memset(now, 0, sizeof now);
            int p = 1, t = 0, sz = pth.size();
            for (int j = 0; j < sz; ++ j ) {
                int c = pth[j];
                while (p > 1 && !node[p].ch[c])
                    p = node[p].fa, t = node[p].len;
                if (node[p].ch[c])
                    p = node[p].ch[c], t ++ ;
                now[p] = max(now[p], t);
            }
            dfs(1);
            for (int j = 1; j <= tot; j ++ )
                ans[j] = min(ans[j], now[j]);
        }
        
        int res = 0;
        for (int i = 1; i <= tot; ++ i )
            res = max(res, ans[i]);
        return res;
    }
};
```
