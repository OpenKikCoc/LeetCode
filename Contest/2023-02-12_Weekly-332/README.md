## [比赛链接](https://leetcode.cn/contest/weekly-contest-332/)


### [2562. 找出数组的串联值](https://leetcode.cn/problems/find-the-array-concatenation-value/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long findTheArrayConcVal(vector<int>& nums) {
        LL res = 0;
        for (int i = 0, j = nums.size() - 1; i <= j; ++ i , -- j ) {
            if (i == j) {
                res += nums[i];
            } else {
                string a = to_string(nums[i]), b = to_string(nums[j]);
                string t = a + b;
                res += stoll(t);
            }
        }
        return res;
    }
};
```


### [2563. 统计公平数对的数目](https://leetcode.cn/problems/count-the-number-of-fair-pairs/)

较显然的 需要在扫描过程中维护计数

且计数需要离散化

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL tr[N];
    void init() {
        memset(tr, 0, sizeof tr);
    }
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int y) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += y;
    }
    LL sum(int x) {
        LL ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    unordered_set<int> S;
    vector<int> xs;
    int find(int x) {
        return lower_bound(xs.begin(), xs.end(), x) - xs.begin();
    }
    
    long long countFairPairs(vector<int>& nums, int lower, int upper) {
        init();
        
        {
            for (auto x : nums)
                xs.push_back(x), S.insert(x);
            sort(xs.begin(), xs.end());
            xs.erase(unique(xs.begin(), xs.end()), xs.end());
        }
        
        LL res = 0, L = lower, R = upper;
        for (auto x : nums) {
            LL a = L - x, b = R - x;
            int x1 = find(a) + 1, x2 = find(b) + 1;
            LL s1 = 0, s2 = 0;
            if (S.count(a)) {
                x1 -- ;
                s1 = sum(x1);
            } else {
                x1 -- ;
                s1 = sum(x1);
            }
            if (S.count(b)) {
                s2 = sum(x2);
            } else {
                x2 -- ;
                s2 = sum(x2);
            }
            
            res += s2 - s1;
            
            add(find(x) + 1, 1);
        }
        return res;
    }
};
```

实际上 可以直接预先排序 简化实现

```c++
class Solution {
public:
    using LL = long long;

    long long countFairPairs(vector<int>& nums, int lower, int upper) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        LL res = 0;
        for (int i = 0, j = n - 1, k = n - 1; i < n; ++ i ) {
            int l = lower - nums[i], r = upper - nums[i];
            while (j >= 0 && nums[j] >= l)  // 第一个小于的位置
                j -- ;
            while (k >= 0 && nums[k] > r)   // 第一个小于等于的位置
                k -- ;
            res += k - j;
            if (i > j && i <= k)    // 排除自己
                res -- ;
        }
        return res / 2;
    }
};
```



### [2564. 子字符串异或查询](https://leetcode.cn/problems/substring-xor-queries/)



```c++
class Solution {
public:
    // 数据范围(0 <= firsti, secondi <= 10^9): 显然不会有超过 32 个比特构成的数
    using ULL = unsigned long long;
    using PII = pair<int, int>;
    
    vector<vector<int>> substringXorQueries(string s, vector<vector<int>>& queries) {
        unordered_map<ULL, PII> h;
        int n = s.size();
        for (int w = 1; w < 32 && w <= n; ++ w ) {
            ULL x = 0;
            for (int i = 0; i < w; ++ i )
                x = (x << 1) + s[i] - '0';
            
            if (!h.count(x))
                h[x] = {0, w - 1};
            
            for (int i = w; i < n; ++ i ) {
                x = (x << 1);
                x = x - ((s[i - w] - '0') << w) + s[i] - '0';
                if (!h.count(x))
                    h[x] = {i - w + 1, i};
            }
        }
        
        vector<vector<int>> res;
        for (auto & q : queries) {
            int x = q[0] ^ q[1];
            if (h.count(x)) {
                res.push_back({h[x].first, h[x].second});
            } else {
                res.push_back({-1, -1});
            }
        }
        
        return res;
    }
};
```

### [2565. 最少得分子序列](https://leetcode.cn/problems/subsequence-with-the-minimum-score/) [TAG]

显然可以双指针 优先保留前面的

在此基础上 从尾部开始逐步增加要保留的字符 并收缩前面

过程中维护并统计即可

```c++
class Solution {
public:
    // ATTENTION 优雅实现
    
    int minimumScore(string s, string t) {
        int n = s.size(), m = t.size();
        
        vector<int> p;  // 记录 s[i] 能够匹配到的 t 的长度 (不是位置)
        for (int i = 0, j = 0; i < n; ++ i ) {
            if (j < m && s[i] == t[j])
                j ++ ;
            p.push_back(j);
        }
        // 考虑只保留前面 移除后面所有的得分
        int res = m - p[n - 1];
        
        // 后缀下一个【需要匹配】的【位置】
        for (int i = s.size() - 1, j = m - 1, x = 0; i >= 0; -- i ) {
            // 如果能逆序匹配，则移动指针
            if (j >= 0 && s[i] == t[j])
                j -- , x ++ ;
            
            // 当前 i 被作为后缀使用，则中间删除的段的得分:
            //     总长度 - 后缀长度 - 前缀长度
            // 注意需要 max(0, ...)  ==> 原因 s比较丰富 匹配可能会有冗余
            int y = 0;
            if (i)
                y = p[i - 1];
            res = min(res, max(0, m - x - y));  // 注意 需要 max(0, ...)
        }
        return res;
    }
};
```
