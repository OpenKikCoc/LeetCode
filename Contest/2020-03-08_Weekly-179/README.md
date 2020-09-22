## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-179/)


### [1374. 生成每种字符都是奇数个的字符串](https://leetcode-cn.com/problems/generate-a-string-with-characters-that-have-odd-counts/)

a b 各奇数个即可

```c++
class Solution {
public:
    string generateTheString(int n) {
        string res;
        if(!n) return res;
        if(n&1) {
            for(int i = 0; i < n; ++i) res.push_back('a');
        } else {
            for(int i = 0; i < n-1; ++i) res.push_back('a');
            res.push_back('b');
        }
        return res;
    }
};
```


### [1375. 灯泡开关 III](https://leetcode-cn.com/problems/bulb-switcher-iii/)

左边连续亮 则左边的都变成蓝色 求所有灯变成蓝色的时刻的数目

其实就是求 亮的个数 == 最靠右的灯的序号 的数目

```c++
class Solution {
public:
    int numTimesAllBlue(vector<int>& light) {
        int res = 0;
        int maxv = 0, cnt = 0;
        for(auto k : light) {
            maxv = max(maxv, k);
            ++cnt;
            if(maxv == cnt) ++res;
        }
        return res;
    }
};
```

### [1376. 通知所有员工所需的时间](https://leetcode-cn.com/problems/time-needed-to-inform-all-employees/)

点有权值 dfs

```c++
class Solution {
public:
    int res;
    void dfs(vector<vector<int>>& es, vector<int>& t, int id, int cost) {
        int sz = es[id].size();
        if(!sz) {
            res = max(res, cost);
            return;
        }
        for(int i = 0; i < sz; ++i) {
            dfs(es, t, es[id][i], cost+t[id]);
        }
        
    }
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        res = 0;
        vector<vector<int>> es(n+1);
        for(int i = 0; i < n; ++i) {
            if(manager[i] == -1) continue;
            es[manager[i]].push_back(i);
        }
        dfs(es, informTime, headID, 0);
        return res;
    }
};
```

如果用自底向上的dfs 加上记忆化搜索

### [1377. T 秒后青蛙的位置](https://leetcode-cn.com/problems/frog-position-after-t-seconds/) [TAG]

青蛙从根开始跳 求t秒后在target点的概率

自己做法是先求路径 再计算概率：

```c++
class Solution {
public:
    double res;
    bool find;
    vector<int> tmp;
    int step;
    void dfs1(vector<vector<int>>& es, vector<bool>& vis, vector<int>& fa, int node, int target, int t, int k) {
        if(node == target) {
            fa = tmp;
            step = k;
            find = true;
            return;
        }
        if(find) return;
        if(k >= t) return;
        tmp.push_back(node);
        int sz = es[node].size(), to;
        
        for(int i = 0; i < sz; ++i) {
            to = es[node][i];
            if(!vis[to] && !find) {
                vis[to] = true;
                dfs1(es,vis,fa,to,target,t,k+1);
            }
        }
        tmp.pop_back();
    }
    void dfs(vector<vector<int>>& es, vector<int>& fa, int nodep, int t, int time) {
        if(nodep == 0) {
            res /= double(es[fa[nodep]].size());
            return;
        }
        res /= double(es[fa[nodep]].size()-1);
        dfs(es, fa, nodep-1, t, time+1);
    }
    double frogPosition(int n, vector<vector<int>>& edges, int t, int target) {
        res = 1.0;
        if(n==1) return res;
        vector<vector<int>> es(n+1);
        vector<bool> vis(n+1);
        vector<int> fa;
        for(auto e : edges) {
            es[e[0]].push_back(e[1]);
            es[e[1]].push_back(e[0]);
        }
        vis[1] = true;
        find = false;
        dfs1(es, vis, fa, 1, target, t, 0);
        if(!find || !fa.size() || (find&&es[target].size()>1&&step<t)) return 0;
        dfs(es, fa, fa.size()-1, t, 0);
        return res;
    }
};
```

还有dfs

```c++
class Solution {
    double pr[105]; //表示跳到每个节点的概率,初始值pr[1] = 1.0
    bool vis[105]; //dfs过程会使用到，用于记录该节点有没有被遍历过。
    map<int, vector<int>> mp; //记录边的连接信息
    void dfs(int cur, int t) {
        if (t <= 0) return; //如果时间到了，那就退出
        int to_count = 0;
        for (auto next : mp[cur]) if (!vis[next]) to_count++; //首先观察青蛙能去的地方 
        if (to_count == 0) return; //如果已经没有地方能去了，那就退出
        double p = pr[cur] / to_count; //跳往每个地方都是均匀分布的，概率均匀
        for (auto next : mp[cur]) {
            if (!vis[next]) {
                vis[next] = true;
                pr[cur] -= p; 
                pr[next] += p; //开始跳之前，将概率转移
                dfs(next, t - 1); //这样青蛙就可以安心跳过去了
                vis[next] = false;
            }
        }
    }
public:
    double frogPosition(int n, vector<vector<int>>& edges, int t, int target) {
        //题目的数据量很小，才100个节点，本来担心暴力dfs模拟的话会不会超时。
        //但是青蛙不会走回头路，这样就可以去掉很多很多的情况，对于dfs来说，应该不会超时的，然后开始干！
        for (int i = 0; i < n; i++) {
            pr[i] = 0; vis[i] = false; //初始化。
        }
        for (auto edge : edges) {
            mp[edge[0]].push_back(edge[1]);
            mp[edge[1]].push_back(edge[0]); //因为是无向图
        }
        pr[1] = 1; vis[1] = true; //初始化表示在当前1节点。
        dfs(1, t);
        return pr[target];
    }
};

// 作者：wu-bin-cong
```



todo

```c++
class Solution {
public:
    double f[105][55];
    vector<int> G[105];
    void dfs(int cur, int fa, int curt) {
        int sz = G[cur].size();
        if(fa) --sz;
        if(sz == 0) {
            f[cur][curt] += f[cur][curt - 1];
            return;
        }
        for(int x : G[cur]) {
            if(x == fa) continue;
            f[x][curt] = 1.0 * f[cur][curt - 1] * (1.0 / sz);
            dfs(x, cur, curt);
        }
    }
    double frogPosition(int n, vector<vector<int>>& edges, int t, int target) {
        for(auto e : edges) {
            G[e[0]].push_back(e[1]);
            G[e[1]].push_back(e[0]);
        }
        f[1][0] = 1;
        for(int i = 1; i <= t; ++i) {
            dfs(1, 0, i);
        }
        return f[target][t];
    }
};
```

