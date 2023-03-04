## [比赛链接](https://leetcode.cn/contest/weekly-contest-334/)

>   virtual rank: 128 / 5501


### [2574. 左右元素和的差值](https://leetcode.cn/problems/left-and-right-sum-differences/)



```c++
class Solution {
public:
    const static int N = 1010;
    
    int l[N], r[N];
    
    vector<int> leftRigthDifference(vector<int>& nums) {
        int n = nums.size();
        for (int i = 1; i <= n; ++ i )
            l[i] = l[i - 1] + nums[i - 1];
        for (int i = n; i >= 1; -- i )
            r[i] = r[i + 1] + nums[i - 1];
        
        vector<int> res;
        for (int i = 1; i <= n; ++ i )
            res.push_back(abs(l[i] - r[i]));
        return res;
    }
};
```


### [2575. 找出字符串的可整除数组](https://leetcode.cn/problems/find-the-divisibility-array-of-a-string/)

trick

```c++
class Solution {
public:
    // 长度很长 显然需要trick处理
    // 考虑如果可以被整除 直接取0即可
    using LL = long long;
    
    vector<int> divisibilityArray(string word, int m) {
        int n = word.size();
        vector<int> res(n, 0);
        LL x = 0;
        for (int i = 0; i < n; ++ i ) {
            x = x * 10 + word[i] - '0';
            x %= m;
            if (x % m == 0)
                res[i] = 1, x = 0;
        }
        return res;
    }
};
```

### [2576. 求出最多标记下标](https://leetcode.cn/problems/find-the-maximum-number-of-marked-indices/)



```c++
class Solution {
public:
    vector<int> a;
    int n;
    
    bool check(int m) {
        if (m * 2 > n)
            return false;
        for (int i = 0, j = n - m; i < m; ++ i , ++ j )
            if (a[i] * 2 > a[j])
                return false;
        return true;
    }
    
    int maxNumOfMarkedIndices(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        this->a = nums, this->n = a.size();
        
        int l = 0, r = 1e5; // “一对”的数量, 找到第一个不行的数
        while (l < r) {
            int m = l + (r - l) / 2;
            if (check(m))
                l = m + 1;
            else
                r = m;
        }
        return max(l - 1, 0) * 2;
    }
};
```

### [2577. 在网格图中访问一个格子的最少时间](https://leetcode.cn/problems/minimum-time-to-visit-a-cell-in-a-grid/) [TAG]

特殊逻辑的 dijkstra 即可

```c++
class Solution {
public:
    // 显然 需要按格子的值的顺序排序（思考 应该可以排序后使用并查集维护联通性质）
    // 唯一麻烦的点在于 【不能停留在格子上】
    //   考虑如果点周围有合法点，则可以来回两次移动（不太好维护 直接换成一个队列存储可行位置？）==> 【ATTENTION dijkstra】
    //
    // 思考：啥时候无解？当且仅当第一步没法走的时候无解 否则其他情况都可以来回踱步来最终走到目的地
    // 思考：来回踱步有啥特征？对于每一个位置 处于它的时刻 mod2 总是不变的
    //      => 具体来说，对于 [x, y]
    //          x + y 的奇偶性相关
    
    using PII = pair<int, int>;
    using TIII = tuple<int, int, int>;
    
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    
    vector<vector<int>> g;
    int n, m;
    
    vector<vector<int>> st;
    
    int minimumTime(vector<vector<int>>& grid) {
        if (grid[1][0] > 1 && grid[0][1] > 1)
            return -1;
        // 后续能够保证一定有解
        
        this->g = grid, this->n = g.size(), this->m = g[0].size();
        // 预处理一下 每个位置所要求的时间
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (((i + j) & 1) ^ (g[i][j] & 1)) {    // ATTENTION &1 别写岔了
                    g[i][j] ++ ;
                }
        
        // 考虑 bfs 存储已经到达的位置和到达该位置的最早时间
        st = vector<vector<int>>(n, vector<int>(m, 1e9));
        
        priority_queue<TIII, vector<TIII>, greater<TIII>> q;
        q.push({0, 0, 0});
        while (!q.empty()) {
            auto [t, x, y] = q.top(); q.pop();
            if (st[x][y] <= 1e8)
                continue;
            st[x][y] = t;
            
            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                    continue;
                
                // 如果这个点现在到不了 也可以提前加入但是要追加时间
                int nt = max(t + 1, g[nx][ny]);
                // if (nt > st[nx][ny])
                //     continue;
                
                q.push({nt, nx, ny});
            }
        }
        
        return st[n - 1][m - 1];
    }
};
```
