## [比赛链接](https://leetcode.cn/contest/weekly-contest-346/)

>   virtual rank:
>
>   91 / 4035      12 0:11:42 0:03:12 0:04:58 0:11:42


### [2696. 删除子串后的字符串最小长度](https://leetcode.cn/problems/minimum-string-length-after-removing-substrings/)



```c++
class Solution {
public:
    int minLength(string s) {
        for (;;) {
            vector<char> xs;
            bool flag = false;
            for (auto c : s) {
                if (c == 'B' && xs.size() && xs.back() == 'A' || 
                    c == 'D' && xs.size() && xs.back() == 'C'
                   ) {
                    xs.pop_back();
                    flag = true;
                } else
                    xs.push_back(c);
            }
            if (!flag)
                break;
            string ns;
            for (auto x : xs)
                ns += x;
            s = ns;
        }
        return s.size();
    }
};
```


### [2697. 字典序最小回文串](https://leetcode.cn/problems/lexicographically-smallest-palindrome/)



```c++
class Solution {
public:
    string makeSmallestPalindrome(string s) {
        int n = s.size();
        for (int i = 0; i < n / 2; ++ i ) {
            int j = n - i - 1;
            if (s[i] == s[j])
                continue;
            s[i] = s[j] = min(s[i], s[j]);
        }
        return s;
    }
};
```

### [2698. 求一个整数的惩罚数](https://leetcode.cn/problems/find-the-punishment-number-of-an-integer/)



```c++
class Solution {
public:
    bool dfs(string & s, int x, int p, int sum) {
        if (p == s.size())
            return sum == x;
        for (int i = p, v = 0; i < s.size(); ++ i ) {
            v = v * 10 + s[i] - '0';
            if (dfs(s, x, i + 1, sum + v))
                return true;
        }
        return false;
    }
    
    bool check(int x) {
        string s = to_string(x * x);
        return dfs(s, x, 0, 0);
    }
    
    int punishmentNumber(int n) {
        int res = 0;
        for (int i = 1; i <= n; ++ i ) {
            if (check(i))
                res += i * i;
        }
        return res;
    }
};
```

### [2699. 修改图中的边权](https://leetcode.cn/problems/modify-graph-edge-weights/) [TAG]

理解细节

```c++
class Solution {
public:
    // 100 个点，最多 1e4 边
    // 思考：修改负权边只会让最短距离变小，如果原图最短距离已经很小显然无解
    // 【联通图 则一定有办法】
    using PII = pair<int, int>;
    const static int N = 110, INF = 0x3f3f3f3f;

    int n, s, t;
    vector<vector<PII>> es;

    vector<vector<int>> modifiedGraphEdges(int n, vector<vector<int>>& edges, int source, int destination, int target) {
        this->n = n, this->s = source, this->t = destination;
        // 预处理边 记录对应的 idx
        this->es = vector<vector<PII>>(n);
        for (int i = 0; i < edges.size(); ++ i ) {
            auto & e = edges[i];
            int a = e[0], b = e[1];
            es[a].push_back({b, i}), es[b].push_back({a, i});
        }

        static int d[2][N];
        memset(d, 0x3f, sizeof d);
        d[0][s] = d[1][s] = 0;
        static bool st[N];
        int diff;

        auto dijkstra = [&](int k) {
            memset(st, 0, sizeof st);
            for (;;) {
                // 朴素 dijkstra
                // 找到当前最短路的点 并更新其邻居的距离
                int x = -1;
                for (int i = 0; i < n; ++ i )
                    if (!st[i] && (x < 0 || d[k][i] < d[k][x]))
                        x = i;
                if (x == t)
                    break;
                st[x] = true;
                for (auto [y, idx] : es[x]) {
                    int w = edges[idx][2];
                    if (w == -1)
                        w = 1;  // -1 改成 1
                    
                    // 如果是第二次 dijkstra
                    if (k == 1 && edges[idx][2] == -1) {
                        // 则在第二次修改 w
                        // 【理解细节】
                        //  对于一个可修改的边，假定将其修改为 W 那么 s->x->y->t 由三部分组成
                        //      1. s->x 的最短路     => d[1][x]
                        //      2. x->y             => W
                        //      3. y->t 的最短路     => d[0][t] - d[0][y]
                        // 【ATTENTION】这个式子只有当前路径会是最短路时才会成立
                        //      但【不在最短路上也不会对最短路产生影响】故可以非常简单的不做判断
                        //      在此前提下，如果要让三部分的和为 target，则新边长即为下式：
                        int tw = diff + d[0][y] - d[1][x];
                        if (tw > w)
                            edges[idx][2] = w = tw;  // ATTENTION
                    }
                    d[k][y] = min(d[k][y], d[k][x] + w);
                }
            }
        };

        dijkstra(0);
        if (d[0][t] > target)   // -1 全改 1 时最短路也超长
            return {};
        diff = target - d[0][t];

        dijkstra(1);
        if (d[1][t] < target)   // ATTENTION 最短路最长也就这样了
            return {};
        
        for (auto & e : edges)
            if (e[2] == -1)
                e[2] = 1;
        return edges;
    }
};
```
