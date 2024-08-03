## [比赛链接](https://leetcode.cn/contest/weekly-contest-394/)

>   virtual rank: 91 / 3958
>
>   18  0:30:05  0:01:35  0:05:07  0:14:29  0:30:05


### [3120. 统计特殊字母的数量 I](https://leetcode.cn/problems/count-the-number-of-special-characters-i/)



```c++
class Solution {
public:
    int numberOfSpecialChars(string word) {
        int lower[26], upper[26];
        for (auto x : word)
            if (x >= 'a' && x <= 'z')
                lower[x - 'a'] = 1;
            else
                upper[x - 'A'] = 1;
        
        int res = 0;
        for (int i = 0; i < 26; ++ i )
            if (lower[i] && upper[i])
                res ++ ;
        return res;
    }
};
```


###[3121. 统计特殊字母的数量 II](https://leetcode.cn/problems/count-the-number-of-special-characters-ii/) 



```c++
class Solution {
public:
    int numberOfSpecialChars(string word) {
        int lower[26], upper[26];
        memset(lower, -1, sizeof lower);
        memset(upper, -1, sizeof upper);
        
        int n = word.size();
        for (int i = 0; i < n; ++ i ) {
            char c = word[i];
            if (c >= 'a' && c <= 'z')
                lower[c - 'a'] = i;
        }
        for (int i = n - 1; i >= 0; -- i ) {
            char c = word[i];
            if (c >= 'A' && c <= 'Z')
                upper[c - 'A'] = i;
        }
        
        int res = 0;
        for (int i = 0; i < 26; ++ i )
            if (~lower[i] && ~upper[i] && lower[i] < upper[i])
                res ++ ;
        return res;
    }
};
```

###[3122. 使矩阵满足条件的最少操作次数](https://leetcode.cn/problems/minimum-number-of-operations-to-satisfy-conditions/) 



```c++
class Solution {
public:
    const static int N = 1010, M = 10, INF = 0x3f3f3f3f;
    
    int c[N][M], f[N][M];
    int n, m;
    
    int minimumOperations(vector<vector<int>>& grid) {
        this->n = grid.size(), this->m = grid[0].size();    // 题目是 m*n 的矩阵
        
        memset(c, 0, sizeof c);
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                c[j][grid[i - 1][j - 1]] ++ ;
        
        memset(f, 0x3f, sizeof f);
        for (int j = 0; j < M; ++ j )
            f[1][j] = n - c[1][j];
        
        for (int i = 2; i <= m; ++ i )
            for (int j = 0; j < M; ++ j )
                for (int k = 0; k < M; ++ k )
                    if (j != k) {
                        f[i][j] = min(f[i][j], f[i - 1][k] + n - c[i][j]);
                    }
        
        int res = INF;
        for (int j = 0; j < M; ++ j )
            res = min(res, f[m][j]);
        return res;
    }
};
```

###[3123. 最短路径中的边](https://leetcode.cn/problems/find-edges-in-shortest-paths/) 

标准求【最短路径边】的算法

-   两次 dijkstra 校验每条边左右两侧到起始点的距离和
-   一次 dijkstra + 逆序路径长度判断 (较麻烦 略)

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 5e4 + 10, M = 1e5 + 10, INF = 0x3f3f3f3f;
    
    int h[N], e[M], w[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int d1[N], d2[N];
    bool st[N];
    void dijkstra(int dist[], int s) {
        memset(dist, 0x3f, sizeof 4 * N);
        memset(st, 0, sizeof st);
        priority_queue<PII, vector<PII>, greater<PII>> heap;
        dist[s] = 0; heap.push({0, s});
        
        while (heap.size()) {
            auto [d, u] = heap.top(); heap.pop();
            if (st[u])
                continue;
            st[u] = true;
            
            for (int i = h[u]; ~i; i = ne[i]) {
                int j = e[i], c = w[i];
                if (dist[j] > d + c)
                    heap.push({dist[j] = d + c, j});
            }
        }
    }
    
    vector<bool> findAnswer(int n, vector<vector<int>>& edges) {
        init();
        for (auto & e : edges) {
            int a = e[0], b = e[1], c = e[2];
            add(a, b, c), add(b, a, c);
        }
        
        dijkstra(d1, 0);
        dijkstra(d2, n - 1);
        
        int tot = d1[n - 1];
        vector<bool> res;
        for (auto & e : edges) {
            int a = e[0], b = e[1], c = e[2];
            if (d1[a] + d2[b] + c == tot || d1[b] + d2[a] + c == tot)
                res.push_back(true);
            else
                res.push_back(false);
        }
        return res;
    }
};
```
