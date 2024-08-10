## [比赛链接](https://leetcode.cn/contest/biweekly-contest-131/)


### [3158. 求出出现两次数字的 XOR 值](https://leetcode.cn/problems/find-the-xor-of-numbers-which-appear-twice/)



```c++
class Solution {
public:
    int duplicateNumbersXOR(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size(), res = 0;
        for (int i = 1; i < n; ++ i )
            if (nums[i] == nums[i - 1])
                res ^= nums[i];
        return res;
    }
};
```


### [3159. 查询数组中元素的出现位置](https://leetcode.cn/problems/find-occurrences-of-an-element-in-an-array/)



```c++
class Solution {
public:
    vector<int> occurrencesOfElement(vector<int>& nums, vector<int>& queries, int x) {
        int n = nums.size();
        
        vector<int> xs;
        for (int i = 0; i < n; ++ i )
            if (nums[i] == x)
                xs.push_back(i);
        
        vector<int> res;
        for (auto q : queries) {
            if (q > xs.size()) {
                res.push_back(-1);
                continue;
            }
            res.push_back(xs[q - 1]);
        }
        return res;
    }
};
```

### [3160. 所有球里面不同颜色的数目](https://leetcode.cn/problems/find-the-number-of-distinct-colors-among-the-balls/)



```c++
class Solution {
public:
    unordered_map<int, int> co;     // the color of specific ball
    unordered_map<int, int> tot;    // the count of balls for specific color
    
    void remove(int x, int y) {
        co.erase(x);
        tot[y] -- ;
        if (tot[y] == 0)
            tot.erase(y);
    }
    
    void add(int x, int y) {
        co[x] = y;
        tot[y] ++ ;
    }

    vector<int> queryResults(int limit, vector<vector<int>>& queries) {
        co.clear(), tot.clear();
        
        vector<int> res;
        for (auto & q : queries) {
            int x = q[0], y = q[1];
            
            if (co.count(x)) {
                int color = co[x];
                remove(x, color);
            }
            add(x, y);
            res.push_back(tot.size());
        }
        return res;
    }
};
```

### [3161. 物块放置查询](https://leetcode.cn/problems/block-placement-queries/) [TAG]

本题是有下标限制的查询而非全局查询 显然无法直接使用珂朵莉树

考虑回归到线段树【思考插点的影响 进而设计树节点定义与维护逻辑】

```c++
class Solution {
public:
    const static int N = 5e4 + 10;
    
    struct Node {
        int l, r;
        int pre, suf, maxv; // ATTENTION 插点不影响线段本身 某个点插点则这个点前面仍然可用
    } tr[N << 2];
    
    set<int> S; // ATTENTION
    
    void pushup(Node & u, Node & l, Node & r) {
        u.maxv = u.suf = u.pre = 0;
        {
            u.pre = max(u.pre, l.pre);
            // ATTENTION 根据 l.r 是否放了障碍物 确定能否合并连在一起
            if (l.pre == l.r - l.l + 1 && !S.count(l.r))
            // if (l.pre == l.r - l.l + 1)  // WA 思考定义方式
                u.pre = max(u.pre, (l.r - l.l + 1) + r.pre);
        }
        {
            u.suf = max(u.suf, r.suf);
            if (r.suf == r.r - r.l + 1)
                u.suf = max(u.suf, l.suf + (r.r - r.l + 1));
        }
        u.maxv = max(u.maxv, max(l.maxv, r.maxv));
        u.maxv = max(u.maxv, l.suf + r.pre);
    }
    void pushup(int u) {
        pushup(tr[u], tr[u << 1], tr[u << 1 | 1]);
    }
    
    void build(int u, int l, int r) {
        if (l == r)
            tr[u] = {l, r, 1, 1, 1};    // by default usable, set to 1
        else {
            tr[u] = {l, r};
            int mid = l + r >> 1;
            build(u << 1, l, mid), build(u << 1 | 1, mid + 1, r);
            pushup(u);
        }
    }
    void modify(int u, int x, int y) {
        if (tr[u].l == x && tr[u].r == x)
            tr[u] = {x, x, 1, 0, 1};    // ATTENTION: 即便只有一个位置 也能放下长度为1的
                                        /* 如果 0 0 0 且在追加答案时使用 maxv+1
                                            [[2,1,2]]: should be false, but got true */
        else {
            int mid = tr[u].l + tr[u].r >> 1;
            if (x <= mid)
                modify(u << 1, x, y);
            else
                modify(u << 1 | 1, x, y);
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
            else if (l > mid)
                return query(u << 1 | 1, l, r);
            
            Node ret;
            auto left = query(u << 1, l, r);
            auto right = query(u << 1 | 1, l, r);
            pushup(ret, left, right);
            return ret;
        }
    }
    
    vector<bool> getResults(vector<vector<int>>& queries) {
        build(1, 1, N); // l,r 是值域 无偏移
        
        vector<bool> res;
        for (auto & q : queries)
            if (q[0] == 1) {
                int x = q[1];   // 无偏移
                S.insert(x);
                modify(1, x, 0);
            } else {
                int r = q[1], d = q[2];
                auto ret = query(1, 1, r);  // ATTENTION 从1开始而非0
                res.push_back(ret.maxv >= d);
            }
        return res;
    }
};
```
