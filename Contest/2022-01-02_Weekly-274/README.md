## [比赛链接](https://leetcode.cn/contest/weekly-contest-274/)


### [2124. 检查是否所有 A 都在 B 之前](https://leetcode.cn/problems/check-if-all-as-appears-before-all-bs/)

略

```c++
class Solution {
public:
    bool checkString(string s) {
        int n = s.size();
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                if (s[i] == 'b' && s[j] == 'a')
                    return false;
        return true;
    }
};
```


### [2125. 银行中的激光束数量](https://leetcode.cn/problems/number-of-laser-beams-in-a-bank/)

略

```c++
class Solution {
public:
    int numberOfBeams(vector<string>& bank) {
        int m = bank.size(), n = bank[0].size();
        int last = 0, res = 0;
        for (int i = 0; i < m; ++ i ) {
            int c = 0;
            for (int j = 0; j < n; ++ j )
                if (bank[i][j] == '1')
                    c ++ ;
            if (c) {
                res += last * c;
                last = c;
            }
        }
        return res;
    }
};
```

### [2126. 摧毁小行星](https://leetcode.cn/problems/destroying-asteroids/)

略

```c++
class Solution {
public:
    using LL = long long;
    bool asteroidsDestroyed(int mass, vector<int>& a) {
        sort(a.begin(), a.end());
        LL v = mass;
        for (auto x : a)
            if (x > v)
                return false;
            else
                v += x;
        return true;
    }
};
```

### [2127. 参加会议的最多员工数](https://leetcode.cn/problems/maximum-employees-to-be-invited-to-a-meeting/) [TAG]

内向基环树

```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int deg[N], depth[N];
    int q[N], hh, tt;
    bool st[N];
    
    // 所有数据可以看作多个【内向基环树（树中只有一个有向环）】
    // 每个内向基环树中 找到该最大环
    int maximumInvitations(vector<int>& favorite) {
        int n = favorite.size();
        
        // 统计入度
        memset(deg, 0, sizeof deg);
        for (int i = 0; i < n; ++ i )
            deg[favorite[i]] ++ ;
        
        // topo 求最长链
        for (int i = 0; i < n; ++ i )
            depth[i] = 1;
        hh = 0, tt = -1;
        for (int i = 0; i < n; ++ i )
            if (deg[i] == 0)
                q[ ++ tt] = i;
        while (hh <= tt) {
            int u = q[hh ++ ];
            int v = favorite[u];
            depth[v] = max(depth[v], depth[u] + 1);
            if ( -- deg[v] == 0)
                q[ ++ tt] = v;
        }
        
        // 求解
        // res1 : 一个【最长的环】
        // res2 : 多个【长度为2且各自带有一条链的环】
        int res1 = 0, res2 = 0;
        memset(st, 0, sizeof st);
        for (int i = 0; i < n; ++ i )
            // 选择环上的点
            if (deg[i] && !st[i]) {
                st[i] = true;
                int j = favorite[i], c = 1;
                while (j != i) {
                    st[j] = true;
                    j = favorite[j];
                    c ++ ;
                }
                // now: i = j
                if (c > 2)
                    // case 1: A longest circle
                    res1 = max(res1, c);
                else
                    // case 2: c == 2 (因为不会有长度为 1 的环)
                    // 此时 一个长度为2的环外加各自连上的最长链
                    res2 += depth[i] + depth[favorite[i]];
            }
        return max(res1, res2);
    }
};
```
