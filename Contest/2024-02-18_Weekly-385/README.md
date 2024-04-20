## [比赛链接](https://leetcode.cn/contest/weekly-contest-385/)


### [3042. 统计前后缀下标对 I](https://leetcode.cn/problems/count-prefix-and-suffix-pairs-i/)

同 4

```c++

```


### [3043. 最长公共前缀的长度](https://leetcode.cn/problems/find-the-length-of-the-longest-common-prefix/)

简单 trie 统计即可

hash 做法也能过 略

```c++
// 5e4 * 8 = 4e5
const static int N = 4e5 + 10;

int son[N][10], idx;
bool is_end[N];

void init() {
    memset(son, 0, sizeof son);
    idx = 0;
    memset(is_end, 0, sizeof is_end);
}

void insert(string & s) {
    int p = 0;
    for (auto c : s) {
        int u = c - '0';
        if (!son[p][u])
            son[p][u] = ++ idx;
        p = son[p][u];
    }
    is_end[p] = true;
}

int query(string & s) {
    int p = 0, ret = 0;
    for (auto c : s) {
        int u = c - '0';
        if (!son[p][u])
            break;
        p = son[p][u], ret ++ ;
    }
    return ret;
}

class Solution {
public:
    int longestCommonPrefix(vector<int>& arr1, vector<int>& arr2) {
        init();
        for (auto & x : arr1) {
            string s = to_string(x);
            insert(s);
        }
        
        int res = 0;
        for (auto & x : arr2) {
            string s = to_string(x);
            res = max(res, query(s));
        }
        return res;
    }
};
```

### [3044. 出现频率最高的质数](https://leetcode.cn/problems/most-frequent-prime/)

简单模拟

```c++
class Solution {
public:
    // 题目限制最多只有 6*6
    // 理论上应该可以直接暴力，当然因为方向存在依赖性，可以分方向继承前面的结果进而优化计算过程
    
    vector<vector<int>> g;
    int n, m;
    
    int dx[8] = {-1, -1, -1, 0, 1, 1, 1, 0}, dy[8] = {-1, 0, 1, 1, 1, 0, -1, -1};
    unordered_map<int, int> h;
    
    void go(int i, int j, int k) {
        int x = i, y = j, v = g[i][j];
        h[v] ++ ;
        for (;;) {
            x = x + dx[k], y = y + dy[k];
            if (x < 0 || x >= n || y < 0 || y >= m)
                break;
            v = v * 10 + g[x][y];
            h[v] ++ ;
        }
    }
    
    bool invalid(int x) {
        if (x <= 10)
            return true;
        for (int i = 2; i * i <= x; ++ i )
            if (x % i == 0)
                return true;
        return false;
    }
    
    int mostFrequentPrime(vector<vector<int>>& mat) {
        this->g = mat;
        this->n = g.size(), m = g[0].size();
        
        h.clear();
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                for (int k = 0; k < 8; ++ k )
                    go(i, j, k);
        
        int res = -1, p = 0;
        for (auto [k, v] : h) {
            if (invalid(k))
                continue;
            if (v > p || v == p && k > res)
                res = k, p = v;
        }
        return res;
    }
};
```

### [3045. 统计前后缀下标对 II](https://leetcode.cn/problems/count-prefix-and-suffix-pairs-ii/) [TAG]

题意分析显然需要结合离线 trie，结合扩展 kmp 进行快速校验

较直观的思路是：逆序遍历，并将当前串的所有前后缀插入 trie 以供后续遍历到的串做全匹配；本质是枚举当前串来计算能匹配多少个之前出现过的前后缀【由于生成前后缀的插入复杂度 TLE】

