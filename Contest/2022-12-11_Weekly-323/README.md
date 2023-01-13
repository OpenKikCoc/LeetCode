## [比赛链接](https://leetcode.cn/contest/weekly-contest-323/)


### [2500. 删除每行中的最大值](https://leetcode.cn/problems/delete-greatest-value-in-each-row/)



```c++
class Solution {
public:
    const static int N = 55;
    
    int t[N];
    int deleteGreatestValue(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        
        memset(t, 0, sizeof t);
        for (auto & g : grid) {
            sort(g.begin(), g.end());
            for (int i = 0; i < m; ++ i )
                t[i] = max(t[i], g[i]);
        }
        int res = 0;
        for (int i = 0; i < m; ++ i )
            res += t[i];
        return res;
    }
};
```


### [2501. 数组中最长的方波](https://leetcode.cn/problems/longest-square-streak-in-an-array/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int f[N];
    
    int longestSquareStreak(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        
        for (auto x : nums) {
            int t = sqrt(x), p = 0;
            if (t * t == x)
                p = f[t];
            f[x] = p + 1;
        }
        int res = 0;
        for (int i = 0; i < N; ++ i )
            res = max(res, f[i]);
        return res < 2 ? -1 : res;
    }
};
```

### [2502. 设计内存分配器](https://leetcode.cn/problems/design-memory-allocator/)



```c++
class Allocator {
public:
    const static int N = 1010;
    
    int st[N], n;
    vector<int> xs[N];
    
    Allocator(int n) {
        this->n = n;
        memset(st, 0, sizeof st);
    }
    
    int allocate(int size, int mID) {
        for (int i = 0; i < n; ++ i ) {
            if (st[i])
                continue;
            int j = i;
            while (j < n && !st[j])
                j ++ ;
            int len = j - i;
            if (len >= size) {
                for (int k = i; k < i + size; ++ k )
                    st[k] = mID;
                return i;
            } else
                i = j - 1;
        }
        return -1;
    }
    
    int free(int mID) {
        int res = 0;
        for (int i = 0; i < n; ++ i )
            if (st[i] == mID)
                st[i] = 0, res ++ ;
        return res;
    }
};

/**
 * Your Allocator object will be instantiated and called as such:
 * Allocator* obj = new Allocator(n);
 * int param_1 = obj->allocate(size,mID);
 * int param_2 = obj->free(mID);
 */
```

### [2503. 矩阵查询可获得的最大分数](https://leetcode.cn/problems/maximum-number-of-points-from-grid-queries/)

经典离线做法

bfs 也可以换成并查集 略

```c++
class Solution {
public:
    // 本质就是按照值域最大值不断扩展联通块(bfs)
    // 求相应的值域最大值下 联通块的大小即可
    // ==> 显然是离线算法
    using PII = pair<int, int>;
    const static int N = 1010, M = 100010;
    
    int n, m;
    
    int st[M];
    
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    int getID(int x, int y) {
        return x * m + y;
    }
    PII getXY(int id) {
        return {id / m, id % m};
    }
    
    vector<int> maxPoints(vector<vector<int>>& grid, vector<int>& queries) {
        n = grid.size(), m = grid[0].size();
        
        vector<PII> xs;
        for (int i = 0; i < queries.size(); ++ i )
            xs.push_back({queries[i], i});
        sort(xs.begin(), xs.end());
        
        vector<int> res(queries.size(), -1);
        
        // 拓展时需要用堆
        priority_queue<PII, vector<PII>, greater<PII>> pq;
        pq.push({grid[0][0], 0});
        st[0] = true;
        
        int cnt = 0;
        for (auto [cap, i] : xs) {
            while (pq.size() && pq.top().first < cap) {
                auto [v, id] = pq.top(); pq.pop();
                auto [x, y] = getXY(id);
                cnt ++ ;
                for (int i = 0; i < 4; ++ i ) {
                    int nx = x + dx[i], ny = y + dy[i];
                    if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                        continue;
                    int nid = getID(nx, ny);
                    if (st[nid])
                        continue;
                    
                    st[nid] = true;
                    pq.push({grid[nx][ny], nid});
                }
            }
            res[i] = cnt;
        }
        return res;
    }
};
```
