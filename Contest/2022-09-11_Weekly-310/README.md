## [比赛链接](https://leetcode.cn/contest/weekly-contest-310/)

>   virtual 241 / 6081


### [2404. 出现最频繁的偶数元素](https://leetcode.cn/problems/most-frequent-even-element/)



```c++
class Solution {
public:
    int mostFrequentEven(vector<int>& nums) {
        int p = -1;
        unordered_map<int, int> hash;
        for (auto x : nums)
            if (x % 2 == 0) {
                hash[x] ++ ;
                if (p == -1 || hash[x] > hash[p] || hash[x] == hash[p] && x < p)
                    p = x;
            }
        return p;
    }
};
```


### [2405. 子字符串的最优划分](https://leetcode.cn/problems/optimal-partition-of-string/)



```c++
class Solution {
public:
    const static int N = 26;
    
    string s;
    int c[N];
    
    bool check(int x) {
        int p = s[x] - 'a';
        if (c[p])
            return false;
        return true;
    }
    void add(int x) {
        int p = s[x] - 'a';
        c[p] ++ ;
    }
    
    int partitionString(string s) {
        this->s = s;
        int n = s.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            memset(c, 0, sizeof c);
            int j = i;
            while (j < n && check(j))
                add(j ++ );
            i = j - 1;
            res ++ ;
        }
        return res;
    }
};
```

### [2406. 将区间分为最少组数](https://leetcode.cn/problems/divide-intervals-into-minimum-number-of-groups/)



```c++
class Solution {
public:
    int minGroups(vector<vector<int>>& intervals) {
        // 按末尾排序
        sort(intervals.begin(), intervals.end(), [](vector<int> & a, vector<int> & b) {
            return a[1] < b[1];
        });
        
        multiset<int> S;
        for (auto & t : intervals) {
            int l = t[0], r = t[1];
            auto it = S.lower_bound(l);
            if (it != S.begin()) {
                it -- ;
                int x = *it;
                S.erase(it);
            }
            
            S.insert(r);
        }
        return S.size();
    }
};
```

### [2407. 最长递增子序列 II](https://leetcode.cn/problems/longest-increasing-subsequence-ii/)

显然数据结构优化 DP

线段树优化即可

```c++
const static int N = 1e5 + 10;

int w[N];

struct Node {
    int l, r;
    int maxv;
} tr[N << 2];

void pushup(int u) {
    tr[u].maxv = max(tr[u << 1].maxv, tr[u << 1 | 1].maxv);
}

void eval(Node & t, int v) {
    t.maxv = v;
}

void build(int u, int l, int r) {
    if (l == r)
        tr[u] = {l, r, w[l]};
    else {
        tr[u] = {l, r, 0};
        int mid = l + r >> 1;
        build(u << 1, l, mid), build(u << 1 | 1, mid + 1, r);
        pushup(u);
    }
}

void modify(int u, int l, int r, int k) {
    if (tr[u].l >= l && tr[u].r <= r)
        eval(tr[u], k);
    else {
        int mid = tr[u].l + tr[u].r >> 1;
        if (l <= mid)
            modify(u << 1, l, r, k);
        if (r > mid)
            modify(u << 1 | 1, l, r, k);
        pushup(u);
    }
}

int query(int u, int l, int r) {
    if (tr[u].l >= l && tr[u].r <= r)
        return tr[u].maxv;
    else {
        int mid = tr[u].l + tr[u].r >> 1;
        
        int x = 0;
        if (l <= mid)
            x = max(x, query(u << 1, l, r));
        if (r > mid)
            x = max(x, query(u << 1 | 1, l, r));
        return x;
    }
}

class Solution {
public:
    int lengthOfLIS(vector<int>& nums, int k) {
        memset(w, 0, sizeof w);
        build(1, 1, N - 1);
        
        for (auto x : nums) {
            int t = query(1, x - k, x - 1);
            modify(1, x, x, t + 1);
        }
        return query(1, 1, N - 1);
    }
};
```

树状数组也能直接维护【单点修改 区间查询】... 新姿势学习下

```c++
const static int N = 1e5 + 10;

int w[N];   // 必须有两个数组
int tr[N];

int lowbit(int x) {
    return x & -x;
}
void modify(int x, int y) {
    w[x] = y;
    for (int i = x; i < N; i += lowbit(i))
        tr[i] = max(tr[i], y);
}
int query(int l, int r) {
    int res = 0;
    for (; l <= r;) {
        res = max(res, w[r]);   // ATTENTION
        for ( -- r ; r >= l + lowbit(r); r -= lowbit(r))
            res = max(res, tr[r]);
    }
    return res;
}

class Solution {
public:
    int lengthOfLIS(vector<int>& nums, int k) {
        memset(w, 0, sizeof w), memset(tr, 0, sizeof tr);
        for (auto y : nums) {
            int t = query(max(1, y - k), y - 1);
            modify(y, t + 1);
        }
        return query(1, N - 1);
    }
};
```

