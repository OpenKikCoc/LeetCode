## [比赛链接](https://leetcode.cn/contest/biweekly-contest-98/)


### [2566. 替换一个数字后的最大差值](https://leetcode.cn/problems/maximum-difference-by-remapping-a-digit/)



```c++
class Solution {
public:
    int minMaxDifference(int num) {
        set<int> S;
        // x->y
        for (int x = '0'; x <= '9'; ++ x ) {
            for (int y = '0'; y <= '9'; ++ y ) {
                string s = to_string(num);
                for (auto & c : s) {
                    if (c == x)
                        c = y;
                }
                int t = stoi(s);
                S.insert(t);
            }
        }
        return *S.rbegin() - *S.begin();
    }
};
```


### [2567. 修改两个元素的最小分数](https://leetcode.cn/problems/minimum-score-by-changing-two-elements/)

trick

```c++
class Solution {
public:
    int minimizeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int res = 2e9, n = nums.size();
        for (int i = 0; i < 3; ++ i )
            res = min(res, nums[i + n - 3] - nums[i]);
        return res;
    }
};
```

### [2568. 最小无法得到的或值](https://leetcode.cn/problems/minimum-impossible-or/)

trick

```c++
class Solution {
public:
    int minImpossibleOR(vector<int>& nums) {
        for (int i = 0; i < 32; ++ i ) {
            bool f = false;
            for (auto x : nums)
                if (x == (1 << i)) {
                    f = true;
                    break;
                }
            if (!f)
                return 1 << i;
        }
        return -1;
    }
};
```

### [2569. 更新数组后处理求和查询](https://leetcode.cn/problems/handling-sum-queries-after-update/)

熟练度增强

标准的异或懒标记线段树

```c++
class Solution {
public:
    // ATTENTION: 切入点【目标是求和】
    // 不管执行多少次操作 new_nums2[i] 的值都是 nums2[i] + nums1[i] * k
    //      对于操作 1: 会导致一部分 nums1[i] 反转
    //      对于操作 2: 会导致 k 变化, 且 k (对于所有的 i) 总是统一变化的
    //
    // 显然维护 1 即可  在执行操作 2 时产生变化并直接对总和产生影响
    
    using LL = long long;
    const static int N = 1e5 + 10, M = N << 2;
    
    struct Node {
        int l, r;
        int s, f;
    } tr[M];
    
    vector<int> w;
    int n;
    
    void pushup(Node & u, Node & l, Node & r) {
        u.s = l.s + r.s;
    }
    void pushup(int u) {
        pushup(tr[u], tr[u << 1], tr[u << 1 | 1]);
    }
    void eval(Node & t, int f) {
        int len = t.r - t.l + 1;
        if (f)
            t.s = len - t.s, t.f ^= f;
    }
    void pushdown(int u) {
        eval(tr[u << 1], tr[u].f);
        eval(tr[u << 1 | 1], tr[u].f);
        tr[u].f = 0;
    }
    void build(int u, int l, int r) {
        if (l == r)
            tr[u] = {l, r, w[l - 1], 0};
        else {
            tr[u] = {l, r};
            int mid = l + (r - l) / 2;
            build(u << 1, l, mid), build(u << 1 | 1, mid + 1, r);
            pushup(u);
        }
    }
    void modify(int u, int l, int r) {
        if (tr[u].l >= l && tr[u].r <= r) {
            eval(tr[u], 1);
        } else {
            pushdown(u);
            int mid = tr[u].l + tr[u].r >> 1;
            if (l <= mid)
                modify(u << 1, l, r);
            if (r > mid)
                modify(u << 1 | 1, l, r);
            pushup(u);
        }
    }
    int query(int u, int l, int r) {
        if (tr[u].l >= l && tr[u].r <= r)
            return tr[u].s;
        else {
            pushdown(u);
            int mid = tr[u].l + tr[u].r >> 1;
            int ret = 0;
            if (l <= mid)
                ret += query(u << 1, l, r);
            if (r > mid)
                ret += query(u << 1 | 1, l, r);
            return ret;
        }
    }
    
    vector<long long> handleQuery(vector<int>& nums1, vector<int>& nums2, vector<vector<int>>& queries) {
        this->w = nums1, this->n = w.size();
        build(1, 1, n);
        
        LL sum = 0;
        for (auto x : nums2)
            sum += x;
        
        vector<LL> res;
        for (auto & q : queries) {
            int a = q[0], l = q[1], r = q[2];
            if (a == 1) {
                modify(1, l + 1, r + 1);
            } else if (a == 2) {
                int s = query(1, 1, n);
                sum += (LL)s * l;
            } else {
                res.push_back(sum);
            }
        }
        return res;
    }
};
```
