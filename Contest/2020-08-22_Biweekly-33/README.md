## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-33/)


### [1556. 千位分隔数](https://leetcode-cn.com/problems/thousand-separator/)

略

```c++
    string thousandSeparator(int n) {
        if(!n) return "0";
        int cnt = 0;
        string res;
        while(n) {
            if(cnt && cnt%3 == 0) res.push_back('.');
            ++cnt;
            int d = n % 10;
            n /= 10;
            res.push_back('0'+d);
        }
        reverse(res.begin(), res.end());
        return res;
    }
```


### [1557. 可以到达所有点的最少点数目](https://leetcode-cn.com/problems/minimum-number-of-vertices-to-reach-all-nodes/)

统计入度0即可

```c++
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {
        vector<int> res;
        vector<bool> vis(n);
        for(auto e : edges) vis[e[1]] = true;
        for(int i = 0; i < n; ++i) if(!vis[i]) res.push_back(i);
        return res;
    }
```

### 

#### [1558. 得到目标数组的最少函数调用次数](https://leetcode-cn.com/problems/minimum-numbers-of-function-calls-to-make-target-array/) [TAG]

贪心 尽可能乘2

> 可以理解为，在全体不断乘二的过程中，选择是否给某一个数单独加一。

```c++
    int minOperations(vector<int>& nums) {
        int best = 0;
        int ans = 0;
        for (int num: nums) {
            ans += __builtin_popcount(num);
            best = max(best, num);
        }
        for (int i = 29; i >= 0; --i) {
            if (best & (1 << i)) {
                ans += i;
                break;
            }
        }
        return ans;
    }
```

### [1559. 二维网格图中探测环](https://leetcode-cn.com/problems/detect-cycles-in-2d-grid/) [TAG]

dfs 记录写法

```c++
    int move[5] = {-1, 0, 1, 0, -1};
    int m, n;
    bool containsCycle(vector<vector<char>>& grid) {
      n = grid.size();
      m = grid[0].size();
      vector<vector<bool>> visited(n, vector<bool>(m));
      for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
          if (!visited[i][j]) {
            if (dfs(grid, i, j, -1, -1, visited)) return true;
          }
        }
      }
      return false;
    }
    

    bool dfs(vector<vector<char>>& grid, int r, int c, int fr, int fc, vector<vector<bool>> &visited) {
      visited[r][c] = true;
      for (int i = 0; i < 4; i++) {
        int nr = r + move[i];
        int nc = c + move[i + 1];
        if (nr < 0 || nr >= n || nc < 0 || nc >= m || grid[nr][nc] != grid[r][c]) continue;
        if (visited[nr][nc]) {
          if (nr != fr || nc != fc)
            return true;
          else continue;
        }
        if (dfs(grid, nr, nc, r, c, visited)) return true;
      }
      return false;
    }
```
