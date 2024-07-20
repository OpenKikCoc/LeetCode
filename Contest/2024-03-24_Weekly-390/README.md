## [比赛链接](https://leetcode.cn/contest/weekly-contest-390/)


### [3090. 每个字符最多出现两次的最长子字符串](https://leetcode.cn/problems/maximum-length-substring-with-two-occurrences/)



```c++
class Solution {
public:
    int maximumLengthSubstring(string s) {
        int n = s.size(), res = 0;
        unordered_map<int, int> h;
        for (int i = 0, j = 0; j < n; ++ j ) {
            h[s[j] - 'a'] ++ ;
            while (i < j && h[s[j] - 'a'] > 2)
                h[s[i ++ ] - 'a'] -- ;
            res = max(res, j - i + 1);
        }
        return res;
    }
};
```


### [3091. 执行操作使数据元素之和大于等于 K](https://leetcode.cn/problems/apply-operations-to-make-sum-of-array-greater-than-or-equal-to-k/)

也可以直接从小枚举 略

```c++
class Solution {
public:
    
    bool check(int m, int k) {
        if (m + 1 >= k)
            return true;

        for (int i = 0; i <= m; ++ i ) {
            int x = i, y = m - i;
            if ((1 + x) * (y + 1) >= k)
                return true;
        }
        return false;
    }
    
    int minOperations(int k) {
        int l = 0, r = k;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (check(m, k))
                r = m;
            else
                l = m + 1;
        }
        return l;
    }
};
```

### [3092. 最高频率的 ID](https://leetcode.cn/problems/most-frequent-ids/)



```c++
class Solution {
public:
    using LL = long long;
    using PLI = pair<LL, int>;

    vector<long long> mostFrequentIDs(vector<int>& nums, vector<int>& freq) {
        int n = nums.size();
        
        unordered_map<int, LL> h;
        set<PLI> S;
        
        vector<LL> res;
        for (int i = 0; i < freq.size(); ++ i ) {
            int x = freq[i];
            
            LL cnt = h[nums[i]];
            h.erase(nums[i]), S.erase({cnt, nums[i]});
            cnt += x;
            if (cnt)
                h[nums[i]] = cnt, S.insert({cnt, nums[i]});
            
            if (S.empty())
                res.push_back(0);
            else {
                auto it = S.rbegin();
                auto [cnt, _] = *it;
                res.push_back(cnt);
            }
        }
        return res;
    }
};
```

### [3093. 最长公共后缀查询](https://leetcode.cn/problems/longest-common-suffix-queries/)

显然是 trie 核心在于压缩空间

=> 考虑偏序性质 可以直接在插入时维护

```c++
const static int N = 1e4 + 10, M = 5e5 + 10;
int t[N];

struct Node {
    Node * child[26];
    int p;
    Node() {
        for (int i = 0; i < 26; ++ i )
            child[i] = nullptr;
        p = -1;
    }
} *root;

Node * rs[M];
int tot;
Node * prep(int idx) {
    rs[idx] = new Node();
    return rs[idx];
}

class Solution {
public:
    void init() {
        root = new Node();
        tot = 0;
    }
    void compare(Node * p, int i) {
        // ATTENTION: 考虑严格偏序性质 可以直接在插入的时候 O(1) 维护... 不需要集合or每次全量sort
        // 进而压缩空间避免MLE
        int a = p->p, b = i;
        if (a == -1 || (ws[a].size() > ws[b].size() || ws[a].size() == ws[b].size() && a > b))
            p->p = b;
    }
    void insert(int i, string & w) {
        auto p = root;
        compare(p, i);
        for (auto c : w) {
            int u = c - 'a';
            if (!p->child[u])
                p->child[u] = prep(tot ++ );
            p = p->child[u];
            compare(p, i);  // ATTENTION
        }
    }
    int query(string & w) {
        auto p = root;
        for (auto c : w) {
            int u = c - 'a';
            if (!p->child[u])
                break;
            p = p->child[u];
        }
        return p->p;
    }
    
    vector<string> ws;
    
    vector<int> stringIndices(vector<string>& wordsContainer, vector<string>& wordsQuery) {
        init();
        
        this->ws = wordsContainer;
        
        for (int i = 0; i < ws.size(); ++ i ) {
            auto & w = ws[i];
            reverse(w.begin(), w.end());
            insert(i, w);
        }
        
        vector<int> res;
        for (auto & w : wordsQuery) {
            reverse(w.begin(), w.end());
            res.push_back(query(w));
        }
        return res;
    }
};
```
