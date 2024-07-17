## [比赛链接](https://leetcode.cn/contest/weekly-contest-226/)


### [1742. 盒子中小球的最大数量](https://leetcode.cn/problems/maximum-number-of-balls-in-a-box/)

统计即可

```c++
ass Solution {
public:
    int get(int x) {
        int ret = 0;
        while (x) ret += x % 10, x /= 10;
        return ret;
    }
    
    int countBalls(int ll, int hl) {
        unordered_map<int, int> hash;
        for (int i = ll; i <= hl; ++ i ) {
            ++ hash[get(i)];
        }
        int res = 0;
        for (auto [k, v] : hash) res = max(res, v);
        return res;
    }
};
```


### [1743. 从相邻元素对还原数组](https://leetcode.cn/problems/restore-the-array-from-adjacent-pairs/)

显然开始和末尾的位置度为 1

```c++
class Solution {
public:
    vector<int> res;
    unordered_map<int, vector<int>> g;
    unordered_map<int, bool> vis;
    int n;
    
    void dfs(int u) {
        res.push_back(u);
        vis[u] = true;
        for (auto v : g[u])
            if (!vis[v])
                dfs(v);
    }
    
    vector<int> restoreArray(vector<vector<int>>& adjacentPairs) {
        n = adjacentPairs.size() + 1;
        for (auto & p : adjacentPairs) {
            int u = p[0], v = p[1];
            g[u].push_back(v);
            g[v].push_back(u);
        }
        
        for (auto & [u, e] : g)
            if (e.size() == 1) {
                dfs(u);
                break;
            }
        return res;
    }
};
```

```c++
class Solution {
public:
    unordered_map<int, vector<int>> g;
    vector<int> path;

    void dfs(int u, int father) {
        path.push_back(u);
        for (int x: g[u])
            if (x != father)
                dfs(x, u);
    }

    vector<int> restoreArray(vector<vector<int>>& ap) {
        unordered_map<int, int> cnt;
        for (auto& e: ap) {
            int a = e[0], b = e[1];
            g[a].push_back(b), g[b].push_back(a);
            cnt[a] ++ , cnt[b] ++ ;
        }
        int root = 0;
        for (auto [k, v]: cnt)
            if (v == 1) {
                root = k;
                break;
            }

        dfs(root, -1);
        return path;
    }
};
```

```c++
const int N = 200010, B = 100000;

int h[N], e[N], ne[N];
int cnt[N];

class Solution {
public:

    int idx;
    vector<int> path;

    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }

    void dfs(int u, int father) {
        path.push_back(u - B);
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == father) continue;
            dfs(j, u);
        }
    }

    vector<int> restoreArray(vector<vector<int>>& ap) {
        memset(cnt, 0, sizeof cnt);
        memset(h, -1, sizeof h);
        idx = 0;
        for (auto& e: ap) {
            int a = e[0] + B, b = e[1] + B;
            add(a, b), add(b, a);
            cnt[a] ++ , cnt[b] ++ ;
        }

        int root = 0;
        for (int i = 0; i < N; i ++ )
            if (cnt[i] == 1) {
                root = i;
                break;
            }

        dfs(root, -1);
        return path;
    }
};
```

### [1744. 你能在你最喜欢的那天吃到你最喜欢的糖果吗？](https://leetcode.cn/problems/can-you-eat-your-favorite-candy-on-your-favorite-day/)

注意从第 0 天开始吃水果 WA 一发

```c++
class Solution {
public:
    using LL = long long;
    
    vector<bool> canEat(vector<int>& candiesCount, vector<vector<int>>& queries) {
        int n = candiesCount.size();
        vector<LL> s(n + 1);
        for (int i = 1; i <= n; ++ i ) s[i] = s[i - 1] + candiesCount[i - 1];
        
        vector<bool> res;
        for (auto & q : queries) {
            int ft = q[0], fd = q[1] + 1, dc = q[2]; // fd 从第 0 天开始
            LL low = fd, high = (LL)fd * dc;
            
            if (s[ft + 1] < low || s[ft] >= high) res.push_back(false);
            else res.push_back(true);
        }
        return res;
    }
};
```

### [1745. 回文串分割 IV](https://leetcode.cn/problems/palindrome-partitioning-iv/)



```c++
class Solution {
public:
    bool checkPartitioning(string s) {
        int n = s.size();
        vector<vector<bool>> f(n, vector<bool>(n));
        for (int i = n - 1; i >= 0; -- i )
            for (int j = i; j < n; ++ j ) {
                if (i == j) f[i][j] = true;
                else if (i + 1 == j) f[i][j] = s[i] == s[j];
                else f[i][j] = s[i] == s[j] && f[i + 1][j - 1];
            }
        
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j + 1 < n; ++ j )
                if (f[0][i] && f[i + 1][j] && f[j + 1][n - 1])
                    return true;
        return false;
    }
};
```
