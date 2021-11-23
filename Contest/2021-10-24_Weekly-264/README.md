## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-264/)


### [2047. 句子中的有效单词数](https://leetcode-cn.com/problems/number-of-valid-words-in-a-sentence/)

稍复杂点的模拟 略

```c++
class Solution {
public:
    bool check(string s) {
        int n = s.size();
        {
            for (auto c : s)
                if (isdigit(c))
                    return false;
        }
        {
            int p = -1;
            for (int i = 0; i < n; ++ i )
                if (s[i] == '-') {
                    if (p == -1)
                        p = i;
                    else
                        return false;
                }
            if (p != -1) {
                if (p == 0 || p == n - 1)
                    return false;
                if (!isalpha(s[p - 1]) || !isalpha(s[p + 1]))
                    return false;
            }
        }
        {
            int p = -1;
            for (int i = 0; i < n; ++ i )
                if (s[i] == '!' || s[i] == '.' || s[i] == ',') {
                    if (p == -1)
                        p = i;
                    else
                        return false;
                }
            if (p != -1) {
                if (p != n - 1)
                    return false;
            }
        }
        return true;
    }
    
    int countValidWords(string sentence) {
        int n = sentence.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            if (sentence[i] != ' ') {
                int j = i;
                while (j < n && sentence[j] != ' ')
                    j ++ ;
                if (check(sentence.substr(i, j - i)))
                    res ++ ;
                i = j - 1;
            }
        return res;
    }
};
```


### [2048. 下一个更大的数值平衡数](https://leetcode-cn.com/problems/next-greater-numerically-balanced-number/)

注意 N 取值即可

赛榜有直接暴力从 n 开始遍历的解法也能过 略

```c++
class Solution {
public:
    const static int N = 7;
    
    int nextBeautifulNumber(int n) {
        vector<int> nums;
        for (int i = 0; i < 1 << N; ++ i ) {
            vector<int> t;
            for (int j = 0; j < N; ++ j )
                if (i >> j & 1)
                    for (int k = 0; k < j + 1; ++ k )
                        t.push_back(j + 1);
            
            if (t.size() > N)
                continue;
            do {
                int x = 0;
                for (auto v : t)
                    x = x * 10 + v;
                nums.push_back(x);
            } while (next_permutation(t.begin(), t.end()));
        }
        sort(nums.begin(), nums.end());
        nums.erase(unique(nums.begin(), nums.end()), nums.end());
        return *upper_bound(nums.begin(), nums.end(), n);
    }
};
```

### [2049. 统计最高分的节点数目](https://leetcode-cn.com/problems/count-nodes-with-the-highest-score/)

经典树形DP 略

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10, M = 1e5 + 10;    // M = 1e5
    
    int n;
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int res;
    int sz[N];
    LL val[N];
    void dfs(int u) {
        sz[u] = 0;
        val[u] = 1;
        
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            dfs(j);
            
            sz[u] += sz[j];
            val[u] *= sz[j];
        }
        sz[u] ++ ;
        // case 非空才加
        if (n - sz[u])
            val[u] *= (n - sz[u]);
    }
    
    int countHighestScoreNodes(vector<int>& parents) {
        init();
        this->n = parents.size();
        for (int i = 1; i < n; ++ i )
            add(parents[i], i);
        
        dfs(0);
        
        int p = -1, c = 0;
        for (int i = 0; i < n; ++ i )
            if (p == -1 || val[i] > val[p])
                p = i, c = 1;
            else if (val[i] == val[p])
                c ++ ;
        
        return c;
    }
};
```

### [2050. 并行课程 III](https://leetcode-cn.com/problems/parallel-courses-iii/)

经典求拓扑序再根据拓扑序计算值 略

```c++
class Solution {
public:
    const static int N = 5e4 + 10, M = 5e4 + 10;
    
    int n;
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int din[N];
    vector<int> topology() {
        vector<int> q(n);
        int hh = 0, tt = -1;
        for (int i = 1; i <= n; ++ i )
            if (!din[i])
                q[ ++ tt] = i;
        
        while (hh <= tt) {
            int t = q[hh ++ ];
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                if ( -- din[j] == 0)
                    q[ ++ tt] = j;
            }
        }
        
        return q;
    }
    
    int minimumTime(int n, vector<vector<int>>& relations, vector<int>& time) {
        this->n = n;
        init();
        
        memset(din, 0, sizeof din);
        for (auto & r : relations)
            add(r[0], r[1]), din[r[1]] ++ ;
        
        auto q = topology();
        vector<int> f(n);
        int res = 0;
        for (int i = n - 1; i >= 0; -- i ) {
            int u = q[i], t = 0;
            for (int j = h[u]; ~j; j = ne[j])
                t = max(t, f[e[j] - 1]);
            f[u - 1] = t + time[u - 1];
            res = max(res, f[u - 1]);
        }
        return res;
    }
};
```
