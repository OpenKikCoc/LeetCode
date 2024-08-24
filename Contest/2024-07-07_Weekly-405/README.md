## [比赛链接](https://leetcode.cn/contest/weekly-contest-405/)


### [3210. 找出加密后的字符串](https://leetcode.cn/problems/find-the-encrypted-string/)



```c++
class Solution {
public:
    string getEncryptedString(string s, int k) {
        int n = s.size();
        k %= n;
        string res = s;
        for (int i = 0; i < n; ++ i ) {
            res[i] = s[(i + k) % n];
        }
        return res;
    }
};
```


### [3211. 生成不含相邻零的二进制字符串](https://leetcode.cn/problems/generate-binary-strings-without-adjacent-zeros/)



```c++
class Solution {
public:
    // 不能有超过1个连续0
    
    vector<string> res;
    void dfs(int n, string s) {
        if (n == 0) {
            res.push_back(s);
            return;
        }
        
        if (s.empty() || s.back() != '0')
            dfs(n - 1, s + '0');
        dfs(n - 1, s + '1');
    }
    
    vector<string> validStrings(int n) {
        res.clear();
        dfs(n, "");
        return res;
    }
};
```

### [3212. 统计 X 和 Y 频数相等的子矩阵数量](https://leetcode.cn/problems/count-submatrices-with-equal-frequency-of-x-and-y/)



```c++
class Solution {
public:
    const static int N = 1010;
    
    int sx[N][N], sy[N][N];
    
    int numberOfSubmatrices(vector<vector<char>>& grid) {
        memset(sx, 0, sizeof sx), memset(sy, 0, sizeof sy);
        
        int n = grid.size(), m = grid[0].size();
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                char x = grid[i - 1][j - 1];
                sx[i][j] = sx[i - 1][j] + sx[i][j - 1] - sx[i - 1][j - 1] + (x == 'X');
                sy[i][j] = sy[i - 1][j] + sy[i][j - 1] - sy[i - 1][j - 1] + (x == 'Y');
                if (sx[i][j] && sx[i][j] == sy[i][j])
                    res ++ ;
            }
        return res;
    }
};
```

### [3213. 最小代价构造字符串](https://leetcode.cn/problems/construct-string-with-minimum-cost/) [TAG]



```c++
class Solution {
public:
    // f[i] = 填充target前i个字母的最小cost
    // f[i] = f[j] + cost(j + 1, i); 问题在于这是O(n^2)的
    //  => 维护所有可行的j + string hash
    
    // ATTENTION:
    // 但即使用了字符串哈希，上述做法仍然是 O(n^2) 的
    // 关键在于，枚举的子串 t 的长度，如果压根就不出现在 words 中，那么无需枚举这样的 j，或者说长度。
    // 注意到，设 L 是 words 中所有字符串的长度之和，那么 words 中至多有 O(sqrt(L)) 个长度不同的字符串 => trick
    // （考虑长度和 1+2+3+⋯≤L）
    // 所以我们只需要枚举这 O(sqrt(L)) 个长度，而不是枚举 O(n) 个 j
    
    using ULL = unsigned long long;
    const static int N = 5e4 + 10, P = 131, INF = 0x3f3f3f3f;
    
    ULL h[N], p[N];
    void init(string s) {
        int n = s.size();
        h[0] = 0, p[0] = 1;
        for (int i = 1; i <= n; ++ i )
            h[i] = h[i - 1] * P + s[i - 1], p[i] = p[i - 1] * P;    // ATTENTION P
    }
    ULL get(int l, int r) {
        return h[r] - h[l - 1] * p[r - l + 1];
    }
    
    int f[N];
    map<int, unordered_map<ULL, int>> min_cost; // ATTENTION map<int, unordered_map<...>>
    
    int minimumCost(string target, vector<string>& words, vector<int>& costs) {
        init(target);
        
        {
            int m = words.size();
            for (int i = 0; i < words.size(); ++ i ) {
                auto & w = words[i];
                int len = w.size();
                ULL hash = 0;
                for (int i = 1; i <= len; ++ i )
                    hash = hash * P + w[i - 1];
                if (min_cost[len].count(hash))
                    min_cost[len][hash] = min(min_cost[len][hash], costs[i]);
                else
                    min_cost[len][hash] = costs[i];
            }
        }
        
        int n = target.size();
        memset(f, 0x3f, sizeof f);
        f[0] = 0;
        
        for (int i = 1; i <= n; ++ i ) {
            for (auto & [len, cs] : min_cost) {   // O(sqrt(L)), 注意引用
                if (len > i)
                    break;
                int last = i - len;
                ULL hash = get(last + 1, i);
                if (cs.count(hash))
                    f[i] = min(f[i], f[last] + cs[hash]);
            }
        }
        return f[n] >= INF / 2 ? -1 : f[n];
    }
};
```
