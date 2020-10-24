## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-162/)


### [1252. 奇数值单元格的数目](https://leetcode-cn.com/problems/cells-with-odd-values-in-a-matrix/)

暴力即可

```c++
    int oddCells(int n, int m, vector<vector<int>>& indices) {
        vector<vector<int>> g(n, vector<int>(m));
        for(auto & ind : indices) {
            int r = ind[0], c = ind[1];
            for(int i = 0; i < m; ++i) ++g[r][i];
            for(int i = 0; i < n; ++i) ++g[i][c];
        }
        int res = 0;
        for(int i = 0; i < n; ++i)
            for(int j = 0; j < m; ++j)
                if(g[i][j] & 1) ++res;
        return res;
    }
```


### #### [1253. 重构 2 行二进制矩阵](https://leetcode-cn.com/problems/reconstruct-a-2-row-binary-matrix/)

贪心即可 需要注意优先处理列和为 2 的

以及 处理 2 的时候就要判断 uv lv 是否合法 (WA 1)

```c++
    vector<vector<int>> reconstructMatrix(int upper, int lower, vector<int>& colsum) {
        int n = colsum.size();
        int uv = upper, lv = lower;
        vector<vector<int>> g(2, vector<int>(n));
        
        int tot = upper + lower, che = 0;
        for(auto & v : colsum) che += v;
        if(che != tot) return vector<vector<int>>{};
        
        for(int i = 0; i < n; ++i)
            if(colsum[i] == 2) {
                g[0][i] = g[1][i] = 1;
                uv -= 1, lv -= 1;
                if(uv < 0 || lv < 0) return vector<vector<int>>{};
            }
        for(int i = 0; i < n; ++i) {
            if(colsum[i] == 1) {
                if(uv) g[0][i] = 1, --uv;
                else if(lv) g[1][i] = 1, --lv;
                else return vector<vector<int>>{};
            }
        }
        
        return g;
    }
```

### #### [1254. 统计封闭岛屿的数目](https://leetcode-cn.com/problems/number-of-closed-islands/)

dfs 注意写法和判断

如果发现 f 为 true 直接返回的话显然没有完全遍历 小细节[不能有true直接返回]

```c++
    int n, m;
    bool f;
    vector<vector<int>> g;
    vector<vector<bool>> v;
    // 能否走到边界 不能说明被水包围
    vector<int> dx = {-1, 0, 0, 1}, dy = {0, -1, 1, 0};
    void dfs(int x, int y) {
        v[x][y] = true;
        for(int i = 0; i < 4; ++i) {
            int nx = x + dx[i], ny = y + dy[i];
            if(nx < 0 || nx >= n || ny < 0 || ny >= m) {f = true; continue;}
            if(v[nx][ny] || g[nx][ny] == 1) continue;
            dfs(nx, ny);
        }
    }
    int closedIsland(vector<vector<int>>& grid) {
        n = grid.size(), m = grid[0].size();
        g = grid;
        v = vector<vector<bool>>(n, vector<bool>(m));
        int res = 0;
        for(int i = 0; i < n; ++i)
            for(int j = 0; j < m; ++j) if(!v[i][j] && g[i][j] == 0) {
                f = false;
                dfs(i, j);
                if(!f) ++res;
            }
        return res;
    }
```

赛榜更简洁的写法:

```c++
    int check(int x, int y, vector<vector<int>>& grid, vector<vector<int>> &vis) {
        if (x < 0 || x >= grid.size() || y < 0 || y >= grid[0].size()) return 0;
        if (grid[x][y] || vis[x][y]) return 1;
        vis[x][y] = 1;
        return check(x+1, y, grid, vis)&check(x-1, y, grid, vis)&check(x, y+1, grid, vis)&check(x, y-1, grid, vis);
    }
    int closedIsland(vector<vector<int>>& grid) {
        vector<vector<int>> vis(grid.size(), vector<int>(grid[0].size(), 0));
        int res = 0;
        for (int i = 0; i < grid.size(); ++i) {
            for (int j = 0; j < grid[i].size(); ++j) {
                if (vis[i][j] || grid[i][j]) continue;
                res += check(i, j, grid, vis);
            }
        }
        return res;
    }
```

### [1255. 得分最高的单词集合](https://leetcode-cn.com/problems/maximum-score-words-formed-by-letters/)

状压dp

一开始在想线性dp 这样写的话每次统计字母容量较麻烦

考虑单词数量不多 直接状压遍历所有选择状态

```c++
    int maxScoreWords(vector<string>& words, vector<char>& letters, vector<int>& score) {
        int n = words.size();
        vector<int> cnt(26);
        for(auto & c : letters) ++cnt[c-'a'];
        int lim = 1 << n;
        int res = 0;
        for(int st = 0; st < lim; ++st) {
            vector<int> ct(26);
            for(int i = 0; i < n; ++i) if(st & (1 << i)) {
                for(auto & c : words[i]) ++ct[c-'a'];
            }
            bool f = true;
            int tot = 0;
            for(int i = 0; i < 26; ++i) {
                if(ct[i] > cnt[i]) {f = false; break;}
                tot += ct[i] * score[i];
            }
            if(f) res = max(res, tot);
        }
        return res;
    }
```
