## [比赛链接](https://leetcode.cn/contest/weekly-contest-402/)

>   virtual rank: 325 / 3283
>
>   18  1:15:43  0:01:14  0:03:33  0:33:04 1  1:05:43 1


### [3184. 构成整天的下标对数目 I](https://leetcode.cn/problems/count-pairs-that-form-a-complete-day-i/)



```c++
class Solution {
public:
    int countCompleteDayPairs(vector<int>& hours) {
        int n = hours.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                res += (hours[i] + hours[j]) % 24 == 0;
        return res;
    }
};
```


### [3185. 构成整天的下标对数目 II](https://leetcode.cn/problems/count-pairs-that-form-a-complete-day-ii/)



```c++
class Solution {
public:
    using LL = long long;
    
    unordered_map<int, LL> h;
    
    long long countCompleteDayPairs(vector<int>& hours) {
        LL res = 0;
        for (auto x : hours) {
            int target = (24 - x % 24) % 24;
            res += h[target];
            h[x % 24] ++ ;
        }
        return res;
    }
};
```

### [3186. 施咒的最大总伤害](https://leetcode.cn/problems/maximum-total-damage-with-spell-casting/)



```c++
class Solution {
public:
    // 题意转化为 每个位置不能由前面两个位置转移而来
    
    using LL = long long;
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    LL f[N][2];
    
    long long maximumTotalDamage(vector<int>& power) {
        int n = power.size();
        if (n == 1)
            return power[0];
        // n >= 2
        sort(power.begin(), power.end());
        
        vector<PII> xs;
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            while (j < n && power[j] == power[i])
                j ++ ;
            xs.push_back({power[i], j - i});
            i = j - 1;
        }
        n = xs.size();  // ATTENTION
        
        memset(f, 0, sizeof f);
        f[1][1] = (LL)xs[0].first * xs[0].second;
        for (int i = 2; i <= n; ++ i ) {
            auto [x, c] = xs[i - 1];
            
            int last = i - 1;
            while (last && abs(xs[last - 1].first - x) <= 2)
                last -- ;
            
            f[i][0] = max(f[i - 1][0], f[i - 1][1]);
            f[i][1] = max(f[last][0], f[last][1]) + (LL)x * c;
        }
        return max(f[n][0], f[n][1]);
    }
};
```

可以指针维护可行 max 值

```c++
class Solution {
public:
    // 题意转化为 每个位置不能由前面两个位置转移而来
    
    using LL = long long;
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    LL f[N][2];
    
    long long maximumTotalDamage(vector<int>& power) {
        int n = power.size();
        if (n == 1)
            return power[0];
        // n >= 2
        sort(power.begin(), power.end());
        
        vector<PII> xs;
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            while (j < n && power[j] == power[i])
                j ++ ;
            xs.push_back({power[i], j - i});
            i = j - 1;
        }
        n = xs.size();  // ATTENTION
        
        memset(f, 0, sizeof f);
        f[1][1] = (LL)xs[0].first * xs[0].second;
        LL mx = 0;
        for (int i = 2, j = 1; i <= n; ++ i ) {
            auto [x, c] = xs[i - 1];
            
            while (j < i && xs[j - 1].first < x - 2)
                mx = max(mx, max(f[j][0], f[j][1])), j ++ ;
            
            f[i][0] = max(f[i - 1][0], f[i - 1][1]);
            f[i][1] = mx + (LL)x * c;
        }
        return max(f[n][0], f[n][1]);
    }
};
```

### [3187. 数组中的峰值](https://leetcode.cn/problems/peaks-in-array/)

单点修改 区间查询 => 经典线段树

```c++
class Solution {
public:
    // 显然是线段树...
    const static int N = 1e5 + 10;
    
    vector<int> ns;
    int n;
    bool check(int idx) {
        return idx > 0 && idx < n - 1 && ns[idx] > ns[idx - 1] && ns[idx] > ns[idx + 1];
    }
    
    struct Node {
        int l, r;
        int lidx, ridx, cnt;
    } tr[N << 2];
    
    void pushup(Node & u, Node & l, Node & r) {
        u.lidx = l.lidx, u.ridx = r.ridx, u.cnt = l.cnt + r.cnt;
        if (l.ridx != l.lidx && check(l.ridx) || r.ridx != r.lidx && check(r.lidx))
            u.cnt ++ ;
    }
    void pushup(int u) {
        return pushup(tr[u], tr[u << 1], tr[u << 1 | 1]);
    }
    void build(int u, int l, int r) {
        if (l >= r)
            tr[u] = {l, r, l - 1, l - 1, 0};
        else {
            tr[u] = {l, r};
            int mid = l + r >> 1;
            build(u << 1, l, mid), build(u << 1 | 1, mid + 1, r);
            pushup(u);
        }
    }
    void modify(int u, int x) {
        if (tr[u].l >= x && tr[u].r <= x)
            tr[u] = {x, x, x - 1, x - 1, 0};
        else {
            int mid = tr[u].l + tr[u].r >> 1;
            if (x <= mid)
                modify(u << 1, x);
            else
                modify(u << 1 | 1, x);
            pushup(u);
        }
    }
    Node query(int u, int l, int r) {
        if (tr[u].l >= l && tr[u].r <= r)
            return tr[u];
        else {
            int mid = tr[u].l + tr[u].r >> 1;
            if (r <= mid)
                return query(u << 1, l, r);
            else if (l >= mid + 1)
                return query(u << 1 | 1, l, r);
            
            Node ret;
            auto left = query(u << 1, l, r);
            auto right = query(u << 1 | 1, l, r);
            pushup(ret, left, right);
            return ret;
        }
    }
    
    vector<int> countOfPeaks(vector<int>& nums, vector<vector<int>>& queries) {
        this->ns = nums; this->n = ns.size();
        build(1, 1, n);
        
        vector<int> res;
        for (auto & q : queries)
            if (q[0] == 1) {
                int l = q[1], r = q[2];
                res.push_back(query(1, l + 1, r + 1).cnt);
            } else {
                int x = q[1], y = q[2];
                ns[x] = y;
                modify(1, x + 1);
            }
        return res;
    }
};
```

更进一步：区间查询本质为区间求和，考虑 BIT 是否可解

```c++
class Solution {
public:
    // 显然是线段树...
    const static int N = 1e5 + 10;
    
    int tr[N];
    int lowbit(int x) {
        return x & -x;
    }
    void modify(int x, int y) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += y;
    }
    int query(int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    int calc(vector<int> & nums, int i) {
        if (i == 0 || i == nums.size() - 1)
            return 0;
        return nums[i] > nums[i - 1] && nums[i] > nums[i + 1];
    }
    
    vector<int> countOfPeaks(vector<int>& nums, vector<vector<int>>& queries) {
        int n = nums.size();
        memset(tr, 0, sizeof tr);
        for (int i = 1; i <= n - 2; ++ i )
            modify(i, calc(nums, i));
        
        vector<int> res;
        for (auto & q : queries)
            if (q[0] == 1) {
                int l = q[1], r = q[2];
                if (r - l < 2)
                    res.push_back(0);
                else
                    res.push_back(query(r - 1) - query(l));     // ATTENTION
            } else {
                int x = q[1], y = q[2];
                nums[x] = y;
                for (int i = max(x - 1, 1); i <= min(x + 1, n - 2); ++ i ) {
                    modify(i, calc(nums, i) - (query(i) - query(i - 1)));   // ATTENTION 第二个参数表示增量
                }
            }
        return res;
    }
};
```

