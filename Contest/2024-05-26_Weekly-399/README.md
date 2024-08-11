## [比赛链接](https://leetcode.cn/contest/weekly-contest-399/)


### [3162. 优质数对的总数 I](https://leetcode.cn/problems/find-the-number-of-good-pairs-i/)



```c++
// 同3
```


### [3163. 压缩字符串 III](https://leetcode.cn/problems/string-compression-iii/)



```c++
class Solution {
public:
    string compressedString(string word) {
        string res;
        int n = word.size();
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            while (j < n && j - i < 9 && word[j] == word[i])
                j ++ ;
            int c = j - i;
            res += to_string(c) + word[i];
            i = j - 1;
        }
        return res;
    }
};
```

### [3164. 优质数对的总数 II](https://leetcode.cn/problems/find-the-number-of-good-pairs-ii/)

时间复杂度敏感度

实际上看起来 $1e5 * 1e3$ 没有信心直接这么写，但由于常数原因打不满，所以不会超时

```c++
class Solution {
public:
    using LL = long long;
    
    long long numberOfPairs(vector<int>& nums1, vector<int>& nums2, int k) {
        if (k > 1) {
            vector<int> t;
            for (auto x : nums1)
                if (x % k == 0)
                    t.push_back(x / k);
            nums1 = t;
        }
        int n1 = nums1.size(), n2 = nums2.size();
        sort(nums1.begin(), nums1.end()), sort(nums2.begin(), nums2.end());
        
        unordered_map<int, int> h;
        LL res = 0;
        for (int i = 0, j = 0; i < n1; ++ i ) {
            while (j < n2 && nums2[j] <= nums1[i])
                h[nums2[j ++ ]] ++ ;
            
            for (int z = 1; z <= nums1[i] / z; ++ z )
                if (nums1[i] % z == 0) {
                    res += h[z];
                    // cout << " z = " << z << endl;
                    if (z != nums1[i] / z)
                        res += h[nums1[i] / z];
                }
        }
        return res;
    }
};
```

### [3165. 不包含相邻元素的子序列的最大和](https://leetcode.cn/problems/maximum-sum-of-subsequence-with-non-adjacent-elements/) [TAG]

如果一个题目可以用分治解决，那么这个题目的带修改版本可以用线段树解决

线段树维护区间性质

```c++
class Solution {
public:
    // 题意说明: 选择的子数组可以为空 则本质上是要求尽可能多的不连续的正数的和
    // 带修改维护会比较麻烦 考虑线段树
    //
    // 考虑合并的影响 每一段按照是否包含 首/尾 两个字符做分类 00二进制
    // f00[u] = max(f01[p] + f00[q], f00[p] + f10[q])
    // f01[u] = max(f00[p] + f01[q], f00[p] + f11[q], f01[p] + f01[q])
    // f10[u] = max(f10[p] + f00[q], f10[p] + f10[q], f11[p] + f00[q])
    // f11[u] = max(f10[p] + f11[q], f11[p] + f01[q])
    
    using LL = long long;
    const static int N = 5e4 + 10, MOD = 1e9 + 7;
    
    struct Node {
        int l, r;
        LL nlr, nl, nr, lr;    // 没有左右 没左 没右 都有
    } tr[N << 2];
    void pushup(Node & u, Node & l, Node & r) {
        u.nlr = u.nl = u.nr = u.lr = 0;
        u.nlr = max({0ll, l.nl + r.nlr, l.nlr + r.nr});
        u.nl = max({0ll, l.nlr + r.nl, l.nlr + r.lr, l.nl + r.nl});
        u.nr = max({0ll, l.nr + r.nlr, l.nr + r.nr, l.lr + r.nlr});
        u.lr = max({0ll, l.nr + r.lr, l.lr + r.nl});
    }
    void pushup(int u) {
        pushup(tr[u], tr[u << 1], tr[u << 1 | 1]);
    }
    
    vector<int> w;
    
    void build(int u, int l, int r) {
        if (l == r)
            tr[u] = {l, r, 0, 0, 0, w[l]};  // ATTENTION
        else {
            tr[u] = {l, r};
            int mid = l + r >> 1;
            build(u << 1, l, mid), build(u << 1 | 1, mid + 1, r);
            pushup(u);
        }
    }
    void modify(int u, int x, int y) {
        if (tr[u].l == x && tr[u].r == x)
            tr[u] = {x, x, 0, 0, 0, y};
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
    
    int maximumSumSubsequence(vector<int>& nums, vector<vector<int>>& queries) {
        this->w = nums;
        int n = w.size();
        build(1, 0, n - 1);
        
        LL res = 0;
        for (auto & q : queries) {
            modify(1, q[0], q[1]);
            res = (res + max(0ll, query(1, 0, n - 1).lr)) % MOD;
        }
        return res;
    }
};
```
