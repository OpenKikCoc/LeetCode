## [比赛链接](https://leetcode.cn/contest/weekly-contest-357/)


### [2810. 故障键盘](https://leetcode.cn/problems/faulty-keyboard/)



```c++
class Solution {
public:
    string finalString(string s) {
        string res;
        for (auto c : s) {
            if (c == 'i')
                reverse(res.begin(), res.end());
            else
                res.push_back(c);
        }
        return res;
    }
};
```


### [2811. 判断是否能拆分数组](https://leetcode.cn/problems/check-if-it-is-possible-to-split-array/)

有更简单的思路 只需相邻两个的和 >= m 即可

```c++
class Solution {
public:
    const static int N = 110;
    
    int n;
    int s[N];
    bool f[N][N];
    
    bool canSplitArray(vector<int>& nums, int m) {
        this->n = nums.size();
        {
            s[0] = 0;
            for (int i = 1; i <= n; ++ i )
                s[i] = s[i - 1] + nums[i - 1];
        }
        
        memset(f, false, sizeof f);
        
        for (int w = 1; w <= n; ++ w )
            for (int l = 1; l + w - 1 <= n; ++ l ) {
                int r = l + w - 1;
                if (w == 1) {
                    f[l][r] = true;
                    continue;
                }
                if (w != n && s[r] - s[l - 1] < m) {
                    f[l][r] = false;
                    continue;
                }
                for (int k = l; k < r; ++ k )
                    f[l][r] |= f[l][k] && f[k + 1][r];
            }
        
        return f[1][n];
    }
};
```

### [2812. 找出最安全路径](https://leetcode.cn/problems/find-the-safest-path-in-a-grid/)

显然最后判断联通也可以并查集而非二分 略

```c++
class Solution {
public:
    const static int N = 410;
    using PII = pair<int, int>;
    
    int n, m;
    vector<vector<int>> g;
    
    int d[N][N];
    int dx[4] = {0, -1, 1, 0}, dy[4] = {-1, 0, 0, 1};
    
    int mid;
    bool st[N][N];
    
    bool dfs(int x, int y) {
        if (x == n - 1 && y == m - 1)
            return true;
        st[x][y] = true;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                continue;
            if (st[nx][ny] || d[nx][ny] < mid)
                continue;
            if (dfs(nx, ny))
                return true;
        }
        return false;
    }
    
    bool check() {
        if (d[0][0] < mid)
            return false;
        memset(st, 0, sizeof st);
        st[0][0] = true;
        return dfs(0, 0);
    }
    
    int maximumSafenessFactor(vector<vector<int>>& grid) {
        this->g = grid;
        this->n = g.size(), this->m = g[0].size();
        
        memset(d, 0x3f, sizeof d);
        queue<PII> q;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j])
                    q.push({i, j}), d[i][j] = 0;
        
        while (q.size()) {
            auto [x, y] = q.front(); q.pop();
            int dis = d[x][y];
            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                    continue;
                if (d[nx][ny] > dis + 1) {
                    d[nx][ny] = dis + 1;
                    q.push({nx, ny});
                }
            }
        }
        
        // 考虑每个点 都已经得到了一个安全距离  要找到第一个无法联通的安全距离
        int l = 0, r = n + m + 1;
        while (l < r) {
            this->mid = l + (r - l) / 2;
            if (check())
                l = mid + 1;
            else
                r = mid;
        }
        return l - 1;
    }
};
```

### [2813. 子序列最大优雅度](https://leetcode.cn/problems/maximum-elegance-of-a-k-length-subsequence/) [TAG]

**贪心 反悔思维**

按照利润从大到小排序。先把前 kkk 个项目选上。

考虑选第 k+1k+1k+1 个项目，为了选它，我们必须从前 kkk 个项目中移除一个项目。

由于已经按照利润从大到小排序，选这个项目不会让 $\textit{total\_profit}$ 变大，所以我们重点考虑能否让 $\textit{distinct\_categories}$ 变大。

>   为什么 k 个之后每次出现类别不重复的都要进行移除，而不是判断 res 确认增大后再移除？
>
>   => 只有挑不重复的类别才有可能让答案变大，相同的类别中最左边的利润最大，不同的类别只考虑第一次出现的话也是最左边的利润最大，所以每次遇到的第一个不同的类别就是最好的

```c++
class Solution {
public:
    using LL = long long;
    
    long long findMaximumElegance(vector<vector<int>>& items, int k) {
        // 单纯按 profit 排序
        sort(items.begin(), items.end(), [](const vector<int> & a, const vector<int> & b) {
            return a[0] > b[0];
        });

        LL res = 0, tot_profit = 0;
        unordered_set<int> vis;
        // 考虑已经排过序 可以直接使用 stack 记录重复类别的 [可替换值] 【必须是此前出现过的】
        stack<int> duplicate;

        for (int i = 0; i < items.size(); ++ i ) {
            int profit = items[i][0], category = items[i][1];
            if (i < k) {
                // 对于前 k 个直接累加
                tot_profit += profit;
                if (!vis.insert(category).second)
                    // 出现过的类别
                    duplicate.push(profit);
            } else if (!duplicate.empty() && vis.insert(category).second) {
                // 只有此前有过重复类别 且当前是新类别【有可能是的 distinct_categories 增加的情况】

                // 选择一个重复处出现过的类别中 价值最小的替换
                tot_profit += profit - duplicate.top();
                duplicate.pop();
            }
            res = max(res, tot_profit + (LL)vis.size() * (LL)vis.size());
        }

        return res;
    }
};
```
