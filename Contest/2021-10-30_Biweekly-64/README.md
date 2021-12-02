## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-64/)


### [2053. 数组中第 K 个独一无二的字符串](https://leetcode-cn.com/problems/kth-distinct-string-in-an-array/)

扫一遍即可

```c++
class Solution {
public:
    string kthDistinct(vector<string>& arr, int k) {
        unordered_map<string, int> hash;
        for (auto s : arr)
            hash[s] ++ ;
        for (auto s : arr)
            if (hash[s] == 1) {
                k -- ;
                if (k == 0)
                    return s;
            }
        return "";
    }
};
```


### [2054. 两个最好的不重叠活动](https://leetcode-cn.com/problems/two-best-non-overlapping-events/)

普适思路：离散化 + 分别统计左右侧

```c++
class Solution {
public:
    vector<int> xs;
    
    int find(int x) {
        return lower_bound(xs.begin(), xs.end(), x) - xs.begin();
    }
    
    int maxTwoEvents(vector<vector<int>>& events) {
        for (auto & e : events)
            xs.push_back(e[0]), xs.push_back(e[1]);
        sort(xs.begin(), xs.end());
        xs.erase(unique(xs.begin(), xs.end()), xs.end());
        
        int n = xs.size(), m = events.size();
        
        vector<int> l(n), r(n);
        {
            sort(events.begin(), events.end(), [](const vector<int> & a, const vector<int> & b) {
                return a[1] < b[1];
            });
            for (int i = 0, p = 0; i < n; ++ i ) {
                int ed = xs[i];
                if (i)
                    l[i] = l[i - 1];    // 继承左侧
                while (p < m && events[p][1] <= ed)
                    l[i] = max(l[i], events[p][2]), p ++ ;
            }
        }
        {
            sort(events.begin(), events.end(), [](const vector<int> & a, const vector<int> & b) {
                return a[0] > b[0];
            });
            for (int i = n - 1, p = 0; i >= 0; -- i ) {
                int st = xs[i];
                if (i < n - 1)
                    r[i] = r[i + 1];    // 继承右侧
                while (p < m && events[p][0] >= st)
                    r[i] = max(r[i], events[p][2]), p ++ ;
            }
        }
        
        int res = 0;
        for (int i = 0; i < n - 1; ++ i )
            res = max(res, l[i] + r[i + 1]);
        res = max(res, l[n - 1]);   // 1个
        return res;
    }
};
```

yxc 二分

```c++
class Solution {
public:
    int maxTwoEvents(vector<vector<int>>& q) {
        int n = q.size();
        vector<int> p(n);
        for (int i = 0; i < n; i ++ ) p[i] = i;
        sort(p.begin(), p.end(), [&](int a, int b) {
            return q[a][1] < q[b][1];
        });
        vector<int> f(n);
        f[0] = q[p[0]][2];
        for (int i = 1; i < n; i ++ )
            f[i] = max(f[i - 1], q[p[i]][2]);
        
        int res = 0;
        for (int i = 0; i < n; i ++ ) {
            int l = 0, r = n - 1;
            while (l < r) {
                int mid = l + r + 1 >> 1;
                if (q[p[mid]][1] < q[i][0]) l = mid;
                else r = mid - 1;
            }
            int s = q[i][2];
            if (q[p[r]][1] < q[i][0]) s += f[r];
            res = max(res, s);
        }
        
        return res;
    }
};
```



### [2055. 蜡烛之间的盘子](https://leetcode-cn.com/problems/plates-between-candles/)

思路较显然 略

```c++
class Solution {
public:
    // 显然在查询区间 [l, r] 内部找到第一对最外侧的蜡烛 中间所有出现过的盘子都合法
    // 1. 记录每个位置 左侧/右侧 第一个蜡烛的位置
    // 2. 统计区间盘子数量
    
    vector<int> platesBetweenCandles(string s, vector<vector<int>>& queries) {
        int n = s.size();
        vector<int> l(n + 1), r(n + 1), sum(n + 1);
        {
            for (int i = 1, last = 0; i <= n; ++ i ) {
                if (s[i - 1] == '|')
                    last = i;
                l[i] = last;
            }
            for (int i = n, last = n + 1; i >= 1; -- i ) {
                if (s[i - 1] == '|')
                    last = i;
                r[i] = last;
            }
        }
        
        for (int i = 1; i <= n; ++ i )
            sum[i] = sum[i - 1] + (s[i - 1] == '*');
        
        vector<int> res;
        for (auto & q : queries) {
            int lx = q[0] + 1, rx = q[1] + 1;
            lx = r[lx], rx = l[rx];
            if (lx < rx) 
                res.push_back(sum[rx] - sum[lx]);
            else
                res.push_back(0);
        }
        return res;
    }
};
```

### [2056. 棋盘上有效移动组合的数目](https://leetcode-cn.com/problems/number-of-valid-move-combinations-on-chessboard/) [TAG]

重点在于理解题意

爆搜即可

**值得学习的是简洁优雅的代码实现方式**

```c++
class Solution {
public:
    int n;
    vector<string> pc;
    vector<vector<int>> pt;
    
    int dx[8] = {-1, -1, 0, 1, 1, 1, 0, -1};    // trick
    int dy[8] = {0, 1, 1, 1, 0, -1, -1, -1};
    
    vector<vector<int>> path;
    int res = 0;
    int p[5][2];
    
    bool check() {
        // 静态数组单独存 加速访问
        for (int i = 0; i < n; ++ i )
            p[i][0] = pt[i][0], p[i][1] = pt[i][1];
        
        // 所有可能的时间
        for (int i = 1; ; ++ i ) {
            // ATTENTION: flag 是否有棋子没有走到目的地
            // 题意：【每一秒，每个棋子都沿着它们选择的方向往前移动 `一步` ，直到它们到达目标位置。】
            bool flag = false;
            for (int j = 0; j < n; ++ j ) {
                int d = path[j][0], t = path[j][1];
                // ATTENTION: <= 当前棋子还可以走
                if (i <= t) {
                    flag = true;
                    p[j][0] += dx[d], p[j][1] += dy[d];
                }
            }
            if (!flag)
                break;
            
            for (int j = 0; j < n; ++ j )
                for (int k = j + 1; k < n; ++ k )
                    if (p[j][0] == p[k][0] && p[j][1] == p[k][1])
                        return false;
        }
        return true;
    }
    
    void dfs(int u) {
        if (u == n) {
            if (check())
                res ++ ;
            return;
        }
        
        // 不动 方向0 距离0
        path.push_back({0, 0});
        dfs(u + 1);
        path.pop_back();
        
        // 方向
        for (int i = 0; i < 8; ++ i ) {
            string & s = pc[u];
            // trick
            if (s == "rook" && i % 2)
                continue;
            if (s == "bishop" && i % 2 == 0)
                continue;
            
            // 起始位置
            int x = pt[u][0], y = pt[u][1];
            // 有效步数
            for (int j = 1; ; ++ j ) {
                x += dx[i], y += dy[i];
                if (x < 1 || x > 8 || y < 1 || y > 8)
                    break;
                path.push_back({i, j});
                dfs(u + 1);
                path.pop_back();
            }
        }
    }
    
    int countCombinations(vector<string>& pieces, vector<vector<int>>& positions) {
        pc = pieces, pt = positions;
        n = pc.size();
        dfs(0);
        return res;
    }
};
```
