## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-163/)


### [1260. 二维网格迁移](https://leetcode-cn.com/problems/shift-2d-grid/)

略

```c++
    vector<vector<int>> shiftGrid(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();
        vector<int> f;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) f.push_back(grid[i][j]);
        int tot = m*n;
        while(k >= tot) k -= tot;
        if(!k) return grid;
        int p = tot-k;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) {
                grid[i][j] = f[p];
                ++p;
                if(p >= tot) p -= tot;
            }
        return grid;
    }
```


### [1261. 在受污染的二叉树中查找元素](https://leetcode-cn.com/problems/find-elements-in-a-contaminated-binary-tree/)

略

```c++
    unordered_map<int, bool> mp;
    void dfs(TreeNode* node, int val) {
        if(!node) return;
        mp[val] = true;
        dfs(node->left, val*2+1);
        dfs(node->right, val*2+2);
    }
    FindElements(TreeNode* root) {
        dfs(root, 0);
        return;
    }
    
    bool find(int target) {
        return mp[target];
    }
```

### [1262. 可被三整除的最大和](https://leetcode-cn.com/problems/greatest-sum-divisible-by-three/) [TAG]

先上 liuzhou_101 聚聚的代码：

```c++
    const int inf = 0x3f3f3f3f;
    int maxSumDivThree(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> f(n+1, vector<int>(3, -inf));
        f[0][0] = 0;
        for(int i = 1; i <= n; ++i)
            for(int j = 0; j < 3; ++j)
                f[i][(j+nums[i-1])%3] = max(f[i-1][(j+nums[i-1])%3], f[i-1][j]+nums[i-1]);
        return f[n][0];
    }
```

自己

分两类数字的弱智dp超时代码。。。：

```c++
    const int inf = 0x3f3f3f3f;
    int maxSumDivThree(vector<int>& nums) {
        int sum = 0;
        vector<int> odd, even;
        for(auto &v : nums)
            if(v%3 == 0) sum += v;
            else if(v%3 == 1) odd.push_back(v);
            else even.push_back(v);
        int n1 = odd.size(), n2 = even.size();
        if(n1 == n2) {
            for(int i = 0; i < n1; ++i) sum += odd[i] + even[i];
            return sum;
        }
        //cout << "sum = " << sum << endl;
        sort(odd.begin(), odd.end());
        sort(even.begin(), even.end());
        reverse(odd.begin(), odd.end());
        reverse(even.begin(), even.end());
        vector<vector<int>> f(n1+1, vector<int>(n2+1, -inf));
        f[0][0] = 0;
        int maxv = -inf;
        for(int i = 3; i <= n1; i += 3) f[i][0] = f[i-3][0] + odd[i-3] + odd[i-2] + odd[i-1], maxv = max(maxv, f[i][0]);
        for(int i = 3; i <= n2; i += 3) f[0][i] = f[0][i-3] + even[i-3] + even[i-2] + even[i-1], maxv = max(maxv, f[0][i]);
        for(int i = 1; i <= n1; ++i)
            for(int j = 1; j <= n2; ++j) {
                f[i][j] = max(f[i][j], f[i-1][j-1] + odd[i-1] + even[j-1]);
                if(i >= 3) f[i][j] = max(f[i][j], f[i-3][j] + odd[i-3] + odd[i-2] + odd[i-1]);
                if(j >= 3) f[i][j] = max(f[i][j], f[i][j-3] + even[j-3] + even[j-2] + even[j-1]);
                maxv = max(maxv, f[i][j]);
            }
        //cout << "maxv = " << maxv << endl;
        sum += max(maxv, 0);
        return sum;
    }
```

按照先求和再减的贪心思路就过：

```c++
    const int inf = 0x3f3f3f3f;
    int maxSumDivThree(vector<int>& nums) {
        int sum = 0;
        vector<int> odd, even;
        for(auto &v : nums) {
            sum += v;
            if(v%3 == 1) odd.push_back(v);
            else if(v%3 == 2) even.push_back(v);
        }
        if(sum % 3 == 0) return sum;
        sort(odd.begin(), odd.end());
        sort(even.begin(), even.end());
        int n1 = odd.size(), n2 = even.size();
        bool f = false;
        int c1 = inf, c2 = inf;
        if(sum % 3 == 1) {
            // 一个odd 或两个even
            if(n1 > 0) c1 = odd[0], f = true;
            if(n2 > 1) c2 = even[0]+even[1], f = true;
            if(f) return sum - min(c1, c2);
        } else {
            // == 2
            // 一个even或两个odd
            if(n1 > 1) c1 = odd[0] + odd[1], f = true;
            if(n2 > 0) c2 = even[0], f = true;
            if(f) return sum - min(c1, c2);
        }
        return 0;
    }
```

也可以 On 扫一遍  记录模数个数

```c++
和 liuzhou 思路一致 代码更复杂 略
```


### [1263. 推箱子](https://leetcode-cn.com/problems/minimum-moves-to-move-a-box-to-their-target-location/) [TAG]

双向搜索 经典 理解记忆

```c++
    int inf = 0x3f3f3f3f;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    int minPushBox(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int sx, sy, bx, by, tx, ty;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) {
                if(grid[i][j] == 'S') sx = i, sy = j;
                if(grid[i][j] == 'B') bx = i, by = j;
                if(grid[i][j] == 'T') tx = i, ty = j;
            }
        vector<vector<vector<vector<int>>>> f(m, vector<vector<vector<int>>>(n, vector<vector<int>>(m, vector<int>(n, inf))));
        // 初始位置状态
        f[sx][sy][bx][by] = 0;
        deque<tuple<int, int, int, int>> dq;
        dq.push_back({sx, sy, bx, by});
        auto go_back = [&](int sx, int sy, int bx, int by, int d) {
            if(f[sx][sy][bx][by] > d) {
                f[sx][sy][bx][by] = d;
                dq.push_back({sx, sy, bx, by});
            }
        };
        auto go_front = [&](int sx, int sy, int bx, int by, int d) {
            if(f[sx][sy][bx][by] > d) {
                f[sx][sy][bx][by] = d;
                dq.push_front({sx, sy, bx, by});
            }
        };
        auto check = [&](int x, int y) {
            return x >= 0 && x < m && y >= 0 && y < n && grid[x][y] != '#';
        };
        while(!dq.empty()) {
            auto [sx, sy, bx, by] = dq.front();
            dq.pop_front();
            for(int i = 0; i < 4; ++i) {
                int x = sx+dx[i], y = sy+dy[i];
                if(check(x, y)) {
                    if(x == bx && y == by) {
                        int px = bx+dx[i], py = by+dy[i];
                        if(check(px, py)) go_back(x, y, px, py, f[sx][sy][bx][by]+1);
                    } else go_front(x, y, bx, by, f[sx][sy][bx][by]);
                }
            }
        }
        int res = inf;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j)
                res = min(res, f[i][j][tx][ty]);
        return res == inf ? -1 : res;
    }
```
