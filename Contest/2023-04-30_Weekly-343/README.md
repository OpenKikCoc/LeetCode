## [比赛链接](https://leetcode.cn/contest/weekly-contest-343/)


### [6341. 保龄球游戏的获胜者](https://leetcode.cn/problems/determine-the-winner-of-a-bowling-game/)



```c++
class Solution {
public:
    int get(vector<int> & xs) {
        int ret = 0, n = xs.size();
        // 如果前两轮击中了 10 个瓶子 则2x...
        for (int i = 0; i < n; ++ i ) {
            int x = xs[i];
            if (i > 0 && xs[i - 1] == 10 || i > 1 && xs[i - 2] == 10)
                x += x;
            ret += x;
        }
        return ret;
    }
    
    int isWinner(vector<int>& player1, vector<int>& player2) {
        int a = get(player1), b = get(player2);
        if (a > b)
            return 1;
        else if (a < b)
            return 2;
        return 0;
    }
};
```


### [6342. 找出叠涂元素](https://leetcode.cn/problems/first-completely-painted-row-or-column/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int r[N], c[N];
    int f[N], g[N];
    
    int firstCompleteIndex(vector<int>& arr, vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size();
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                int x = mat[i][j];
                r[x] = i, c[x] = j;
            }
        
        memset(f, 0, sizeof f), memset(g, 0, sizeof g);
        int c1 = 0, c2 = 0;
        for (int i = 0; i < arr.size(); ++ i ) {
            int x = arr[i];
            f[r[x]] ++ , g[c[x]] ++ ;
            // 某一行或某一列上 => 某一行【和】某一列上都被涂色
            if (f[r[x]] == m)
                c1 = 1;
            if (g[c[x]] == n)
                c2 = 1;
            if (c1 || c2)
                return i;
        }
        return -1;
    }
};
```

### [6343. 前往目标的最小代价](https://leetcode.cn/problems/minimum-cost-of-a-path-with-special-roads/)



```c++
class Solution {
public:
    // 不超过 500 个点
    // 最终距离不超过 2e5
    using PII = pair<int, int>;
    const static int N = 510;
    
    vector<PII> xs;
    int find(PII x) {
        return lower_bound(xs.begin(), xs.end(), x) - xs.begin();
    }
    int g[N][N];
    
    int minimumCost(vector<int>& start, vector<int>& target, vector<vector<int>>& specialRoads) {
        // 考虑: 先离散化再建立最短路
        xs.push_back({start[0], start[1]}), xs.push_back({target[0], target[1]});
        int sz = specialRoads.size();
        for (int i = 0; i < sz; ++ i )
            xs.push_back({specialRoads[i][0], specialRoads[i][1]}), xs.push_back({specialRoads[i][2], specialRoads[i][3]});
        sort(xs.begin(), xs.end());
        xs.erase(unique(xs.begin(), xs.end()), xs.end());
        
        int n = xs.size();
        int s = -1, t = -1;
        for (int i = 0; i < n; ++ i ) {
            auto & x = xs[i];
            if (x.first == start[0] && x.second == start[1])
                s = i;
            if (x.first == target[0] && x.second == target[1])
                t = i;
        }
        
        memset(g, 0x3f, sizeof g);
        for (int i = 0; i < n; ++ i )
            g[i][i] = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < i; ++ j ) {
                auto & a = xs[i];
                auto & b = xs[j];
                g[i][j] = g[j][i] = min(g[i][j], abs(a.first - b.first) + abs(a.second - b.second));
            }
        for (auto & r : specialRoads) {
            int i = find({r[0], r[1]}), j = find({r[2], r[3]});
            // g[i][j] = g[j][i] = min(g[i][j], r[4]);
            // .......... tmd 竟然是单向路径
            g[i][j] = min(g[i][j], r[4]);
        }
        for (int k = 0; k < n; ++ k )
            for (int i = 0; i < n; ++ i )
                for (int j = 0; j < n; ++ j )
                    g[i][j] = min(g[i][j], g[i][k] + g[k][j]);
        
        return g[s][t];
    }
};
```

### [6344. 字典序最小的美丽字符串 ](https://leetcode.cn/problems/lexicographically-smallest-beautiful-string/) [TAG]



```c++
class Solution {
public:
    // 有个重要条件: s 已经是一个美丽字符串了
    // 不包含长度为2的任何回文子字符串
    
    string smallestBeautifulString(string s, int k) {
        int n = s.size(), p = -1;
        for (int i = n - 1; i >= 0 && p == -1; -- i ) {
            // s[i] = 'a' + ((s[i] - 'a' + 1) % k); => WA
            
            // ATTENTION 如果一个位置不能被成功修改【应该往前走尝试改前面的 而不是一直呆在这个位置...】
            for (int j = s[i] + 1; j < 'a' + k && p == -1; ++ j ) {     // 比s[i]大的前k个
                if (i && j == s[i - 1] || i > 1 && j == s[i - 2])
                    continue;
                s[i] = j;
                p = i;
            }
        }
        // 存在一种情况 zzzz 这样加完之后需要再填充一个 显然不合法
        if (p == -1)
            return "";
        
        for (int i = p + 1; i < n; ++ i )
            for (int j = 'a'; j < 'a' + k; ++ j ) {          // 前k个
                if (i && j == s[i - 1] || i > 1 && j == s[i - 2])
                    continue;
                s[i] = j;
                break;
            }
              
        return s;
    }
};
```

CF 做法 TLE

```c++
class Solution {
public:
    // CF 做法
    string smallestBeautifulString(string s, int k) {
        int n = s.size();
        for (;;) {
            int p = -1;
            for (int i = n - 1; i >= 0; -- i ) {
                s[i] = 'a' + ((s[i] - 'a' + 1) % k);
                
                // = 'a' 的情况需要继续往前面操作
                if (s[i] != 'a') {
                    p = i;
                    break;
                }
            }
            if (p == -1)
                return "";
            
            bool fail = false;
            int i;
            for (i = p; i < n; ++ i ) {
                if (i > 0 && s[i] == s[i - 1])
                    fail = true;
                if (i > 1 && s[i] == s[i - 2])
                    fail = true;
                if (fail)
                    break;
            }
            if (fail) {
                // 方便下次直接从更前面修改
                for (int j = i + 1; j < n; ++ j )
                    s[j] = 'a' + k - 1;
                continue;
            }
            return s;
        }
        return "";
    }
};
```

