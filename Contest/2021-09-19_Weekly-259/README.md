## [比赛链接](https://leetcode.cn/contest/weekly-contest-259/)


### [2011. 执行操作后的变量值](https://leetcode.cn/problems/final-value-of-variable-after-performing-operations/)

模拟 略

```c++
class Solution {
public:
    int finalValueAfterOperations(vector<string>& operations) {
        int res = 0;
        for (auto & op : operations)
            if (op[1] == '-')
                res -- ;
            else
                res ++ ;
        return res;
    }
};
```


### [2012. 数组美丽值求和](https://leetcode.cn/problems/sum-of-beauty-in-the-array/)

统计两侧的最值 扫一遍即可

```c++
class Solution {
public:
    const static int INF = 0x3f3f3f3f;
    
    int sumOfBeauties(vector<int>& nums) {
        int n = nums.size();
        vector<int> l_max(n), r_min(n);
        {
            int maxv = 0;
            for (int i = 0; i < n; ++ i ) {
                l_max[i] = maxv;
                maxv = max(maxv, nums[i]);
            }
        }
        {
            int minv = INF;
            for (int i = n - 1; i >= 0; -- i ) {
                r_min[i] = minv;
                minv = min(minv, nums[i]);
            }
        }
        
        int res = 0;
        for (int i = 1; i <= n - 2; ++ i )
            if (l_max[i] < nums[i] && nums[i] < r_min[i])
                res += 2;
            else if (nums[i - 1] < nums[i] && nums[i] < nums[i + 1])
                res ++ ;
        return res;
    }
};
```

### [2013. 检测正方形](https://leetcode.cn/problems/detect-squares/)

数值范围较大 所以对其中一维离散化 在询问时查询离散化结果即可

> 时间复杂度要求不高 甚至一些暴力遍历之前所有点的代码也能AC

```c++
class DetectSquares {
public:
    const static int N = 1010;
    
    int g[N][N];
    set<int> xs[N];
    vector<int> dir = {-1, 1};
    
    int get(int a, int b, int c) {
        return a * b * c;
    }
    
    bool check(int x, int y) {
        // can be zero
        return x >= 0 && x < N && y >= 0 && y < N;
    }
    
    DetectSquares() {
        memset(g, 0, sizeof g);
    }
    
    void add(vector<int> point) {
        int x = point[0], y = point[1];
        g[x][y] ++ ;
        xs[x].insert(y);    // we donot care whether it's duplicated
    }
    
    int count(vector<int> point) {
        int res = 0;
        int x1 = point[0], y1 = point[1];
        for (auto y2 : xs[x1]) 
            if (y2 != y1) {
                int d = y2 - y1, x2 = x1;
                for (auto f : dir) {
                    int x3 = x1 + f * d, y3 = y1;
                    int x4 = x1 + f * d, y4 = y2;
                    if (check(x2, y2) && check(x3, y3) && check(x4, y4))
                        res += get(g[x2][y2], g[x3][y3], g[x4][y4]);
                }
            }
        return res;
    }
};

/**
 * Your DetectSquares object will be instantiated and called as such:
 * DetectSquares* obj = new DetectSquares();
 * obj->add(point);
 * int param_2 = obj->count(point);
 */
```

### [2014. 重复 K 次的最长子序列](https://leetcode.cn/problems/longest-subsequence-repeated-k-times/) [TAG]

较显然的：最好预先处理原串 生成所有字符都有可能出现的新串

> 容易想到由预处理后的串生成子串（预处理后的串的每个字符都可以出现无限多次）
>
> 显然是一个递归的流程 递归参数即 【还需要增加的字符长度, 当前构造的串】
>
> 初始化 depth = n / k  
>
> 且统计答案显然应放在每层 dfs 中而非出口（因为显然有结果子串的长度 <= n / k）
>
> 这样一来 中间会出现大量的重复计算流程 **显然需要记忆化**

题意清晰 重复练习即可

主要学习【trick check】【nxt构造】【分析构造思维】

#### 1. 习惯写法: 字符串暴力匹配(可以更trick) + 记忆化搜索

TLE 几次 其实加个记忆化就过

**学习trick的check函数**

