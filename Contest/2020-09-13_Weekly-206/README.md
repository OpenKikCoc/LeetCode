## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-206/)

rating 105/4491


### [5511. 二进制矩阵中的特殊位置](https://leetcode-cn.com/problems/special-positions-in-a-binary-matrix/)

对每个位置暴力统计即可

```c++
    int numSpecial(vector<vector<int>>& mat) {
        int res = 0;
        int m = mat.size(), n = mat[0].size();
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) if(mat[i][j] == 1) {
                int c1 = 0, c2 = 0;
                for(int x = 0; x < m; ++x) if(mat[x][j] == 1) ++c1;
                for(int y = 0; y < n; ++y) if(mat[i][y] == 1) ++c2;
                if(c1 == 1 && c2 == 1) ++res;
            }
        return res;
    }
```


### [5512. 统计不开心的朋友](https://leetcode-cn.com/problems/count-unhappy-friends/)

模拟获取 x y u v  随后校验统计即可

```c++
    int unhappyFriends(int n, vector<vector<int>>& preferences, vector<vector<int>>& pairs) {
        unordered_map<int, int> mp;
        for(auto p : pairs) {
            mp[p[0]] = p[1];
            mp[p[1]] = p[0];
        }
        int res = 0;
        for(int i = 0; i < n; ++i) {
            int x = i, y = mp[x];
            bool f = false;
            for(auto u : preferences[x]) {
                if(u == y) break;
                for(auto v : preferences[u]) {
                    if(v == mp[u]) break;
                    if(v == x) {++res; f = true; break;}
                }
                if(f) break;
            }
        }
        return res;
    }
```

### [5513. 连接所有点的最小费用](https://leetcode-cn.com/problems/min-cost-to-connect-all-points/) [TAG]

裸的**平面点哈密顿距离最小生成树**

>    有nlogn算法
>
>   参见 poj 3241
>
>   后面需要补模板
>
>   TODO

针对 leetcode 的用例，暴力跑 kruskal 就能过。

```c++
struct Edge{
    int u, v, w;
    bool operator < (const Edge& o) {
        return w < o.w;
    }
};

class Solution {
public:
    const int inf = 0x3f3f3f3f;
    vector<Edge> es;
    vector<int> fa;
    int n;
    long long kruskal() {
        sort(es.begin(), es.end());
        for(int i = 1; i <= n; ++i) fa[i] = i;
        long long res = 0;
        int m = es.size();
        for(int i = 0; i < m; ++i) {
            auto [u, v, w] = es[i];
            int fu = find(u), fv = find(v);
            if(fu != fv) {
                fa[fu] = fv;
                res += w;
            }
        }
        // if(cnt < n-1)
        return res;
    }
    int find(int x) {
        if(x == fa[x]) return x;
        return fa[x] = find(fa[x]);
    }
    int minCostConnectPoints(vector<vector<int>>& points) {
        n = points.size();
        fa = vector<int>(n+1);
        for(int i = 0; i < n; ++i) {
            int x1 = points[i][0], y1 = points[i][1];
            for(int j = 0; j < i; ++j) {
                int x2 = points[j][0], y2 = points[j][1];
                int w = abs(x1-x2) + abs(y1-y2);
                es.push_back({i+1, j+1, w});
            }
        }
        
        return kruskal();
    }
};
```

### [5514. 检查字符串是否可以通过排序子字符串得到另一个字符串](https://leetcode-cn.com/problems/check-if-string-is-transformable-with-substring-sort-operations/)

如下注释

```c++
    // 因为排序不能改变相对位置 也即： 原本 x1 < x2 且边后 x1 在 x2 后面 比如 8xxx5 改之后还是8 5
    // 排序会改变一段区间内元素的相对位置
    // 对于s[i] 到i位置位置的每一个数 前面比它小的数的数量都必须小于等于t[i]位置前面比它小的数的数量
    bool isTransformable(string s, string t) {
        int n = s.size();
        vector<int> cntt(10), cnts(10);
        vector<vector<int>> lest(10, vector<int>()), less(10, vector<int>());
        for(int i = 0; i < n; ++i) {
            int v = t[i]-'0';
            int les = 0;
            for(int i = 0; i < v; ++i) les += cntt[i];
            lest[v].push_back(les);
            ++cntt[v];
        }
        for(int i = 0; i < n; ++i) {
            int v = s[i]-'0';
            int les = 0;
            for(int i = 0; i < v; ++i) les += cnts[i];
            less[v].push_back(les);
            int sz = less[v].size();
            if(sz > lest[v].size() || les > lest[v][sz-1]) return false;
            ++cnts[v];
        }
        return true;
    }
```

题解区有别的做法，如 `操作前后逆序对树木不增加即可转换` ，感觉并不优雅。