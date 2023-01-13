## [比赛链接](https://leetcode.cn/contest/weekly-contest-322/)

>   virtual rank: 96 / 5085


### [2490. 回环句](https://leetcode.cn/problems/circular-sentence/)



```c++
class Solution {
public:
    bool isCircularSentence(string sentence) {
        stringstream ss(sentence);
        vector<string> t;
        string s;
        while (ss >> s)
            t.push_back(s);
        
        int n = t.size();
        for (int i = 1; i < n; ++ i )
            if (t[i][0] != t[i - 1].back())
                return false;
        if (t[n - 1].back() != t[0][0])
            return false;
        return true;
    }
};
```


### [2491. 划分技能点相等的团队](https://leetcode.cn/problems/divide-players-into-teams-of-equal-skill/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long dividePlayers(vector<int>& skill) {
        sort(skill.begin(), skill.end());
        int n = skill.size();
        LL tar = skill[0] + skill[n - 1], res = 0;
        for (int i = 0, j = n - 1; i < j; ++ i , -- j ) {
            LL t = skill[i] + skill[j];
            if (t != tar)
                return -1;
            res += (LL)skill[i] * skill[j];
        }
        return res;
    }
};
```

### [2492. 两个城市间路径的最小分数](https://leetcode.cn/problems/minimum-score-of-a-path-between-two-cities/)

本质是求节点 1 所在连通块的最小边权

```c++
class Solution {
public:
    const static int N = 1e5 + 10, INF = 0x3f3f3f3f;
    
    int pa[N], sz[N];
    void init() {
        for (int i = 0; i < N; ++ i )
            pa[i] = i, sz[i] = INF;
    }
    int find(int x) {
        if (pa[x] != x)
            pa[x] = find(pa[x]);
        return pa[x];
    }
    
    int minScore(int n, vector<vector<int>>& roads) {
        sort(roads.begin(), roads.end(), [](const vector<int> & a, const vector<int> & b) {
            return a[2] < b[2];
        });
        
        init();
        
        for (auto & r : roads) {
            int a = find(r[0]), b = find(r[1]), c = r[2];
            if (a != b)
                pa[a] = b;
            sz[b] = min({sz[b], sz[a], c});
        }
        return sz[find(1)];
    }
};
```

### [2493. 将节点分成尽可能多的组](https://leetcode.cn/problems/divide-nodes-into-the-maximum-number-of-groups/)

加快速度

```c++
class Solution {
public:
    // 数据范围 n <= 500
    // 尝试遍历起点，检查是否能遍历所有节点且距离符合要求
    // ==> 对于有多个联通分量的情况 不同分量之间需要累加
    
    const static int N = 510, M = 2e4 + 10, INF = 0x3f3f3f3f;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int id[N];
    vector<int> xs[N];
    void dfs(int u, int pa, int t) {
        id[u] = t;
        xs[t].push_back(u);
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == pa)
                continue;
            if (!id[j])
                dfs(j, u, t);
        }
    }
    
    int q[N], from[N], d[N];
    
    int check(int u, int i) {
        memset(d, 0x3f, sizeof d);
        memset(from, -1, sizeof from);
        int hh = 0, tt = -1;
        d[u] = 0, q[ ++ tt] = u;
        
        while (hh <= tt) {
            int t = q[hh ++ ];
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                if (d[j] >= INF / 2)
                    d[j] = d[t] + 1, q[ ++ tt] = j;
                else if (abs(d[j] - d[t]) != 1) {
                    return -1;
                }
            }
        }
        
        // cout << " check... " << u << " " << i << endl;
        // for (auto x : xs[i])
        //     cout << " x = " << x << " d = " << d[x] << endl;
        
        
        int maxd = -1;
        for (auto x : xs[i])
            maxd = max(maxd, d[x] + 1);
        return maxd;
    }
    
    int magnificentSets(int n, vector<vector<int>>& edges) {
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        memset(id, 0, sizeof id);
        for (int i = 0; i <= n; ++ i )
            xs[i].clear();
        for (int i = 1; i <= n; ++ i )
            if (!id[i])
                dfs(i, -1, i);
        
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            if (id[i] == i) {
                int v = -1;
                // 从起点开始 找到可行的距离最远的方案
                for (auto x : xs[i]) {
                    int t = check(x, i);
                    // cout << " i = " << i << " x = " << x << " t = " << t << endl;
                    if (t != -1)
                        v = max(v, t);
                }

                // cout << " i = " << i << " v = " << v << endl;

                if (v == -1)
                    return -1;
                res += v;
            }
        
        return res;
    }
};
```
