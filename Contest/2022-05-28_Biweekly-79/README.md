## [比赛链接](https://leetcode.cn/contest/biweekly-contest-79/)


### [2283. 判断一个数的数字计数是否等于数位的值](https://leetcode.cn/problems/check-if-number-has-equal-digit-count-and-digit-value/)

略

```c++
class Solution {
public:
    const static int N = 10;
    
    int c[N];
    
    bool digitCount(string num) {
        int n = num.size();
        for (int i = 0; i < n; ++ i )
            c[num[i] - '0'] ++ ;
        for (int i = 0; i < n; ++ i )
            if (num[i] - '0' != c[i])
                return false;
        return true;
    }
};
```


### [2284. 最多单词数的发件人](https://leetcode.cn/problems/sender-with-largest-word-count/)

注意如果动态添加 `map[""]` 会提前结束循环导致出错，还是应该避免这样的写法

```c++
class Solution {
public:
    string largestWordCount(vector<string>& messages, vector<string>& senders) {
        int n = senders.size();
        unordered_map<string, int> hash;
        for (int i = 0; i < n; ++ i ) {
            string & t = senders[i];
            
            stringstream ss(messages[i]);
            string s;
            int c = 0;
            while (ss >> s)
                c ++ ;
            hash[t] += c;
            // cout << " t = " << t << " c = " << c << endl;
        }
        // for (auto [k, v] : hash)
        //     cout << " k = " << k << " v = " << v << " ..." << endl;
        hash[""] = 0;
        // cout << hash.size() << endl;
        
        string res;
        for (auto [k, v] : hash) {
            // cout << " k = " << k << " v = " << v << " " << res << " hashres " << hash[res] << endl;
            if (v > hash[res] || v == hash[res] && k > res)
                res = k;
            // cout << " k = " << k << " v = " << v << " " << res << endl;
        }
        // cout << hash.size() << endl;
            
        return res;
    }
};
```

### [2285. 道路的最大总重要性](https://leetcode.cn/problems/maximum-total-importance-of-roads/)

略

```c++
class Solution {
public:
    using LL = long long;
    using PLL = pair<LL, LL>;
    const static int N = 5e4 + 10;
    
    LL c[N];
    PLL t[N];
    
    long long maximumImportance(int n, vector<vector<int>>& roads) {
        memset(c, 0, sizeof c);
        for (auto & r : roads)
            c[r[0]] ++ , c[r[1]] ++ ;
        
        for (int i = 0; i < n; ++ i )
            t[i] = {c[i], i};
        sort(t, t + n);
        
        LL res = 0;
        for (int i = n; i >= 1; -- i ) {
            res += (LL)i * t[i - 1].first;
        }
        return res;
    }
};
```

### [2286. 以组为单位订音乐会的门票 ](https://leetcode.cn/problems/booking-concert-tickets-in-groups/) [TAG]

线段树二分

-   求第一个大等于 k 的元素；

-   求第一个前缀和大等于 k 的下标；
-   修改单个元素的值。

```c++
class BookMyShow {
public:
    using LL = long long;
    const static int N = 5e4 + 10;
    
    struct Node {
        int l, r;
        LL maxv, sumv;
    } tr[N << 2];
    
    void pushup(Node & u, Node & l, Node & r) {
        u.sumv = l.sumv + r.sumv;
        u.maxv = max(l.maxv, r.maxv);
    }
    void pushup(int u) {
        return pushup(tr[u], tr[u << 1], tr[u << 1 | 1]);
    }
    void build(int u, int l, int r) {
        if (l == r)
            tr[u] = {l, r, w[r], w[r]};
        else {
            tr[u] = {l, r};
            int mid = l + (r - l) / 2;
            build(u << 1, l, mid), build(u << 1 | 1, mid + 1, r);
            pushup(u);
        }
    }
    void modify(int u, int x, LL v) {
        if (tr[u].l == x && tr[u].r == x)
            tr[u] = {x, x, v, v};
        else {
            int mid = tr[u].l + (tr[u].r - tr[u].l) / 2;
            if (x <= mid)
                modify(u << 1, x, v);
            else
                modify(u << 1 | 1, x, v);
            pushup(u);
        }
    }
    Node query(int u, int l, int r) {
        if (l > r)  // 特判，寻找更好的方式
            return {};
        if (tr[u].l >= l && tr[u].r <= r)
            return tr[u];
        else {
            int mid = tr[u].l + (tr[u].r - tr[u].l) / 2;
            if (r <= mid)
                return query(u << 1, l, r);
            else if (l > mid)
                return query(u << 1 | 1, l, r);
            else {
                auto left = query(u << 1, l, r);
                auto right = query(u << 1 | 1, l, r);
                Node res;
                pushup(res, left, right);
                return res;
            }
        }
    }
    // 线段树二分：第一个大于等于v的位置
    Node * binary_search_maxv(int u, LL v) {
        if (tr[u].maxv < v)
            return nullptr;
        if (tr[u].l == tr[u].r)
            return &tr[u];
        else {
            int mid = tr[u].l + (tr[u].r - tr[u].l) / 2;
            auto left = binary_search_maxv(u << 1, v);
            if (left != nullptr)
                return left;
            return binary_search_maxv(u << 1 | 1, v);
        }
    }
    // 线段树二分：第一个大于等于v的位置
    Node * binary_search_sumv(int u, LL v) {
        if (tr[u].sumv < v)
            return nullptr;
        if (tr[u].l == tr[u].r)
            return &tr[u];
        else {
            int mid = tr[u].l + (tr[u].r - tr[u].l) / 2;
            auto left = binary_search_sumv(u << 1, v);
            if (left != nullptr)
                return left;
            // ATTENTION: v changed
            return binary_search_sumv(u << 1 | 1, v - tr[u << 1].sumv);
        }
    }
    
    int n, m;
    LL w[N];
    
    
    BookMyShow(int n, int m) {
        this->n = n, this->m = m;
        for (int i = 1; i <= n; ++ i )
            w[i] = m;
        build(1, 1, n);
    }
    
    vector<int> gather(int k, int maxRow) {
        if (query(1, 1, n).maxv < k)
            return {};
        auto node = binary_search_maxv(1, k);
        if (node->l > maxRow + 1)
            return {};
        LL sum = node->sumv;
        modify(1, node->l, sum - k);
        return {node->l - 1, m - (int)sum};
    }
    
    bool scatter(int k, int maxRow) {
        if (query(1, 1, n).sumv < k)
            return false;
        auto node = binary_search_sumv(1, k);
        if (node->l > maxRow + 1)
            return false;
        LL sum = node->sumv - (k - query(1, 1, node->l - 1).sumv);
        auto left = binary_search_sumv(1, 1);
        for (int i = left->l; i < node->l; ++ i )
            modify(1, i, 0);
        modify(1, node->l, sum);
        return true;
    }
};

/**
 * Your BookMyShow object will be instantiated and called as such:
 * BookMyShow* obj = new BookMyShow(n, m);
 * vector<int> param_1 = obj->gather(k,maxRow);
 * bool param_2 = obj->scatter(k,maxRow);
 */
```
