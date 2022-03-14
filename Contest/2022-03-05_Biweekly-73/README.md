## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-73/)


### [2190. 数组中紧跟 key 之后出现最频繁的数字](https://leetcode-cn.com/problems/most-frequent-number-following-key-in-an-array/)

略

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    int mostFrequent(vector<int>& nums, int key) {
        unordered_map<int, int> hash;
        int n = nums.size();
        for (int i = 0; i < n - 1; ++ i )
            if (nums[i] == key)
                hash[nums[i + 1]] ++ ;
        
        vector<PII> ve;
        for (auto [k, v] : hash)
            ve.push_back({-v, k});
        sort(ve.begin(), ve.end());
        return ve[0].second;
    }
};
```


### [2191. 将杂乱无章的数字排序](https://leetcode-cn.com/problems/sort-the-jumbled-numbers/)

转字符串会更慢点 可直接翻转

```c++
class Solution {
public:
    vector<int> mapping;
    unordered_map<int, int> hash;
    int get(int x) {
        if (hash.count(x))
            return hash[x];
        string s = to_string(x);
        int n = s.size();
        for (int i = 0; i < n; ++ i )
            s[i] = '0' + mapping[s[i] - '0'];
        return hash[x] = stoi(s);
    }
    vector<int> sortJumbled(vector<int>& mapping, vector<int>& nums) {
        this->mapping = mapping;
        stable_sort(nums.begin(), nums.end(), [&](const int & a, const int & b) {
            int na = get(a), nb = get(b);
            return na < nb;
        });
        return nums;
    }
};
```

### [2192. 有向无环图中一个节点的所有祖先](https://leetcode-cn.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/)

本题可直接暴力 bitset 过

数据规模再大些就是经典 topo

```c++
class Solution {
public:
    const static int N = 1e3 + 10, M = 2e3 + 10;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    int din[N], q[M];
    
    vector<bitset<N>> mem;
    
    void topo() {
        int hh = 0, tt = -1;
        for (int i = 0; i < n; ++ i )
            if (!din[i])
                q[ ++ tt] = i, mem[i][i] = 1;
        while (hh <= tt) {
            int t = q[hh ++ ];
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                mem[j] |= mem[t];
                mem[j][j] = 1;
                if ( -- din[j] == 0)
                    q[ ++ tt] = j;
            }
        }
    }
    
    vector<vector<int>> getAncestors(int n, vector<vector<int>>& edges) {
        init();
        for (auto & e : edges)
            add(e[0], e[1]), din[e[1]] ++ ;
        
        this->n = n;
        this->mem.resize(n);
        topo();
        
        vector<vector<int>> res;
        for (int i = 0; i < n; ++ i ) {
            vector<int> t;
            for (int j = 0; j < n; ++ j )
                if (i != j && mem[i][j])
                    t.push_back(j);
            res.push_back(t);
        }
        return res;
    }
};
```

### [2193. 得到回文串的最少操作次数](https://leetcode-cn.com/problems/minimum-number-of-moves-to-make-palindrome/) [TAG]

-   直观贪心

```c++
class Solution {
public:
    // 贪心的思想：
    // 每一轮对于最左侧的字符 α，找到最大的下标 j，满足 sj=α，将 sj 移动到最右侧，然后同时去掉最左侧和最右侧的字符。
    // 如果找不到 jj，由于题意保证可以得到回文串，则说明 alphaalpha 在当前字符串中仅出现了一次，需要放到最中间的位置上。
    // TODO: 可信证明
    int minMovesToMakePalindrome(string s) {
        int n = s.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            int p = -1;
            for (int j = n - 1; j > i; -- j )
                if (s[j] == s[i]) {
                    p = j;
                    break;
                }
            
            if (p == -1) {
                // 奇数个 移动到中间
                res += s.size() / 2 - i;
                // 右边界不变 直接continue
                continue;
            }
            
            for (int j = p; j < n - 1; ++ j )
                s[j] = s[j + 1], res ++ ;
            n -- ;
        }
        return res;
    }
};
```

-   直观贪心 + bit优化

```c++
class Solution {
public:
    // 贪心的思想：
    // 每一轮对于最左侧的字符 α，找到最大的下标 j，满足 sj=α，将 sj 移动到最右侧，然后同时去掉最左侧和最右侧的字符。
    // 如果找不到 jj，由于题意保证可以得到回文串，则说明 alphaalpha 在当前字符串中仅出现了一次，需要放到最中间的位置上。
    // TODO: 可信证明
    const static int N = 2e3 + 10;
    
    int tr[N];
    void init() {
        memset(tr, 0, sizeof tr);
    }
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int c) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += c;
    }
    int query(int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    int minMovesToMakePalindrome(string s) {
        int n = s.size(), res = 0;
        
        // 预处理每个字符的位置
        vector<deque<int>> p(26);
        for (int i = 0; i < n; ++ i ) {
            p[s[i] - 'a'].push_back(i);
            add(i + 1, 1);  // 方便统计某个区间有多少个数
        }
        
        // t 已删除的个数
        int t = 0, odd = -1;
        for (int i = 0; i < n; ++ i ) {
            int c = s[i] - 'a';
            if (p[c].empty())
                continue;
            
            if (p[c].size() == 1) {
                // 奇数个
                odd = i;
                p[c].pop_back();
                continue;
            }
            
            // 总数 - 已删除的数 - 减去前面挖空的位置 ==> 后面数字的个数
            res += n - t - query(p[c].back() + 1);
            
            add(p[c].back() + 1, -1);   // 挖空当前
            p[c].pop_back(); p[c].pop_front();
            t ++ ;
        }
        if (odd != -1)
            res += n / 2 - query(odd);
        return res;
    }
};
```

-   rank 1 TODO

```c++
class Solution {
public:
    int minMovesToMakePalindrome(string s) {
        // 记录下标
        vector<int> p[26];
        for (int i = 0; i < n; ++ i )
            p[s[i] - 'a'].push_back(i);
        
        // 生成反串以及对应的在原串中的字符下标 ==> TODO
        int cnt[26] = {};
        auto t = s; reverse(t.begin(), t.end());
        vector<int> ve(n);
        for (int i = 0; i < n; ++ i )
            ve[i] = p[t[i] - 'a'][c[t[i] - 'a'] ++ ];
        
        int res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < i; ++ j )
                if (a[j] > a[i])
                    res ++ ;
        return res / 2; // ==> TODO
    }
};
```