```c++
class Solution {
public:
    int n, k;
    string s;
    unordered_map<char, int> hash;
    
    string update(string s) {
        for (auto c : s)
            hash[c] ++ ;
        string ret;
        for (auto c : s)
            if (hash[c] >= k)
                ret.push_back(c);
        return ret;
    }
    
    vector<char> chs;
    string res;

    // 值得学习
    // Trick 的 check 写法
    bool check(string t) {
        if (t.empty())
            return true;
        int d = t.size(), p = 0;
        for (auto c : s)
            if (c == t[p % d])
                p ++ ;
        return p >= k * d;
    }
    // 习惯的写法
    bool check(string t) {
        string tt;
        for (int i = 0; i < k; ++ i )
            tt += t;
        int m = tt.size(), p = 0;
        for (auto c : s)
            if (p < m && c == tt[p])
                p ++ ;
            else if (p == m)
                return true;
        return p == m;
    }

    // The most important thing is `how to design the DFS func`
    set<pair<int, string>> S;
    void dfs(int depth, string now) {
        // Do this firstly
        if (S.count({depth, now}))
            return;
        S.insert({depth, now});
        
        if (!check(now))
            return;
        if (now.size() > res.size() || now.size() == res.size() && now > res)
            res = now;
        
        if (!depth)
            return;
        
        for (auto c : s)
            if (hash[c] >= k) {
                hash[c] -= k;
                dfs(depth - 1, now + c);
                hash[c] += k;
            }
    }
    
    string longestSubsequenceRepeatedK(string s, int k) {
        this->n = s.size(), this->k = k;
        this->s = update(s);
        
        chs.clear();
        for (auto [c, v] : hash)
            chs.push_back(c);
        sort(chs.begin(), chs.end());
        reverse(chs.begin(), chs.end());    // for ordered result
        
        // it's [n/k] not [chs.size()]
        dfs(n / k, "");
        
        return res;
    }
};
```

#### 2. 无需预处理原串  构造 next 数组加速字符串匹配(非常常见) + 记忆化

**学习nxt构造的思想**

```c++
class Solution {
public:
    int n, k;
    string s;
    unordered_map<char, int> hash;
    
    string update(string s) {
        // ...
    }
    
    // Data structure
    // TLE
    // vector<vector<char, int>> nxt;
    int nxt[16010][26];
    
    bool check(string t) {
        // Change the meaning of `p`
        int p = 0;
        for (int _ = 0; _ < k; ++ _ ) {
            for (auto c : t) {
                if (nxt[p][c - 'a'] >= n)
                    return false;
                p = nxt[p][c - 'a'] + 1;
            }
        }
        return true;
    }
    
    vector<char> chs;
    string res, tmp;

    // The most important thing is `how to design the DFS func`
    set<pair<int, string>> S;
    void dfs(int depth, string now) {
        if (S.count({depth, now}))
            return;
        S.insert({depth, now});
        
        if (!check(now))
            return;
        if (now.size() > res.size() || now.size() == res.size() && now > res)
            res = now;
        
        if (!depth)
            return;
        
        for (auto c : s)
            if (hash[c] >= k) {
                hash[c] -= k;
                dfs(depth - 1, now + c);
                hash[c] += k;
            }
    }
    
    string longestSubsequenceRepeatedK(string s, int k) {
        this->s = update(s);
        this->n = s.size(), this->k = k;
        
        chs.clear();
        for (auto [c, v] : hash)
            chs.push_back(c);
        // sort(chs.begin(), chs.end());
        // reverse(chs.begin(), chs.end());    // for ordered result
        
        // ATTENTION: 经典构造nxt数组来加速字符串匹配
        // nxt = vector<unordered_map<char, int>>(n + 1);
        for (auto c : chs)
            nxt[n][c - 'a'] = n;
        for (int i = n - 1; i >= 0; -- i ) {
            for (auto c : chs)
                nxt[i][c - 'a'] = nxt[i + 1][c - 'a'];
            nxt[i][s[i] - 'a'] = i;
        }
        
        // it's [n/k] not [chs.size()]
        dfs(n / k, "");
        
        return res;
    }
};
```

#### 3. 由短串构造长串 思维

根据题意 更长的合法串必然是由短一个长度的合法串新增字符而来

**学习推到和构造的思维**

```c++
class Solution {
public:
    int n, k;
    string s;
    unordered_map<char, int> hash;
    
    string update(string s) {
        // ...
    }
    
    bool check(string t) {
        // ...
    }

    vector<char> chs;
    
    string longestSubsequenceRepeatedK(string s, int k) {
        this->n = s.size(), this->k = k;
        this->s = update(s);
        
        chs.clear();
        for (auto [c, v] : hash)
            chs.push_back(c);
        sort(chs.begin(), chs.end());
        reverse(chs.begin(), chs.end());    // for ordered result
        
        // Reason 1: we get the longer valid string step by step
        //           so iterate from 1 to chs.size()
        vector<vector<string>> mem(n / k + 1);
        mem[0].push_back("");   // empty string
        for (int len = 1; len <= n / k; ++ len )
            for (auto & pre : mem[len - 1])
                for (auto c : chs) {
                    string now = pre + c;
                    if (check(now))
                        mem[len].push_back(now);
                }
        
        // Reason 2: we get the result from chs.size() to 1
        for (int len = n / k; len >= 1; -- len )
            if (mem[len].size())
                return mem[len][0];
        
        return "";
    }
};
```

