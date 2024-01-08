## [比赛链接](https://leetcode.cn/contest/weekly-contest-377/)

>   virtual rank: 216 / 3148 12
>   0:48:57 0:01:32 0:24:34  3 0:33:57


### [2974. 最小数字游戏](https://leetcode.cn/problems/minimum-number-game/)



```c++
class Solution {
public:
    vector<int> numberGame(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        for (int i = 0; i < n; i += 2)
            swap(nums[i], nums[i + 1]);
        return nums;
    }
};
```


### [2975. 移除栅栏得到的正方形田地的最大面积](https://leetcode.cn/problems/maximum-square-area-by-removing-fences-from-a-field/)



```c++
class Solution {
public:
    // 类似 2943. 最大化网格图中正方形空洞的面积
    // https://leetcode.cn/problems/maximize-area-of-square-hole-in-grid/description/
    using LL = long long;
    const int MOD = 1e9 + 7;
    
    vector<int> get(vector<int> xs) {
        vector<int> r;
        int n = xs.size();
        sort(xs.begin(), xs.end());
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < i; ++ j )
                r.push_back(xs[i] - xs[j]);
        sort(r.begin(), r.end());
        r.erase(unique(r.begin(), r.end()), r.end());
        return r;
    }
    
    int maximizeSquareArea(int m, int n, vector<int>& hs, vector<int>& vs) {
        vector<int> x, y;
        {
            hs.push_back(1), hs.push_back(m);
            x = get(hs);
        }
        {
            vs.push_back(1), vs.push_back(n);
            y = get(vs);
        }
        int w = -1;
        
        // TLE: 632 / 648
        /*
        for (auto v : x)
            if (y.find(v) != y.end())
                w = max(w, v);
        */
        {
            // 双指针便利 降低复杂度
            for (int i = x.size() - 1, j = y.size() - 1; i >= 0 && j >= 0; -- i ) {
                while (j >= 0 && y[j] > x[i])
                    j -- ;
                if (j >= 0 && y[j] == x[i]) {
                    // cout << " i = " << i << " j = " << j << " w = " << ys[j] << " will break " << endl;
                    w = y[j];
                    break;
                }
            }
        }
        
        if (w == -1)
            return -1;
        return (LL)w * w % MOD;
    }
};
```

### [2976. 转换字符串的最小成本 I](https://leetcode.cn/problems/minimum-cost-to-convert-string-i/)



```c++
class Solution {
public:
    using LL = long long;
    const static int K = 26, INF = 0x3f3f3f3f;
    
    int w[K][K];
    
    long long minimumCost(string source, string target, vector<char>& original, vector<char>& changed, vector<int>& cost) {
        memset(w, 0x3f, sizeof w);
        {
            int m = cost.size();
            for (int i = 0; i < m; ++ i ) {
                int a = original[i] - 'a', b = changed[i] - 'a', c = cost[i];
                w[a][b] = min(w[a][b], c);
            }
            
            for (int i = 0; i < K; ++ i )
                w[i][i] = 0;
            for (int k = 0; k < K; ++ k )
                for (int i = 0; i < K; ++ i )
                    for (int j = 0; j < K; ++ j )
                        w[i][j] = min(w[i][j], w[i][k] + w[k][j]);
        }
        
        LL res = 0;
        for (int i = 0; i < source.size(); ++ i ) {
            int t = w[source[i] - 'a'][target[i] - 'a'];
            if (t > INF / 2)
                return -1;
            res += t;
        }
        return res;
    }
};
```

### [2977. 转换字符串的最小成本 II](https://leetcode.cn/problems/minimum-cost-to-convert-string-ii/) [TAG]

Trie + DP

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 2e5 + 10, M = 26, K = 2e3 + 10;  // trie树节点上限: 1000 * 100 * 2(两个串) = 2e5
    const static LL INF = 1e16;

    int son[N][M], idx, id;
    unordered_map<string, int> hash;
    unordered_map<int, int> mem;

    void init() {
        memset(son, 0, sizeof son);
        idx = 0, id = 0;
        hash.clear(), mem.clear();
    }
    void insert(string & s) {
        if (hash.count(s))
            return;
        int p = 0;
        for (auto c : s) {
            int u = c - 'a';
            if (!son[p][u])
                son[p][u] = ++ idx ;
            p = son[p][u];
        }
        hash[s] = ++ id ;   // 从 1 开始
        mem[p] = id;        // 顺便记录树节点与对应值
    }

    LL w[K][K], f[K / 2];

    long long minimumCost(string source, string target, vector<string>& original, vector<string>& changed, vector<int>& cost) {
        init();

        {
            // 初始化 w
            memset(w, 0x3f, sizeof w);
            for (int i = 0; i < K; ++ i )
                w[i][i] = 0;
            for (int i = 0; i < original.size(); ++ i ) {
                string a = original[i], b = changed[i];
                // 插入 trie 同时记录离散化
                insert(a), insert(b);
                int x = hash[a], y = hash[b];
                w[x][y] = min(w[x][y], (LL)cost[i]);
            }

            // floyd
            for (int k = 1; k <= id; ++ k )
                for (int i = 1; i <= id; ++ i )
                    for (int j = 1; j <= id; ++ j )
                        w[i][j] = min(w[i][j], w[i][k] + w[k][j]);
        }

        int n = source.size();
        f[n] = 0;   // 边界值
        for (int i = n - 1; i >= 0; -- i ) {
            f[i] = INF;
            
            if (source[i] == target[i])
                f[i] = f[i + 1];

            // 从当前位置往后 找到可行串与对应消耗
            for (int j = i, p1 = 0, p2 = 0; j < n; ++ j ) {
                int u1 = source[j] - 'a', u2 = target[j] - 'a';
                p1 = son[p1][u1], p2 = son[p2][u2];
                if (p1 == 0 || p2 == 0)
                    break;
                // 如果存在两个对应的串
                if (mem[p1] && mem[p2])
                    // ATTENTION
                    f[i] = min(f[i], f[j + 1] + w[mem[p1]][mem[p2]]);
            }
        }

        if (f[0] >= INF / 2)
            return -1;
        return f[0];
    }
};
```
