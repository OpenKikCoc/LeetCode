## [比赛链接](https://leetcode.cn/contest/biweekly-contest-46/)


### [1763. 最长的美好子字符串](https://leetcode.cn/problems/longest-nice-substring/)

模拟 略

```c++
class Solution {
public:
    bool check(string s) {
        vector<bool> c1(26), c2(26);
        for (auto c : s)
            if (c >= 'a' && c <= 'z') c1[c - 'a'] = true;
            else c2[c - 'A'] = true;
        for (int i = 0; i < 26; ++ i )
            if (c1[i] && !c2[i] || !c1[i] && c2[i])
                return false;
        return true;
    }
    
    string longestNiceSubstring(string s) {
        int n = s.size();
        string res;
        for (int i = 0; i < n; ++ i )
            for (int j = i; j < n; ++ j ) {
                string ss = s.substr(i, j - i + 1);
                if (check(ss) && ss.size() > res.size())
                    res = ss;
            }
        return res;
    }
};
```


### [1764. 通过连接另一个数组的子数组得到一个数组](https://leetcode.cn/problems/form-array-by-concatenating-subarrays-of-another-array/)

注意细节

```c++
class Solution {
public:
    bool check(vector<int> & g, vector<int> & nums, int i) {
        int k = 0;
        for (int j = i; k < g.size() && j < nums.size(); ++ k , ++ j )
            if (g[k] != nums[j])
                return false;
        if (k != g.size()) return false;
        return true;
    }
    
    bool canChoose(vector<vector<int>>& groups, vector<int>& nums) {
        for (int i = 0, k = 0; i < nums.size(); ++ i )
            if (check(groups[k], nums, i)) {
                i += groups[k].size() - 1;
                k ++ ;
                if (k == groups.size()) return true;
            }
        return false;
    }
};
```

### [1765. 地图中的最高点](https://leetcode.cn/problems/map-of-highest-peak/)

多源宽搜

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1000010;
    PII q[N];
    
    int n, m;
    vector<vector<int>> g, res;
    vector<vector<bool>> st;
    
    vector<vector<int>> highestPeak(vector<vector<int>>& isWater) {
        this->g = isWater;
        n = g.size(), m = g[0].size();
        res = vector<vector<int>>(n, vector<int>(m, 1e9));
        st = vector<vector<bool>>(n, vector<bool>(m));
        
        int hh = 0, tt = -1;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j])
                    q[ ++ tt] = {i, j}, res[i][j] = 0;
        int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
        while (hh <= tt) {
            auto [x, y] = q[hh ++ ];
            if (st[x][y]) continue;
            st[x][y] = true;
            
            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= n || ny < 0 || ny >= m || st[nx][ny]) continue;
                if (res[nx][ny] > res[x][y] + 1) {
                    res[nx][ny] = res[x][y] + 1;
                    q[ ++ tt] = {nx, ny};
                }
            }
        }
        
        return res;
    }
};
```

### [1766. 互质树](https://leetcode.cn/problems/tree-of-coprimes/) [TAG]

> 如果用蛮力检查一个节点的所有的祖先节点 那么一个节点的祖先节点最多能有 n-1n−1 个 显然会超时

原先首先 dfs 找序并反向建图 随后依据反向图向上搜索

这样显然会在祖先极多的时候爆掉

需要充分利用值域 ( 50 ) 的条件

**以及注意 双向边建图源点遍历时加 fa 即可 无需反向建图**

```c++
class Solution {
public:
    vector<vector<int>> g, st;
    vector<int> nums, res, depth;
    
    int gcd(int a, int b) {
        return b ? gcd(b, a % b) : a;
    }
    
    void dfs(int u, int fa) {
        int v = nums[u];
        for (int i = 1; i <= 50; ++ i )
            if (st[i].size() && gcd(v, i) == 1)
                if (res[u] == -1 || depth[res[u]] < depth[st[i].back()])
                    res[u] = st[i].back();
        
        st[v].push_back(u);
        for (auto v : g[u]) {
            if (v == fa) continue;
            depth[v] = depth[u] + 1;
            dfs(v, u);
        }
            
        st[v].pop_back();
    }
    
    vector<int> getCoprimes(vector<int>& nums, vector<vector<int>>& edges) {
        this->nums = nums;
        int n = nums.size();
        g.resize(n), st.resize(55), res.resize(n, -1), depth.resize(n, 0);
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            g[a].push_back(b), g[b].push_back(a);
        }
        
        dfs(0, -1);
        return res;
    }
};
```