```c++
// TLE
//
// 总长度不超过 5e5
//  与 leetcode 前面有道题类似，本质是把后缀也插入到 trie
//  => 还不够，需要对于当前串求出所有的公共前后缀，然后插入公共前后缀...

using LL = long long;
const static int N = 5e5 + 10;

vector<int> z_func(string & s) {
    int n = s.size();
    vector<int> z(n);
    for (int i = 1, l = 0, r = 0; i < n; ++ i ) {
        if (i <= r && z[i - l] < r - i + 1)
            z[i] = z[i - l];
        else {
            z[i] = max(0, r - i + 1);
            while (i + z[i] < n && s[z[i]] == s[i + z[i]])
                z[i] ++ ;
        }
        if (i + z[i] - 1 > r)
            l = i, r = i + z[i] - 1;
    }
    z[0] = n;
    return z;
}

int son[N][26], idx;
int cnt[N];

void init() {
    memset(son, 0, sizeof son);
    idx = 0;
    memset(cnt, 0, sizeof cnt);
}

void insert(string & s) {
    int p = 0;
    for (auto c : s) {
        int u = c - 'a';
        if (!son[p][u])
            son[p][u] = ++ idx;
        p = son[p][u];
    }
    cnt[p] ++ ;     // ATTENTION cnt 操作时机
}

LL query(string & s) {
    int p = 0;
    for (auto c : s) {
        int u = c - 'a';
        if (!son[p][u])
            return 0;
        p = son[p][u];
    }
    return cnt[p];
}

class Solution {
public:
    long long countPrefixSuffixPairs(vector<string>& words) {
        init();
        
        int n = words.size();
        LL res = 0;
        for (int i = n - 1; i >= 0; -- i ) {
            auto & w = words[i];
            res += query(w);
            
            auto z = z_func(w);
            for (int i = 0; i < w.size(); ++ i )
                if (i + z[i] == w.size()) {
                    string t = w.substr(i);
                    insert(t);
                }
        }
        return res;
    }
};
```

其实可以换个思路，枚举当前串看前面有多少串可以作为当前串的前后缀【无需插入前后缀，降低复杂度】

```c++
// 总长度不超过 5e5
//  与 leetcode 前面有道题类似，本质是把后缀也插入到 trie
//  => 还不够，需要对于当前串求出所有的公共前后缀，然后插入公共前后缀...

using LL = long long;
const static int N = 5e5 + 10;

vector<int> z_func(string & s) {
    //...
}

int son[N][26], idx;
int cnt[N];

void init() {...}

void insert(string & s) {
    int p = 0;
    for (auto c : s) {
        int u = c - 'a';
        if (!son[p][u])
            son[p][u] = ++ idx;
        p = son[p][u];
    }
    cnt[p] ++ ;     // ATTENTION cnt 操作时机
}

LL query(string & s) {
    auto z = z_func(s);
    int p = 0, n = z.size();
    LL ret = 0;
    for (int i = 0; i < n; ++ i ) {
        auto c = s[i];
        int u = c - 'a';
        if (!son[p][u])
            break;  // ATTENTION
        p = son[p][u];
        
        // ATTENTION 在这里追加统计逻辑
        if (z[n - 1 - i] == i + 1)  // 是后缀
            ret += cnt[p];
    }
    return ret;
}

class Solution {
public:
    
    long long countPrefixSuffixPairs(vector<string>& words) {
        init();
        
        int n = words.size();
        LL res = 0;
        // ATTENTION: 正序，在插入的同时计算【前置计算过程】
        for (int i = 0; i < n; ++ i ) {
            auto & w = words[i];
            res += query(w);
            insert(w);   // 本质也可以和 query 结合
        }
        return res;
    }
};
```

更进一步，可以在插入同时统计

```c++
// 总长度不超过 5e5
//  与 leetcode 前面有道题类似，本质是把后缀也插入到 trie
//  => 还不够，需要对于当前串求出所有的公共前后缀，然后插入公共前后缀...

using LL = long long;
const static int N = 5e5 + 10;

vector<int> z_func(string & s) {
    // ...
}

int son[N][26], idx;
int cnt[N];

void init() {...}

LL insert(string & s) {
    auto z = z_func(s);
    int p = 0, n = z.size();
    LL ret = 0;
    for (int i = 0; i < n; ++ i ) {
        auto c = s[i];
        int u = c - 'a';
        if (!son[p][u])
            son[p][u] = ++ idx;
        p = son[p][u];
        
        // ATTENTION 在这里追加统计逻辑
        if (z[n - 1 - i] == i + 1)  // 是后缀
            ret += cnt[p];
    }
    cnt[p] ++ ;     // ATTENTION cnt 操作时机
    return ret;
}

class Solution {
public:
    
    long long countPrefixSuffixPairs(vector<string>& words) {
        init();
        LL res = 0;
        // ATTENTION: 正序，在插入的同时计算【前置计算过程】
        for (auto & w : words)
            res += insert(w);   // inert 和 query 结合
        return res;
    }
};
```

